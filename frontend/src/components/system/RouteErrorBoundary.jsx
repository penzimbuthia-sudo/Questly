import { Component } from 'react';

/**
 * Catches render-time errors from any lazily-loaded route section
 * (Landing, LearnerRoutes, ContributorRoutes, AdminRoutes) so a broken
 * import in one section shows a visible message instead of silently
 * unmounting the entire app to a blank white page.
 */
export default class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Route failed to render:', error, info?.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-page p-8 text-center">
          <p className="text-sm font-medium text-tone-danger-fg">This section failed to load.</p>
          <p className="max-w-md text-xs text-fg/50">{this.state.error.message}</p>
          <p className="text-xs text-fg/50">Check the browser console for the full stack trace.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
