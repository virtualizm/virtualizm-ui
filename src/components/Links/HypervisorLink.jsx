import React from "react";
import { Link } from "react-router-dom";

export const HypervisorLink = ({ hv }) => {
  return <Link to={"/hypervisors/" + hv.id}>{hv.name}</Link>;
};
