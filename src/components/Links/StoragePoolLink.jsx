import React from "react";
import { Link } from "react-router-dom";

export const StoragePoolLink = ({ pool }) => {
  return <Link to={"/storage-pools/" + pool.id}>{pool.name}</Link>;
};
