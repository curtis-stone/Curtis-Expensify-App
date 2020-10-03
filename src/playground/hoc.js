console.log('Welcome to "higher order component"');

// Higher Order Component "HOC"
// A component (HOC) that renders another component (regular component)!
// It's goal is to reuse code
// Render Hijacking
// Prop Manipulation
// Abstract State

import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  // WrappedComponent is a conventional name to be able to reuse the function
  return (
    props // This is the HOC
  ) => (
    <div>
      {props.isAdmin && <p>This is private Info, Do Not Share.</p>}
      <WrappedComponent {...props} />
    </div>
  );
  // spread operator used to pass all props from Info component
};

// requireAuthentication HOC challenge
const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please log in to view info</p>
      )}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="There are the details"/>, document.getElementById('app'))
ReactDOM.render(
  <AuthInfo isAuthenticated={false} info="There are the details" />,
  document.getElementById("app")
);
