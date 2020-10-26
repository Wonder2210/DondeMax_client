import React from "react";
import ListItem from "./Listitem";
import ListItemDashboard from "./ListItemDashboard";
import List from "./List";
import { Icon } from "@iconify/react";
import menuIcon from "@iconify/icons-cil/hamburger-menu";

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

export const SimpleListDashBoard = () => {
  return (
    <div style={{ width: "250px" }}>
      <List spacing={5}>
        <ListItemDashboard selected height="3em" icon={<Icon icon={menuIcon} color="#FFF" width="2em" />}>
          <a href="/#">Chocolate</a>
        </ListItemDashboard>
        <ListItemDashboard icon={() => <Icon icon={menuIcon} color="#FFF" width="1em" />} height="3em">
          Vainilla
        </ListItemDashboard>
        <ListItemDashboard height="3em">Mantecado</ListItemDashboard>
        <ListItemDashboard height="3em">Coco</ListItemDashboard>
        <ListItemDashboard height="3em">Fresa</ListItemDashboard>
      </List>
    </div>
  );
};

export default {
  title: "Atoms/Lists",
};
