import * as React from "react";
import { CSSTransition } from "react-transition-group";
import { List } from "../../atoms/List";
import "./styles.css";

type props = {
  show: boolean;
};

const Dropdown: React.FC<props> = ({ show, children }) => {
  return (
    <div className="inner">
      <CSSTransition in={show} timeout={1000} classNames="dropdown" unmountOnExit>
        <div className="dropdown">
          <List spacing={6} padding={3}>
            {children}
          </List>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Dropdown;
