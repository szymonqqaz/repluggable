import { mount, ReactWrapper } from 'enzyme'
import _ from 'lodash'
import React, { Component, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { AnyPackage, AnySlotKey, AppHost, AppMainView, createAppHost, Shell, SlotKey } from '../index'
import { EntryPoint, PrivateShell } from '../src/api'
import { renderShellComponent } from '../src/renderSlotComponents'

export { AppHost, createAppHost } from '../index'
export * from './mockPackage'

interface PactApiBase {
    getApiKey(): AnySlotKey
}

export interface PactApi<T> extends PactApiBase {
    getApiKey(): SlotKey<T>
}

function forEachDeclaredApi(allPackages: AnyPackage[], iteration: (dependency: AnySlotKey, entryPoint: EntryPoint) => void) {
    _.forEach(_.flatten(allPackages), (entryPoint: EntryPoint) => {
        _.forEach(entryPoint.declareApis ? entryPoint.declareApis() : [], dependency => {
            iteration(dependency, entryPoint)
        })
    })
}

export const getPackagesDependencies = (allPackages: AnyPackage[], requiredPackages: AnyPackage[]): AnyPackage[] => {
    const tree = new Map<AnySlotKey, EntryPoint | undefined>()

    forEachDeclaredApi(allPackages, (dependency, entryPoint) => {
        tree.set(dependency, entryPoint)
    })

    const packagesList: AnyPackage[] = []
    const entryPointsQueue: EntryPoint[] = _.flatten(requiredPackages)

    while (entryPointsQueue.length) {
        const currEntryPoint = entryPointsQueue.shift() as EntryPoint
        packagesList.push(currEntryPoint)
        const dependencies = currEntryPoint.getDependencyApis ? currEntryPoint.getDependencyApis() : []
        const dependecyEntryPoints = dependencies.map(api => tree.get(api))
        entryPointsQueue.push(..._.compact(dependecyEntryPoints))
    }

    return _.uniq(packagesList)
}

export function createAppHostWithPacts(packages: AnyPackage[], pacts: PactApiBase[]) {
    const pactsEntryPoint: EntryPoint = {
        name: 'PACTS_ENTRY_POINT',
        declareApis() {
            return pacts.map(pact => pact.getApiKey())
        },
        install(shell: Shell): void {
            _.each(pacts, pact => {
                shell.contributeApi(pact.getApiKey(), () => pact)
            })
        }
    }

    return createAppHost([...packages, pactsEntryPoint])
}

export const renderHost = (host: AppHost): { root: ReactWrapper | null; DOMNode: HTMLElement | null } => {
    const root = mount(
        <Provider store={host.getStore()}>
            <AppMainView host={host} />
        </Provider>
    ) as ReactWrapper
    return { root, DOMNode: root && (root.getDOMNode() as HTMLElement) }
}

export const renderInHost = (
    reactElement: ReactElement<any>,
    host: AppHost = createAppHost([])
): {
    root: ReactWrapper | null
    parentWrapper: ReactWrapper | null
    DOMNode: HTMLElement | null
    host: AppHost
} => {
    const shell = createShell(host)

    const root = mount(
        <Provider store={host.getStore()}>{renderShellComponent(shell, <div data-shell-in-host="true">{reactElement}</div>, '')}</Provider>
    )

    const parentWrapper = root.find('[data-shell-in-host="true"]')

    return {
        root,
        DOMNode: parentWrapper
            .children()
            .first()
            .getDOMNode() as HTMLElement,
        parentWrapper,
        host
    }
}

function createShell(host: AppHost): PrivateShell {
    const entryPoint: EntryPoint = {
        name: 'test'
    }

    return {
        name: entryPoint.name,
        entryPoint,
        ...host,
        declareSlot() {
            const slot: any = {}
            return slot
        },
        setLifecycleState: _.noop,
        setDependencyApis: _.noop,
        canUseApis(): boolean {
            return true
        },
        canUseStore(): boolean {
            return true
        },
        contributeApi<TApi>(): TApi {
            const api: any = {}
            return api
        },
        contributeState: _.noop,
        contributeMainView: _.noop
    }
}
