import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const style = {
  position: "absolute",
  left: "50%",
  top: "50%",
  fontSize: 50,
};

function Loading() {
  return <LoadingOutlined style={style} />;
}

export default Loading;
