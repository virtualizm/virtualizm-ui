import React from "react";
import { Tag } from "antd";

export const TagsList = ({ tags }) => {
  return tags.map((tag, index) => (
    <Tag color="blue" key={index}>
      {tag}
    </Tag>
  ));
};
