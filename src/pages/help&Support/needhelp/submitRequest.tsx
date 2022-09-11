import {
  Grid,
  createStyles,
  makeStyles,
  Theme,
  Button,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Utils from "../../../utils";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/common/inputField";
import ContainedButton from "../../../components/containedButton";
import { Link } from "react-router-dom";
import CustomButton from "../../../components/common/button";
import axios from "axios";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    writeDiv: {
    marginBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(1, 3),
      },
    },
    headerDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing(2),
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Recoleta Alt`,
      lineHeight: "24px",
      color: "var(--secondary-black)",
      letterSpacing: "0.08em",
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

    detailsName: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      lineHeight: "21px",
      color: "var(--secondary-black)",
      margin: theme.spacing(1, 0, 0.5, 0),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(4.5, 0, 1, 0),
      },
    },

    inputWidth: {
      width: "100%",
      height: "54px",
    },
    textArea: {
      width: "100%",
      height: "160px",
      border: "none",
    },

    secndDiv: {
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 0),
      },
    },
    btn: {
      width: "164px",
    },
    img: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "16px",
      color: "var(--secondary-black)",
    },
    uploadedImg: {
      height: theme.spacing(17.5),
      width: theme.spacing(17.5),
      margin: theme.spacing(1, 1, 1, 0),
    },
    thirdDiv:{
      [theme.breakpoints.down("sm")]:{
        marginBottom: theme.spacing(4),
      }
    }
  })
);

const Input = styled("input")({
  display: "none",
});

function SubmitRequest() {
  const classes = useStyles();
  const WriteUsSchema = Yup.object().shape({
    name: Yup.string()
      .required("Please enter a name")
      .min(2, "Please enter a valid name")
      .max(50, "Please enter a valid name")
      .matches(Utils.regex.fullName, {
        message: "Please enter a valid name",
      }),

    orderNumber: Yup.string()
      .required("Please enter a order number")
      .matches(Utils.regex.onlyNumberRegex, {
        message: "Please enter a valid order number",
      }),
    message: Yup.string().max(200, "Please enter a valid message"),
  });

  const handleUploadImage = (input: any) => {
    axios
      .post(
        " https://stg.api.bazaarvoice.com/data/uploadphoto.json",
        {
          PassKey: "caOqsybxNs2DOApm28Q99IK8Ovlcxtr2p348NORihiYa4",
          photo: `@${input.target.value}`,
          ApiVersion: "1",
          ContentType: "review",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((resp) => {
      })
      .catch((err) => {
      });
  };
  const [selectedImage, setSelectedImage] = useState([]);

  const imageHandler = (e: any) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file:any) =>
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
          initialValues={{
            name: "",
            orderNumber: "",
            message: "",
          }}
          validationSchema={WriteUsSchema}
          validateOnChange
          onSubmit={(values, { setSubmitting }) => {}}
        >
          {({ values, errors, touched, isSubmitting, setFieldTouched }) => (
            <Form>
              <Grid container className={classes.wishlistDiv}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  className={[classes.outerDiv, classes.secndDiv].join(" ")}
                >
                  <div className={classes.headerDiv}>
                    <Typography variant="h4" className={classes.heading}>
                      Submit your request
                    </Typography>
                    <Link to="/">
                      <div className={classes.btn}>
                        <CustomButton
                          type={"submit"}
                          text={"Submit"}
                          fullWidth
                          variant={"contained"}
                        />
                      </div>
                    </Link>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={[classes.outerDiv, classes.secndDiv].join(" ")}
                >
                  <InputField
                    setFieldTouched={setFieldTouched}
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={"Subject"}
                    placeHolder={"Need urgent action"}
                    id="name"
                    name="name"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values.name}
                    isRequired={true}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={[classes.outerDiv, classes.secndDiv].join(" ")}
                >
                  <InputField
                    setFieldTouched={setFieldTouched}
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={"Order Number"}
                    placeHolder={"Order001927252"}
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
                    setFieldTouched={setFieldTouched}
                    alwaysShowLabel={true}
                    inputWidth={classes.textArea}
                    label={"Description"}
                    placeHolder={
                      "Received defected product.. Need replacement."
                    }
                    id="message"
                    name="message"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values.message}
                    isRequired={false}
                    actAs="textarea"
                  />
                </Grid>
                <Grid item xs={12} md={12} className={[classes.outerDiv, classes.thirdDiv].join(" ")}>
                  <Typography variant="body2" className={classes.img}>
                    Add Image
                  </Typography>

                  <div className={classes.outsideBox}>
                    {renderPhotos(selectedImage)}
                    {/* <div className={classes.parentDiv}>
                      <img
                        src={Utils.images.WRITE_IMG}
                        alt="image"
                        className={classes.imgDiv}
                      />
                      <img
                        src={Utils.images.DELETE_ICON}
                        alt="image"
                        className={classes.deleteImg}
                      />
                    </div> */}
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
                {/* <Grid item xs={12} md={12} className={classes.outerDiv}>
                  <Typography variant="body2" className={classes.img}>
                    Add Image
                  </Typography>

                  <div className={classes.outsideBox}>
                    <div className={classes.parentDiv}>
                      <img
                        src={Utils.images.WRITE_IMG}
                        alt="image"
                        className={classes.imgDiv}
                      />
                      <img
                        src={Utils.images.DELETE_ICON}
                        alt="image"
                        className={classes.deleteImg}
                      />
                    </div>
                    <div className={classes.inputBox}>
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={(e: any) => handleUploadImage(e)}
                        />
                        <img src={Utils.images.Add_More} alt="addMore" />
                      </label>
                    </div>
                  </div>
                </Grid> */}
              </Grid>
            </Form>
            // </Grid>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SubmitRequest;
