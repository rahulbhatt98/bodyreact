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
import CustomButton from "../../../../components/common/button";

import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteFromS3, uploadToS3, uploadToZendesk } from "../action";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../../../models";
import { hideLoader, showLoader } from "../../../home/actions";
import BreadCrumb from "../../../../components/breadCrumb";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    writeDiv: {
      // margin: theme.spacing(3, 3),
      padding: theme.spacing(1,0),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(2, 1),
      },
    },

    outerDiv: {
      padding: theme.spacing(1, 0, 0, 0),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
      },
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
        top: "2px",
        left: "70px",
        width: "30px",
        height: "30px",

      }
    },
    parentDiv: {
      height: theme.spacing(18),
      width: theme.spacing(17.8),
      margin: theme.spacing(1),
      position: "relative",
      [theme.breakpoints.down("xs")]: {
        height: theme.spacing(10.3),
        width: theme.spacing(10.3),
        margin: theme.spacing(0.7),
      },
    },
    outsideBox: {
      display: "flex",
      flexWrap: "wrap",
      margin: theme.spacing(0,0,0,-0.4),
      [theme.breakpoints.down("sm")]: {
        // flexDirection: "column",
        marginTop: theme.spacing(1),

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
        height: theme.spacing(10.3),
        width: theme.spacing(10.3),
      },
    },
    fixedButtonContainer: {
      
      position: "fixed",
      bottom: "0px",
      left: "0px",
      right: "0px",
      width: "100%",
      background: "white",
      padding: "0px 10px"
    },
    addImageInput: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    btn: {
      width: "15%",
      "& .makeStyles-btnProceed-64.MuiButton-root": {
        marginTop: theme.spacing(0),
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    btnDiv: {
      display: "flex",
      alignContent: "center",
      justifyContent: "space-between",
      marginLeft: theme.spacing(0.4),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 0),
      },
    },
    btnName: {
      alignSelf: "center",
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans`,
      lineHeight: "28px",
      color: "var(--secondary-black)",
    },
    uploadedImg: {
      // height: theme.spacing(17.5),
      // width: theme.spacing(17.5),
      height: "100%",
      width: "100%",
      // objectFit:"cover"
      // margin: theme.spacing(1, 1, 1, 0),
    },
  })
);

const Input = styled("input")({
  display: "none",
});

function AddPhoto() {
  const classes = useStyles();
  const selectedOrderForReturn: any =
    useSelector((state: ReducersModal) => state.orderHistoryReducer.selectedOrderForReturn) || {};
  const selectedOrderId: any = useSelector((state: ReducersModal) => state.orderHistoryReducer.selectedOrder?._id) || null;
  const [selectedImages, setSelectedImages] = useState(
    selectedOrderForReturn?.images?.length > 0
      ? selectedOrderForReturn.images
      : []
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [urls, setUrls] = useState(
    selectedOrderForReturn?.urls?.length > 0 ? selectedOrderForReturn?.urls : []
  );

  const imageHandler = (e: any) => {
    if (e?.target?.files?.length > 0) {
      const imageUrlAndFileArray: any = Array.from(e.target.files).map(
        (file: any) => {
          return { file: file, url: URL.createObjectURL(file) };
        }
      );
      if (imageUrlAndFileArray[0]) {
        const imageExists = selectedImages.filter(
          (image: any) =>
            image?.file?.name === imageUrlAndFileArray?.[0]?.file?.name
        );
        if (imageExists.length === 0) {
          let images = selectedImages.concat(imageUrlAndFileArray[0]);
          setSelectedImages(images);
          // setSelectedImages((prevImage: any) => prevImage.concat(imageUrlAndFileArray));
          if (
            imageUrlAndFileArray?.[0]?.file?.name &&
            imageUrlAndFileArray?.[0]?.file
          ) {
            dispatch(showLoader());
            uploadToS3(
              imageUrlAndFileArray[0]?.file?.name,
              imageUrlAndFileArray[0].file,
              "orderImages",
              (data: any) => {
                if (data) {
                  let arr: any = urls;
                  arr.push({ url: data.location });
                  setUrls(arr);
                  images = images.map((image: any) => {
                    if (image.url === imageUrlAndFileArray[0].url)
                      image.s3Url = data.location;
                    return image;
                  });
                  setSelectedImages(images);
                }
                dispatch(hideLoader());
              }
            );
          }
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

  const deleteImage = (photo: any) => {
    const images = selectedImages;
    const s3UrlToDelete = selectedImages.filter(
      (img: any) => img.url === photo.url
    );
    const filteredImages = images.filter(
      (image: any) => photo.url !== image.url
    );

    // setSelectedImages(filteredImages);
    // if (selectedOrderForReturn?.images?.length > 0 && s3UrlToDelete.length > 0) {
    // const arr = selectedOrderForReturn?.images?.filter((img: any) => img.url !== s3UrlToDelete[0].s3Url);
    // dispatch({ type: "selectedOrderForReturn", payload: { ...selectedOrderForReturn, images: arr } })}
    if (
      urls.length > 0 &&
      s3UrlToDelete.length > 0 &&
      s3UrlToDelete?.[0]?.s3Url
    ) {
      dispatch(showLoader());
      deleteFromS3(s3UrlToDelete[0].s3Url, () => {
        dispatch(hideLoader());
        setSelectedImages(filteredImages);
        const arr = urls?.filter(
          (img: any) => img.url !== s3UrlToDelete[0].s3Url
        );
        setUrls(arr);
      });
    }
  };

  useEffect(() => {
    if (
      !selectedOrderForReturn?.items ||
      selectedOrderForReturn?.items?.length === 0
    ) {
      history.push("/order/list");
    }
  }, []);

  const renderPhotos = (source: any) => {
    return source.map((photo: any) => {
      return <div className={classes.parentDiv} key={photo?.url}>
        <img src={photo?.url} className={classes.uploadedImg} alt="img" />
        <img
          onClick={() => deleteImage(photo)}
          src={Utils.images.DELETE_ICON}
          alt="deleteImg"
          className={classes.deleteImg}
        />
      </div>;
    });
  };

  const handleSubmit = () => {
    dispatch({
      type: "selectedOrderForReturn",
      payload: {
        ...selectedOrderForReturn,
        images: selectedImages,
        urls: urls,
      },
    });
    history.push({pathname:"/return-reasons",state:{
      pageName:"Select Reason For Return"
    }});
  };

  return (
    <>
      <div className={classes.writeDiv}>
        <BreadCrumb
          breadcrumb={[
            {
              title: "Order Details",
              action: "order/detail/" + (selectedOrderId || 0),
            },
            { title: "My Orders", action: "/my-order" },
            { title: "Add Photo", action: "#" },
          ]}
        />
        <Hidden xsDown>
          <div className={classes.btnDiv}>
            <div className={classes.btnName}>
              <Typography className={classes.heading}>Add Photo</Typography>
            </div>
            <div className={classes.btn}>
              <CustomButton
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                text={"Next"}
                onClick={handleSubmit}
                disabled={selectedImages.length === 0}
              />
            </div>
          </div>
        </Hidden>
        <div className={classes.outerDiv}>
          <div className={classes.outsideBox}>
            {renderPhotos(selectedImages)}
            {/* {selectedImages.length === 0 && 
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
            </div>} */}
            <div className={classes.inputBox}>
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
          </div>
        </div>
        <Hidden smUp>
        <div className={classes.fixedButtonContainer}>
          <div className={classes.btn}>
            <CustomButton
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              text={"Next"}
              onClick={handleSubmit}
              disabled={selectedImages.length === 0}
            />
          </div>
        </div>
        </Hidden>
      </div>
    </>
  );
}

export default AddPhoto;
