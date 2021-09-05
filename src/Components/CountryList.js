import React, { useState, useEffect } from "react";
import {
  TextField,
  makeStyles,
  MenuItem,
  Typography,
  Grid,
  Avatar,
} from "@material-ui/core";
import { connect } from "react-redux";
import { addCountrys } from "../action/country";
import api from "../utils/api";

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: "40%",
  },
  title: {
    marginTop: "5%",
  },
  dropdown: {
    marginTop: "1%",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  infoItem: {
    marginTop: "3%",
  },
  countryImg: {
    marginTop: "3%",
    width: 150,
    height: 100,
  },
}));

const CountryList = ({ addCountrys, countryList }) => {
  const classes = useStyles();
  const [selectCountry, setSelectCountry] = useState("default");
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    api({ path: "/countries" })
      .then((res) => {
        addCountrys(res.data);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }, [addCountrys]);

  const getCountryInfo = (countryId) => {
    api({ path: `/country/${countryId}` })
      .then((res) => {
        setCountryInfo(res.data);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  const changeCountry = (e) => {
    setSelectCountry(e.target.value);
    getCountryInfo(e.target.value);
  };

  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" className={classes.title}>
          Country List
        </Typography>
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={4} className={classes.infoContainer}>
        {countryInfo && (
          <>
            <Typography className={classes.infoItem} variant="h6">
              Flag
            </Typography>
            <Avatar
              src={`http://localhost:8080/api/getImage/${countryInfo?.rank}`}
              className={classes.countryImg}
              variant="square"
            />

            <Typography className={classes.infoItem} variant="h6">
              Country Name
            </Typography>
            <Typography variant="h6">{countryInfo?.name}</Typography>
            <Typography className={classes.infoItem} variant="h6">
              Rank
            </Typography>
            <Typography variant="h6">{countryInfo?.rank}</Typography>
          </>
        )}
      </Grid>

      <Grid container>
        <Grid item xs={4} />
        <Grid item xs={4} className={classes.dropdown}>
          <TextField
            fullWidth
            variant="outlined"
            value={selectCountry}
            select
            onChange={changeCountry}
          >
            <MenuItem value={"default"}>Please select from dropdown</MenuItem>
            {countryList.map((item) => (
              <MenuItem value={item.Id}>{item.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  countryList: state.countrys,
});

const mapDispatchToProps = (dispatch) => ({
  addCountrys: (countrys) => {
    dispatch(addCountrys(countrys));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryList);
