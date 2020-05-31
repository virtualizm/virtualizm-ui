import React from "react";
import { Tag } from "antd";

export const Persistent = ({ isPersistent }) => {
  if (isPersistent) {
    return <Tag color="blue">persistent</Tag>;
  }
  return <Tag color="orange">transient</Tag>;
};
