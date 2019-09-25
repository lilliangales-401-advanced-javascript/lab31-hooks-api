import React from "react";
import PropTypes from "prop-types";
import { LoginContext } from "./context.js";

const If = props => {
  return props.condition ? props.children : null;
};

console.log("auth loaded");

export default function HookedAuth(props) {
  return (
    <LoginContext.Consumer>
      {context => {
        let okToRender =
          context.loggedIn &&
          (props.capability
            ? context.user.capabilities &&
              context.user.capabilities.includes(props.capability)
            : true);

        return <If condition={okToRender}>{props.children}</If>;
      }}
    </LoginContext.Consumer>
  );
}

HookedAuth.propTypes = {
  capability: PropTypes.string.isRequired
};
