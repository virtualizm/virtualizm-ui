import React from "react";
import { Tag } from "antd";

export const TagsList = ({ tags }) => {
  return tags.map((tag) => <Tag color="blue">{tag}</Tag>);
};
