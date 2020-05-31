import React from "react";
import { Tag } from "antd";

export const RunningState = ({ state }) => {
  const color = state === "running" ? "green" : "red";
  return <Tag color={color}>{state}</Tag>;
};
