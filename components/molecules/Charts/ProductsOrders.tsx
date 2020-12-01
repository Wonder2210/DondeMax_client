import React from "react";
import { VictoryChart, VictoryGroup, VictoryArea } from "victory";

const Chart: React.FC<{
  orders: Array<{
    id: number;
    products: Array<{
      id: number;
    }>;
  }>;
}> = ({ orders }) => (
  <VictoryChart width={400} height={400}>
    <VictoryGroup
      style={{
        data: { strokeWidth: 3, fillOpacity: 0.4 },
      }}
    >
      <VictoryArea
        style={{
          data: { fill: "#E91E63", stroke: "#E91E63" },
        }}
        data={[...orders.map((i) => ({ x: String(i.id), y: i.products.length }))]}
      />
    </VictoryGroup>
  </VictoryChart>
);

export default Chart;
