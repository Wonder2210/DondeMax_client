import React from "react";
import ListItem from "./Listitem";
import List from "./List";

export const SimpleList = () => {
  return (
    <div style={{ width: "350px" }}>
      <List spacing={3}>
        <ListItem>Chocolate</ListItem>
        <ListItem>Vainilla</ListItem>
        <ListItem>Mantecado</ListItem>
        <ListItem>Coco</ListItem>
        <ListItem>Fresa</ListItem>
      </List>
    </div>
  );
};

export default {
  title: "Atoms/Lists",
};
