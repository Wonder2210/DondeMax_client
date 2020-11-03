import React from "react";
import Actions from "./ActionButtons";

export const TestActionButtons = () => {
  return (
    <div>
      <Actions onDelete={() => alert("delete")} onUpdate={() => alert("update")} />
    </div>
  );
};

export default {
  title: "Molecules/ActionButtons",
};
