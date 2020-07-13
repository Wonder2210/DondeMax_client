import * as React from "react";
import { CSSTransition } from "react-transition-group";
import { List } from "../../atoms/List";

type props = {
  show: boolean;
};

const Dropdown: React.FC<props> = ({ show, children }) => {
  return (
    <>
      <style jsx>
        {`
          .inner {
            position: absolute;
            z-index: 1;
            width: 100%;
          }
          .dropdown {
            width: 100%;
            background-color: white;
          }

          .dropdown-enter {
            transform: translateY(-110%);
          }
          .dropdown-enter-active {
            transform: translateX(0%);

            transition: all 0.5s ease;
          }
          .dropdown-exit {
          }
          .dropdown-exit-active {
            border-radius: 0;

            transform: translateY(-110%);
            transition: all 0.5s ease;
          }
        `}
      </style>
      <div className="inner">
        <CSSTransition in={show} timeout={1000} classNames="dropdown" unmountOnExit>
          <div className="dropdown">
            <List spacing={6} padding={3}>
              {children}
            </List>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default Dropdown;
