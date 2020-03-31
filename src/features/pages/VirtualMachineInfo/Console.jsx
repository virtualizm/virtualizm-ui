import React from "react";
import PropTypes from "prop-types";

const isLocalhost = window.location.origin.indexOf("localhost") !== -1;
const host = isLocalhost ? "https://vm.in.onat.edu.ua" : window.location.origin;

export const Console = ({ id }) => {
  const url = `${host}/spice/index.html?url=wss://vm.in.onat.edu.ua/spice/${id}`;

  return (
    <iframe
      src={url}
      title="qwe"
      width="100%"
      height="100%"
      id="myiframe"
    ></iframe>
  );
};

Console.propTypes = {
  id: PropTypes.string.isRequired,
};
