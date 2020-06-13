import React, { useState, useEffect, useContext } from "react";
import { Select } from "antd";
import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { setVmTags } from "../utils/api";
import { TagsList } from "../components/Tags";

import { StoreContext } from "../app/store";

const { Option } = Select;

const buttonStyles = {
  margin: "5px",
};

export const TagsEdit = ({ vmId, vmTags }) => {
  const [editMode, setEditMode] = useState(false);
  const [tagsToAssign, setTagsToAssign] = useState([]);
  const [assignedTags, assignTags] = useState(vmTags);

  const { store } = useContext(StoreContext);
  const { tags } = store;

  const children = [];

  for (let tag of tags) {
    children.push(<Option key={tag}>{tag}</Option>);
  }

  function toggleEdit() {
    setTagsToAssign([]);
    setEditMode(!editMode);
  }

  const fillTagList = (value) => {
    setTagsToAssign(value);
  };

  const submitTags = async (e) => {
    try {
      await setVmTags(vmId, tagsToAssign);
      assignTags(tagsToAssign);
    } catch (e) {
      console.log("An error occured", e);
    }
    toggleEdit();
  };

  return editMode ? (
    <>
      <Select
        mode="tags"
        style={{ width: "300px" }}
        placeholder="Enter the tag"
        onChange={fillTagList}
        defaultValue={assignedTags}
      >
        {children}
      </Select>
      <CheckOutlined onClick={submitTags} style={buttonStyles} />
      <CloseOutlined onClick={toggleEdit} style={buttonStyles} />
    </>
  ) : (
    <>
      <TagsList tags={assignedTags} />
      <EditOutlined onClick={toggleEdit} style={buttonStyles} />
    </>
  );
};
