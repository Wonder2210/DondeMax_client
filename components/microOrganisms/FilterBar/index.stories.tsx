import React from "react";
import WideScreen from "./WideScreen";
import MobileScreen from "./MobileScreen";
import FilterBar from "./FilterBar";

export const FilterBarTest = () => {
  const [toggle, setToggle] = React.useState({
    first: false,
    second: false,
  });
  const [value, setValue] = React.useState({
    first: "",
    second: "",
  });
  return (
    <WideScreen
      onChange1={(e) => setValue((last) => ({ ...last, first: e }))}
      onChange2={(e) => setValue((last) => ({ ...last, second: e }))}
      show1={toggle.first}
      show2={toggle.second}
      toggle1={() => setToggle((last) => ({ ...last, first: !last.first }))}
      toggle2={() => setToggle((last) => ({ ...last, second: !last.second }))}
      value1={value.first}
      value2={value.second}
    />
  );
};

export const MobileScreenTest = () => {
  const [toggle, setToggle] = React.useState({
    first: false,
    second: false,
  });
  const [value, setValue] = React.useState({
    first: "",
    second: "",
  });
  return (
    <MobileScreen
      onChange1={(e) => setValue((last) => ({ ...last, first: e }))}
      onChange2={(e) => setValue((last) => ({ ...last, second: e }))}
      show1={toggle.first}
      show2={toggle.second}
      toggle1={() => setToggle((last) => ({ ...last, first: !last.first }))}
      toggle2={() => setToggle((last) => ({ ...last, second: !last.second }))}
      value1={value.first}
      value2={value.second}
    />
  );
};

export const filter = () => <FilterBar />;

export default {
  title: "Organism/FilterBar",
};
