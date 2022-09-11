import {
  Grid,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Hidden,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Utils from "../../../../utils";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import InputField from "../../../../components/common/inputField";
import { useHistory, useLocation } from "react-router-dom";
import CustomButton from "../../../../components/common/button";
import { useDispatch, useSelector } from "react-redux";
import { writeToUs } from "./action";
import { hideLoader, showLoader } from "../../../home/actions";
import { uploadToZendesk } from "../action";
import { ReducersModal } from "../../../../models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    writeDiv: {
      // margin: theme.spacing(3, 8),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(1, 1.5),
        padding: "20px"

      },
    },
    headerDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      margin: theme.spacing(1, 0, 3.5, 0),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(2, -2, 3.5, -1.9),
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans`,
      lineHeight: "28px",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
    outerDiv: {
      padding: theme.spacing(1, 2, 0, 2),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
      },
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0.5, 0),
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
      position: "absolute",
      top: "5px",
      left: "123px",
      cursor: "pointer",
      width: "40px",
      height: "40px",
      [theme.breakpoints.down("xs")]: {
        left: "70px",
        top: "2px",
      },
    },
    parentDiv: {
      height: theme.spacing(18),
      width: theme.spacing(17.8),
      margin: theme.spacing(1),
      position: "relative",
      [theme.breakpoints.down("xs")]: {
        width: theme.spacing(10),
        height: theme.spacing(10),
      },
    },
    outsideBox: {
      display: "flex",
      marginTop: theme.spacing(1),
      flexWrap: "wrap",
      [theme.breakpoints.down("sm")]: {
        // flexDirection: "column",
        // alignItems: "center",
      },
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
      margin: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        width: "110px",
        height: "100px",
        margin: theme.spacing(1, 0),
      },
    },
    addImageInput: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
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
        [theme.breakpoints.down("xs")]: {
          // padding: theme.spacing(1, 2),
          position: "fixed",
          width: "93%",
          bottom: "0"
        },
      },
      [theme.breakpoints.down("xs")]: {

      }
    },
    uploadedImg: {
      // height: theme.spacing(17.5),
      // width: theme.spacing(17.5),
      // margin: theme.spacing(1, 1, 1, 0),
      height: "100%",
      width: "100%",
    },
    imgText: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      lineHeight: "19px",
      color: "#0D0D0D",
    },
  })
);

const Input = styled("input")({
  display: "none",
});

function WriteToUs() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location: any = useLocation();
  const flag = location?.state?.flag || "";
  const orderId = location?.state?.orderId || null;
  const selectedOrderId: any = useSelector((state: ReducersModal) => state.orderHistoryReducer.selectedOrder?.orderId) || null;

  const WriteUsSchema = Yup.object().shape({
    title: Yup.string()
      .required("Please enter title")
      .max(200, "Please enter a valid Title"),
    others: Yup.string()
      .required("Please enter Comment")
      .max(200, "Please enter a valid Comment"),
  });

  const [selectedImages, setSelectedImages] = useState<any>([]);
  const imageHandler = (e: any) => {
    if (e?.target?.files) {
      let image = e?.target?.files?.[0]
      if (image) {
        const imageExists = selectedImages.findIndex((item: any) => item?.url === URL.createObjectURL(image));
        if (imageExists < 0) {
          dispatch(showLoader());
          uploadToZendesk(image).then((resp: any) => {
            dispatch(hideLoader());
            // setUrls((prevState: any) => [...prevState, resp?.data?.data?.image_url])
            setSelectedImages((prevState: any) => {
              return [
                ...prevState,
                {
                  url: URL.createObjectURL(image),
                  token: resp?.data?.data?.token,
                  image_url: resp?.data?.data?.image_url || ""
                }
              ]
            });
          }).catch((err: any) => {
            dispatch(hideLoader());
            dispatch({
              type: "show-alert",
              payload: {
                type: "error",
                message: "This image is could not be uploaded.",
              },
            });
          })
        } else {
          dispatch({
            type: "show-alert",
            payload: {
              type: "error",
              message:
                "This image is already uploaded. Please upload a new one",
              position: "center",
            },
          });
        }
      }
    }
  };


  useEffect(() => {
    if (!selectedOrderId && flag !== "help-support") {
      history.push(Utils.routes.ORDER_HISTORY);
    }
  }, []);

  const deleteImage = (photo: any) => {
    // const images = selectedImages;
    // const s3UrlToDelete: any = selectedImages.filter(
    //   (img: any) => img.url === photo.url
    // );
    // const filteredImages = images.filter(
    //   (image: any) => photo.url !== image.url
    // );
    // if (
    //   urls.length > 0 &&
    //   s3UrlToDelete.length > 0 &&
    //   s3UrlToDelete?.[0]?.s3Url
    // ) {
    //   dispatch(showLoader());
    //   deleteFromS3(s3UrlToDelete[0].s3Url, () => {
    //     dispatch(hideLoader());
    //     setSelectedImages(filteredImages);
    let tempArr = selectedImages?.filter((item: any) => item?.token !== photo?.token)
    setSelectedImages(tempArr)

  };
  const renderPhotos = (source: any) => {
    return source.map((photo: any) => {
      return (
        <div className={classes.parentDiv} key={photo?.url}>
          <img src={photo?.url} className={classes.uploadedImg} alt="img" />
          <img
            onClick={() => deleteImage(photo)}
            src={Utils.images.DELETE_ICON}
            alt="deleteImg"
            className={classes.deleteImg}
          />
        </div>
      );
    });
  };
  // const breadcrumb = flag === "help-support" ? [] :
  //   [
  //     { title: "Order Details", action: "order-detail/" + (selectedOrder?._id || 0) },
  //     { title: "Return Policy", action: "/return-policy" },
  //     { title: "Write To Us", action: "/write-to-us" },
  //   ]
  const title = flag === "help-support" ? "Submit your request" : "Write to us";
  // const isOrderNumberDisabled = flag === "help-support" ? false : true;
  const isOrderNumberDisabled = selectedOrderId || orderId ? true : false;
  const redirectUrl =
    flag === "help-support"
      ? { pathname: Utils.routes.HELP_SUPPORT, state: { pageName: "Help & Support" } }
      : { pathname: Utils.routes.ORDER_HISTORY, state: { pageName: "My Orders" } }


  return (
    <>
      <div className={classes.writeDiv}>
        {/* <BreadCrumb
          breadcrumb={breadcrumb}
        /> */}
        <Formik
          initialValues={{
            title: "",
            others: "",
            orderNumber: selectedOrderId
              ? selectedOrderId
              : orderId
                ? orderId
                : "",
          }}
          validationSchema={WriteUsSchema}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            setSubmitting(true);
            const imageArr = selectedImages.reduce((arr: any, image: any) => {
              const { imageTokens, imageUrls } = arr;
              if (image?.token)
                imageTokens.push(image.token);
              if (image?.image_url)
                imageUrls.push(image.image_url)
              return arr;
            }, { imageTokens: [], imageUrls: [] });
            const payload = {
              title: values.title?.trim(),
              description: values.others?.trim(),
              orderId: values.orderNumber,
              images: imageArr?.imageUrls || [],
              imageTokens: imageArr?.imageTokens || []
            };
            setSubmitting(true);
            if (!values?.title?.trim())
              setFieldError("title", "Please enter title");
            if (!values?.others?.trim())
              setFieldError("others", "Please enter Comment");
            if (values?.others?.trim() && values?.title?.trim())
              dispatch(
                writeToUs(payload, (resp: any) => {
                  // if (resp) {
                  history.push(redirectUrl);
                  // }
                })
              );
          }}
        >
          {({ values, errors, touched, isSubmitting, setFieldTouched }) => (
            <Form>
              <Hidden xsDown>
                <div className={classes.headerDiv}>
                  <Typography variant="h4" className={classes.heading}>
                    {title}
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
              </Hidden>

              <Grid container className={classes.wishlistDiv}>
                <Grid item xs={12} md={6} className={classes.outerDiv}>
                  <InputField
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={"Subject"}
                    placeHolder={"Subject"}
                    id="title"
                    name="title"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values?.title}
                    isRequired={true}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.outerDiv}>
                  <InputField
                    isDisabled={isOrderNumberDisabled}
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
                    maxLength={500}
                    setFieldTouched={setFieldTouched}
                    alwaysShowLabel={true}
                    inputWidth={classes.textArea}
                    label={"Comment"}
                    placeHolder={"Please leave a comment"}
                    id="others"
                    name="others"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values?.others}
                    isRequired={true}
                    actAs="textarea"
                  />
                </Grid>
                <Grid item xs={12} md={12} className={classes.outerDiv}>
                  <Typography variant="body2" className={classes.imgText}>
                    Add Image
                  </Typography>

                  <div className={classes.outsideBox}>
                    {renderPhotos(selectedImages)}
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
                    {selectedImages?.length<6&&<div className={classes.inputBox}>
                      <label
                        className={classes.addImageInput}
                        htmlFor="contained-button-file"
                      >
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          // multiple
                          type="file"
                          onChange={imageHandler}
                        />
                        <img src={Utils.images.Add_More} alt="addMore" />
                      </label>
                    </div>
                    }
                  </div>
                  <Hidden smUp>
                    <div className={classes.btnWidth}>
                      <CustomButton
                        type="submit"
                        text={"Submit"}
                        variant={"contained"}
                        fullWidth
                      />
                    </div>
                  </Hidden>
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
