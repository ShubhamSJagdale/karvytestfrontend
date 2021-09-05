import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./layout/Header";
import CountryList from "./CountryList";
import AddCountry from "./AddCountry";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
  },
}));

const Home = ({ countrys }) => {
  const classes = useStyles();

  // useEffect(() => {
  //   api({ path: "/countries" })
  //     .then((res) => {
  //       console.log("RES", res.data);
  //       addCountry(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("Err", err);
  //     });
  // }, [addCountry]);

  return (
    <div className={classes.container}>
      <Header />
      <CountryList  />
      <AddCountry />
    </div>
  );
};

export default Home;
