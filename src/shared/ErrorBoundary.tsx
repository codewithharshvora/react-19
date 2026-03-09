import React from "react";
import type { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// A simple error boundary class component. We keep it in shared so it can
// be reused around any part of the tree. In a real enterprise application you
// would hook up `componentDidCatch` to an error reporting service such as
// Sentry, bugsnag, etc.
export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // react requires this signature even though we don't use the error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // You can send the error and info to a reporting service here.
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          {this.props.fallback || (
            <div className="p-8 text-center text-red-600">
              <h2 className="text-xl font-bold">Something went wrong.</h2>
              <p>Please try refreshing the page or contact support.</p>
            </div>
          )}
        </>
      );
    }

    return this.props.children;
  }
}
