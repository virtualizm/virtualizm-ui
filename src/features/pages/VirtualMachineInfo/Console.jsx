import React from "react";
import PropTypes from "prop-types";

const protocolMap = {
  "http:": "ws:",
  "https:": "wss:",
};

const isLocalhost = window.location.origin.indexOf("localhost") !== -1;
const host = isLocalhost ? "vm.in.onat.edu.ua" : window.location.host;
const protocol = window.location.protocol;
const spiceProtocol = isLocalhost ? "wss:" : protocolMap[protocol];

export const Console = ({ id }) => {
  const url = `${protocol}//${host}/spice/index.html?url=${spiceProtocol}//${host}/api/spice/${id}`;

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
