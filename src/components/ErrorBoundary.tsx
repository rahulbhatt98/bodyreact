import React from 'react';
import NoInternet from '../pages/error/noInternet';

class ErrorBoundary extends React.Component {

  state = {
    hasError: false,
    error: { message: '', stack: '' },
    info: { componentStack: '' }
  };

  static getDerivedStateFromError = (error: any) => {
    return { hasError: true };
  };

  componentDidCatch = (error: any, info: any) => {
    this.setState({ error, info });
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ?
      <>
        {
          !navigator.onLine ?
            <>
              <NoInternet />
              <a href='/'>Refresh Again</a>
            </> :
            <div
              style={{ 'backgroundColor': '#084236', 'textAlign': 'center', 'padding': '50px', minHeight: 500 }}>
              <div className="container" style={{ 'color': 'white' }}>
                <h2 style={{ padding: '50px' }}>
                  Oops! Something went wrong.
                </h2>
                {process.env.REACT_APP_ENV === 'development' ?
                  <details style={{ whiteSpace: 'pre-wrap', 'color': 'white', padding: "30px" }}>
                    <strong> {this.state.error && this.state.error.toString()} </strong>
                    <br />
                    <p style={{ wordBreak: "break-word", 'color': '#d1afaf', textAlign: 'left', padding: '10%' }} >
                      {this.state.info?.componentStack}
                    </p>
                  </details>
                  : null
                }
              </div>
            </div>

        }
      </>
      : children;
  }
}

export default ErrorBoundary;
