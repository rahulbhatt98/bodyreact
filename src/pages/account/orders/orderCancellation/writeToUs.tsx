import {
  Grid,
  createStyles,
  makeStyles,
  Theme,
  Button,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Utils from "../../../../utils";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import InputField from "../../../../components/common/inputField";
import { Link, useHistory } from "react-router-dom";
import CustomButton from "../../../../components/common/button";
import Skeleton from "@mui/material/Skeleton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    writeDiv: {
      margin: theme.spacing(3, 8),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(1, 3),
      },
    },
    headerDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      margin: theme.spacing(1, 0, 3.5, 0),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(2, -1.9, 3.5, -1.9),
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans`,
      lineHeight: "28px",
      color: "var(--secondary-black)",
    },
    outerDiv: {
      padding: theme.spacing(1, 2, 0, 2),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
      },
    },
    wishlistDiv: {
      width: "calc(100% + 40px)",
      margin: theme.spacing(-2),
    },
    imgDiv: {
      position: "absolute",
    },
    deleteImg: {
      position: "relative",
      top: "5px",
      left: "115px",
    },
    parentDiv: {
      height: theme.spacing(18),
      width: theme.spacing(24),
    },
    outsideBox: {
      display: "flex",
      marginTop: theme.spacing(1),
      flexWrap: "wrap",
    },
    inputBox: {
      background: "#E3F2F1",
      border: "1px solid #40857E",
      borderRadius: "2px",
      height: theme.spacing(18),
      width: theme.spacing(17.8),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    inputWidth: {
      width: "100%",
      height: "50px",
      [theme.breakpoints.down("xs")]: {
        "& .MuiGrid-spacing-xs-2 > .MuiGrid-item": {
          padding: theme.spacing(0),
        },
      },
    },
    textArea: {
      width: "100%",
      height: "160px",
      border: "none",
    },
    btnWidth: {
      "& .MuiButton-root": {
        padding: theme.spacing(1.5, 5),
        marginTop: theme.spacing(0),
      },
    },
    uploadedImg: {
      height: theme.spacing(17.5),
      width: theme.spacing(17.5),
      margin: theme.spacing(1, 1, 1, 0),
    },
    img: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      lineHeight: "19px",
      color: "var(--black300)",
    },
  })
);

const Input = styled("input")({
  display: "none",
});

function WriteToUs() {
  const classes = useStyles();
  const WriteUsSchema = Yup.object().shape({
    title: Yup.string()
      .required("Please enter title")
      .min(8, "Please enter valid Title"),

    orderNumber: Yup.string()
      .required("Please enter Order Number")
      .min(8, "Order Number length must be at least 8 characters long"),
  });

  const history = useHistory();
  const redirectToOrder = () => {
    history.push("/my-order");
  };

  const [selectedImage, setSelectedImage] = useState([]);

  const imageHandler = (e: any) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file: any) =>
        URL.createObjectURL(file)
      );
      setSelectedImage((prevImage: any) => prevImage.concat(fileArray));
      Array.from(e.target.files).map((file: any) => URL.revokeObjectURL(file));
    }
  };
  const renderPhotos = (source: any) => {
    return source.map((photo: any) => {
      return (
        <img
          src={photo}
          className={classes.uploadedImg}
          key={photo}
          alt="img"
        />
      );
    });
  };

  return (
    <>
      <div className={classes.writeDiv}>
        <Formik
          initialValues={{ title: "", others: "", orderNumber: "" }}
          validationSchema={WriteUsSchema}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            setSubmitting(true);
            if (!values?.title?.trim())
              setFieldError("title", "Please enter title");
            if (!values?.others?.trim())
              setFieldError("comment", "Please enter Comment");
            if (values?.others?.trim() && values?.title?.trim())
              redirectToOrder();
          }}
        >
          {({ values, errors, touched, isSubmitting, setFieldTouched }) => (
            <Form>
              <div className={classes.headerDiv}>
                <Typography variant="h4" className={classes.heading}>
                  Write to us
                </Typography>

                <div className={classes.btnWidth}>
                  <CustomButton
                    type="submit"
                    text={"Submit"}
                    variant={"contained"}
                    fullWidth
                  />
                </div>
              </div>

              <Grid container className={classes.wishlistDiv}>
                <Grid item xs={12} md={6} className={classes.outerDiv}>
                  <InputField
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={"Title"}
                    placeHolder={"Title"}
                    id="title"
                    name="title"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values?.title?.trim()}
                    isRequired={true}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.outerDiv}>
                  <InputField
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={"Order Number"}
                    placeHolder={"Order Number"}
                    id="orderNumber"
                    name="orderNumber"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values.orderNumber}
                    isRequired={true}
                  />
                </Grid>
                <Grid item xs={12} md={12} className={classes.outerDiv}>
                  <InputField
                    maxLength={200}
                    setFieldTouched={setFieldTouched}
                    alwaysShowLabel={true}
                    inputWidth={classes.textArea}
                    label={"Others"}
                    placeHolder={"Please leave a comment"}
                    id="others"
                    name="others"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values?.others?.trim()}
                    isRequired={false}
                    actAs="textarea"
                  />
                </Grid>
                <Grid item xs={12} md={12} className={classes.outerDiv}>
                  <Typography variant="body2" className={classes.img}>
                    Add Image
                  </Typography>

                  <div className={classes.outsideBox}>
                    {renderPhotos(selectedImage)}
                    <div className={classes.parentDiv}>
                      <img
                        src={Utils.images.WRITE_IMG}
                        className={classes.imgDiv}
                        alt="writeImg"
                      />
                      <img
                        src={Utils.images.DELETE_ICON}
                        className={classes.deleteImg}
                        alt="delete"
                      />
                    </div>
                    <div className={classes.inputBox}>
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={imageHandler}
                        />
                        <img src={Utils.images.Add_More} alt="addMore" />
                      </label>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default WriteToUs;
