import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import { setVmTags } from "../utils/api";
import { TagsList } from "../components/Tags";

const { Option } = Select;

export const TagsEdit = ({ vmId, tags }) => {
  const children = [];

  const [editMode, setEditMode] = useState(false);
  const [tagsToAssign, setTagsToAssign] = useState([]);

  tags.map((tag, index) => children.push(<Option key={index}>{tag}</Option>));

  useEffect(() => {
    console.log(editMode);
  }, [editMode]);

  function toggleEdit() {
    setEditMode(!editMode);
  }

  const fillTagList = (value) => {
    setTagsToAssign(value);
  };

  const submitTags = async (e) => {
    try {
      await setVmTags(vmId, tagsToAssign);
    } catch (e) {
      console.log("ALARM VZLOM ZHOPY", e);
    }
    setTagsToAssign([]);
    toggleEdit();
  };

  return editMode ? (
    <>
      <Select
        mode="tags"
        style={{ width: "300px" }}
        placeholder="Enter the tag"
        onChange={fillTagList}
      >
        {children}
      </Select>
      <CheckOutlined onClick={submitTags} />
    </>
  ) : (
    <>
      <TagsList tags={tags} />
      <EditOutlined onClick={toggleEdit} />
    </>
  );
};
