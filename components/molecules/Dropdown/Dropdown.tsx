import * as React from "react";

const { useState } = React;

type props = {
  list: string[];
};

const Dropdown: React.FC<props> = () => {
  let [state, setState] = useState({ open: false, selected: "" });
  return (
    <div>
      <h1>Here</h1>
    </div>
  );
};

export default Dropdown;
