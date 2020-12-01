//@ts-nocheck
import React from "react";
import { VictoryPie, VictoryLabel } from "victory";

const Chart = ({ data }) => (
  <VictoryPie
    animate={{
      duration: 2000,
    }}
    width={250}
    height={250}
    labelComponent={<VictoryLabel style={{ fontSize: "0.5em" }} />}
    labelRadius={({ innerRadius }) => innerRadius + 8}
    colorScale="warm"
    data={[
      {
        ...data.orders
          .map((i) => i.delivery_status == true)
          .reduce((prev, actual) => ({ ...prev, y: prev.y + 1 }), { x: "Entregados", y: 0 }),
      },
      {
        ...data.orders
          .map((i) => i.delivery_status == false)
          .reduce((prev, actual) => ({ ...prev, y: prev.y + 1 }), { x: "Por entregar", y: 0 }),
      },
    ]}
  />
);

export default Chart;
