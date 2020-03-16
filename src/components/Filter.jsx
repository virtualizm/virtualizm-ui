import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  header: {
    display: "flex",
  },
});

export const Filter = ({ onChange }) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container className={classes.header}>
        <Grid item>
          <TextField id="standard-basic" label="Id" onChange={onChange("id")} />
        </Grid>
        <Grid item>
          <TextField
            id="standard-basic"
            label="Name"
            onChange={onChange("name")}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
