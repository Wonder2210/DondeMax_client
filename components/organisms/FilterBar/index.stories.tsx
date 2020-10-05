import React from "react";
import WideScreen from "./WideScreen";
import MobileScreen from "./MobileScreen";
import FilterBar from "./FilterBar";

// export const FilterBarTest = () => {
//   const [toggle, setToggle] = React.useState({
//     first: false,
//     second: false,
//   });
//   const [value, setValue] = React.useState({
//     first: "",
//     second: "",
//   });
//   return (
//     <WideScreen
//       onChange1={(e) => setValue((last) => ({ ...last, first: e }))}
//       onChange2={(e) => setValue((last) => ({ ...last, second: e }))}
//       show1={toggle.first}
//       show2={toggle.second}
//       toggle1={() => setToggle((last) => ({ ...last, first: !last.first }))}
//       toggle2={() => setToggle((last) => ({ ...last, second: !last.second }))}
//       value1={value.first}
//       value2={value.second}
//     />
//   );
// };

// export const MobileScreenTest = () => {
//   const [toggle, setToggle] = React.useState({
//     first: false,
//     second: false,
//   });
//   const [value, setValue] = React.useState({
//     first: "",
//     second: "",
//   });
//   return (
//     <MobileScreen
//       onChange1={(e) => setValue((last) => ({ ...last, first: e }))}
//       onChange2={(e) => setValue((last) => ({ ...last, second: e }))}
//       show1={toggle.first}
//       show2={toggle.second}
//       toggle1={() => setToggle((last) => ({ ...last, first: !last.first }))}
//       toggle2={() => setToggle((last) => ({ ...last, second: !last.second }))}
//       value1={value.first}
//       value2={value.second}
//     />
//   );
// };

export const filter = () => {
  const [state, setstate] = React.useState({
    types: "",
    preservations: "",
    showTypes: false,
    showPreservations: false,
  });
  const onChangePreservations = (e) => setstate((lastState) => ({ ...lastState, preservations: e }));
  const onChangeTypes = (e) => setstate((lastState) => ({ ...lastState, types: e }));
  const toggleTypes = () => setstate((lastState) => ({ ...lastState, showTypes: !lastState.showTypes }));
  const togglePreservations = () =>
    setstate((lastState) => ({ ...lastState, showPreservations: !lastState.showPreservations }));
  const products = [{ type: "type1" }, { type: "type12" }];
  const preservations = [{ type: "type12" }, { type: "type1" }];

  return (
    <FilterBar
      preservations={{
        list: preservations,
        onChange: onChangePreservations,
        show: state.showPreservations,
        toggle: togglePreservations,
        value: state.preservations,
      }}
      types={{
        list: products,
        onChange: onChangeTypes,
        show: state.showTypes,
        toggle: toggleTypes,
        value: state.types,
      }}
    />
  );
};

export default {
  title: "Organism/FilterBar",
};
