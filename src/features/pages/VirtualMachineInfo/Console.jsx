import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

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
    <div className={styles.console}>
      <iframe
        src={url}
        title="qwe"
        width="100%"
        height="100%"
        id="myiframe"
      ></iframe>
    </div>
  );
};

Console.propTypes = {
  id: PropTypes.string.isRequired,
};
