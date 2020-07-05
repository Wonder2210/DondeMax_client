import React from "react";
import ListItem from "./Listitem";
import List from "./List";

export const SimpleList = () => {
  return (
    <div style={{ width: "250px" }}>
      <List spacing={5} padding={3} borderWidth="1px" borders={["0px", "35px"]}>
        <ListItem icon="phone">
          <a href="/#">Chocolate</a>
        </ListItem>
        <ListItem icon="phone">Vainilla</ListItem>
        <ListItem icon="phone">Mantecado</ListItem>
        <ListItem icon="phone">Coco</ListItem>
        <ListItem icon="phone">Fresa</ListItem>
      </List>
    </div>
  );
};

export default {
  title: "Atoms/Lists",
};
