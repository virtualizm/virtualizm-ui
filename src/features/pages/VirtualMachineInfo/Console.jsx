import React from "react";
import PropTypes from "prop-types";

const host = window.location.host;

const isLocalhost = host.indexOf("localhost") !== -1;

export const Console = ({ id }) => {
  const url = `${
    isLocalhost ? "http://10.255.10.222:8081" : `http://${host}`
  }/spice/index.html?host=10.255.10.222&port=8081&vmInfoToken=${id}`;

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
