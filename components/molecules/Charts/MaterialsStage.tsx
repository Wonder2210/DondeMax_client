import React from "react";
import { VictoryChart, VictoryAxis, VictoryBar } from "victory";

const Chart = ({ data }) => (
  <VictoryChart
    // domainPadding will add space to each side of VictoryBar to
    // prevent it from overlapping the axis
    domainPadding={20}
  >
    <VictoryAxis
      // tickValues specifies both the number of ticks and where
      // they are placed on the axis

      tickFormat={[...data.materialsStage.map((i) => String(i.name))]}
    />
    <VictoryAxis
      dependentAxis
      // tickFormat specifies how ticks should be displayed
      tickFormat={(x) => `${x}kg`}
    />
    <VictoryBar
      data={[...data.materialsStage.map((i) => ({ material: i.name, peso: Number(i.weight) }))]}
      x="material"
      y="peso"
    />
  </VictoryChart>
);

export default Chart;
