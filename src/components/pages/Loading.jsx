import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  spinner: {
    position: "absolute",
    left: "50%",
    top: "50%",
  },
}));

function Loading() {
  const classes = useStyles();

  return <CircularProgress className={classes.spinner} size={100} />;
}

export default Loading;
