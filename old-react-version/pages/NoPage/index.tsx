import React from "react";

/**
 * Component to display a 404 Page Not Found error.
 *
 * @returns {JSX.Element} The rendered NoPage component.
 */
export default class NoPage extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "auto",
        }}
      >
        <h1 style={{ color: "black", fontSize: 50, padding: 10 }}>404</h1>
        <p style={{ color: "black", fontSize: 30 }}>Page Not Found!</p>
      </div>
    );
  }
}
