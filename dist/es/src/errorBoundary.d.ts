import React, { ErrorInfo } from 'react';
import { Shell } from './API';
import { Unsubscribe } from 'redux';
interface ErrorBoundaryProps {
    readonly shell: Shell;
    readonly componentName?: string;
    readonly errorClassName?: string;
}
interface ErrorBoundaryState {
    readonly hasError: boolean;
    readonly errorMessage: string | null;
    readonly unsubscribe?: Unsubscribe;
}
export declare class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    readonly throttledResetError: () => void;
    static getDerivedStateFromError(error: Error): ErrorBoundaryState;
    constructor(props: ErrorBoundaryProps);
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): {} | null;
    componentWillUnmount(): void;
    private resetError;
    private attemptToRecoverOnNextState;
    private cancelAttemptToRecover;
}
export {};
//# sourceMappingURL=errorBoundary.d.ts.map