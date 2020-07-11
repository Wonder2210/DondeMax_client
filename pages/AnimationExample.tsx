/* eslint-disable react/button-has-type */
/* eslint-disable react/self-closing-comp */
import * as React from "react";
import { CSSTransition } from "react-transition-group";

const { useState } = React;

const index = () => {
  const [state, setstate] = useState("main");
  const compare = () => (state === "main" ? "secondary" : "main");
  return (
    <div className="full-body">
      <button onClick={() => setstate(compare)}>Transition</button>
      <div className="inner">
        <CSSTransition in={state === "main"} timeout={500} classNames="menu-primary" unmountOnExit>
          <div className="left"></div>
        </CSSTransition>
        <CSSTransition in={state === "secondary"} timeout={500} classNames="menu-secondary" unmountOnExit>
          <div className="right"></div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default index;
