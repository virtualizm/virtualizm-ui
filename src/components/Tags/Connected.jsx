import React from "react";
import { Tag } from "antd";

export const Connected = (connected) => {
  const [color, state] = connected
    ? ["green", "connected"]
    : ["red", "disconnected"];
  return <Tag color={color}>{state}</Tag>;
};
