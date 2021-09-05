import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddCountryDialog from "./AddCountryDialog";

const AddCountry = () => {
  const showDialog = useState(false);
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={4}>
        <Button
          variant="outlined"
          style={{ marginTop: "3%" }}
          onClick={() => showDialog[1](!showDialog[0])}
          fullWidth
        >
          Add Country
        </Button>
        <AddCountryDialog show={showDialog} />
      </Grid>
    </Grid>
  );
};

export default AddCountry;
