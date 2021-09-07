import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import { connect } from "react-redux";
import { addCountry } from "../action/country";

const useStyles = makeStyles((theme) => ({
  helperText: {
    color: "red",
    marginLeft: 5,
  },
}));

function AddCountryDialog({ show, addCountry }) {
  const classes = useStyles();
  const [fileuploadStatus, setFileuploadStatus] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [continment, setContinment] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getContinmentInfo = (countryId) => {
    api({ path: `/getcontiment` })
      .then((res) => {
        setContinment(res.data);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    show[0] && getContinmentInfo();
  }, [show]);

  const handleClose = () => {
    show[1](false);
  };

  const uploadImage = (e) => {
    setFileuploadStatus(true);
    var formData = new FormData();
    formData.append("image", e.target.files[0]);
    api({ method: "POST", path: "/uploadImage", data: formData })
      .then((res) => {
        setFileName(res.data?.filename);
      })
      .catch((err) => console.log("ERR", err))
      .finally(setFileuploadStatus(false));
  };

  const onSubmit = (data) => {
    if (fileuploadStatus) return;
    let countryData = {
      name: data.countryName,
      continent: data.continment,
      flag: `images/${fileName}`,
      rank: parseInt(data.Rank),
    };
    api({ method: "POST", path: `/createcountry`, data: countryData })
      .then((res) => {
        addCountry({ Id: countryData?.rank, name: countryData?.name });
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(handleClose(), reset({}));
  };

  const closePopup = () => {
    reset({});
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={show[0]}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">Add Country</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="countryImage"
              label="Country Image"
              type="file"
              onChange={(e) => uploadImage(e)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="countryName"
              label="Country Name"
              type="text"
              {...register("countryName", {
                required: " Please Enter Country Name",
                minLength: {
                  value: 3,
                  message: "Please enter atleast 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum 20 characters allowed",
                },
              })}
              fullWidth
            />
            {errors.countryName && (
              <FormHelperText>
                <Typography variant="body1" className={classes.helperText}>
                  {errors.countryName.message}
                </Typography>
              </FormHelperText>
            )}
            <TextField
              autoFocus
              margin="dense"
              id="Rank"
              label="Rank"
              type="number"
              {...register("Rank", {
                required: " Please Enter Country Rank",
              })}
              fullWidth
            />
            {errors.Rank && (
              <FormHelperText>
                <Typography variant="body1" className={classes.helperText}>
                  {errors.Rank.message}
                </Typography>
              </FormHelperText>
            )}
            <TextField
              fullWidth
              variant="outlined"
              {...register("continment", {
                required: " Please Select Country Contiment",
              })}
              defaultValue={"default"}
              select
            >
              <MenuItem value={"default"}>Please select from dropdown</MenuItem>
              {continment?.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            {errors.continment && (
              <FormHelperText>
                <Typography variant="body1" className={classes.helperText}>
                  {errors.continment.message}
                </Typography>
              </FormHelperText>
            )}
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={closePopup}>
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  addCountry: (countrys) => {
    dispatch(addCountry(countrys));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCountryDialog);
