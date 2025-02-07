import React, { Component } from "react";

import "../../styles/LoadingIndicator.css";

class LoadingIndicator extends Component {
  render() {
    return (
      <>
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </>
    );
  }
}
export default LoadingIndicator;
