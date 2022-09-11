import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Grid,
  Hidden,
  Divider,
} from "@material-ui/core";
import React, { useEffect } from "react";
import Utils from "../../../utils";
import { useState } from "react";
import { ReducersModal } from "../../../models";
import { useDispatch, useSelector } from "react-redux";
import { getGiftCardData } from "../action";
import clsx from "clsx";
import Skeleton from "@mui/material/Skeleton";
import { hideSkeleton, showSkeleton } from "../../home/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headingDiv: {
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(0, 0, 1, 0),
      [theme.breakpoints.down("xs")]:{
        margin: theme.spacing(2.8, 0, 1, 0),
      }
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
    },
    subheading: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )}px Work Sans`,
      color: "var(--main-opacity)",
      marginTop: "14px",
    },
    innerContainer: {
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1),
        margin: "3px 0px 10px 0px",
      },
      [theme.breakpoints.down("xs")]: {
        width: theme.spacing(15),
        height: "auto",
        padding: theme.spacing(0, 1, 0, 0),
      },
    },
    imgDiv: {
      height: "100.87px",
      // width: '178px',
      textAlign: "center",
      borderRadius: "4px",
    },
    selected: {
      border: "2px solid var(--main-opacity)",
      borderRadius: "4px",
    },
    img: {
      maxWidth: "100%",
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
    defaultImage: {
      backgroundColor: "#F8F3E9",
      padding: "7px",
      objectFit: "contain",
    },
    skeltonView2: {
      // padding: theme.spacing(2, 8),
      marginLeft: "20px",
    },
    skeltonView1: {
      margin: "0px 30px 0px 30px",
      // padding: theme.spacing(15),
      marginTop: "-20px !important",
    },
    skeletonContainer: {
      display: "flex",
      width: "100%",
    },
    container: {
      width: "100%",
      display: "flex",
      height: "auto",
      overflowX: "auto",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    giftCardDiv: {
      width: theme.spacing(15),
      height: "auto",
    },
    skeletonContent: {
      // display: "flex",
      // flexDirection: "column",
      justifySelf: "center",
    },
    divider: {
      height: "2px",
      border: "var(--border-color)",
      margin: theme.spacing(1.5,0)
    },
  })
);

interface Props {
  setSelectedDesign: Function;
  setImage: Function;
  selectedDesign: any;
  setSelectedAmount: Function;
  setDonationAmount: Function;
}
const SelectDesign: React.FC<Props> = ({
  setSelectedAmount,
  selectedDesign,
  setImage,
  setSelectedDesign,
  setDonationAmount,
}: Props) => {
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
  const [giftCardData, setGiftCardData] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(showSkeleton());
    dispatch(
      getGiftCardData((response: any) => {
        setGiftCardData(response?.data || []);
        const design = selectedDesign._id
          ? selectedDesign
          : response?.data?.[0];
        const defaultImage = design?.image?.[0]?.file || null;
        setImage(
          defaultImage
            ? IMAGE_URL + "catalog/product" + defaultImage
            : Utils.images.PRODUCT_PLACEHOLDER
        );
        setSelectedDesign(design || {});
        dispatch(hideSkeleton());
      })
    );
  }, []);

  const handleChange = (e: any) => {
    if (selectedDesign?._id !== e?._id) {
      const image = e?.image?.[0]?.file || "";
      setImage(IMAGE_URL + "catalog/product" + image);
      setSelectedDesign(e);
      setSelectedAmount(0);
      setDonationAmount(0);
      dispatch({
        type: "eCardSummary",
        payload: {},
      });
    }
  };

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  return (
    <>
      <Hidden smUp>
        <Divider light className={classes.divider} />
      </Hidden>
      <Hidden xsDown>
        <div className={classes.headingDiv}>
          {skeletonLoader ? (
            <Skeleton
              width={200}
              height={30}
              className={classes.skeltonView2}
            />
          ) : (
            <Typography className={classes.heading}>
              Select E-Gift Card Design
            </Typography>
          )}
        </div>
      </Hidden>
      {skeletonLoader ? (
        <div className={classes.skeletonContainer}>
          <Grid container spacing={1}>
            {Array.of(1, 2, 3).map((item: any) => (
              <Grid item xs={6} md={3} className={classes.skeletonContent} key={item}>
                <Skeleton height={150} className={classes.skeltonView2} />
                <Skeleton height={20} className={classes.skeltonView1} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <>
          <Hidden xsDown>
            <Grid container spacing={1}>
              {giftCardData.map((item: any, index: any) => (
                <Grid item xs={4} md={3} key={item._id}>
                  <div className={classes.innerContainer}>
                    <div
                      className={
                        selectedDesign._id === item._id
                          ? clsx(classes.selected, classes.imgDiv)
                          : classes.imgDiv
                      }
                      onClick={() => {
                        handleChange(item);
                      }}
                    >
                      <img
                        className={
                          item?.image?.[0]?.file
                            ? classes.img
                            : clsx(classes.img, classes.defaultImage)
                        }
                        src={
                          item?.image?.[0]?.file
                            ? `${IMAGE_URL}catalog/product${item.image[0].file}`
                            : Utils.images.PRODUCT_PLACEHOLDER
                        }
                        alt="product"
                      />
                    </div>
                    <div>
                      <Typography align="center" className={classes.subheading}>
                        {item.name}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Hidden>
          <Hidden smUp>
            <div className={classes.container}>
              {giftCardData.map((item: any, index: any) => (
                <div className={classes.giftCardDiv} key={item._id}>
                  <div className={classes.innerContainer}>
                    <div
                      className={
                        selectedDesign._id === item._id
                          ? clsx(classes.selected, classes.imgDiv)
                          : classes.imgDiv
                      }
                      onClick={() => {
                        handleChange(item);
                      }}
                    >
                      <img
                        className={
                          item?.image?.[0]?.file
                            ? classes.img
                            : clsx(classes.img, classes.defaultImage)
                        }
                        src={
                          item?.image?.[0]?.file
                            ? `${IMAGE_URL}catalog/product${item.image[0].file}`
                            : Utils.images.PRODUCT_PLACEHOLDER
                        }
                        alt="product"
                      />
                    </div>
                    <div>
                      <Typography align="center" className={classes.subheading}>
                        {item.name}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Hidden>
        </>
      )}
    </>
  );
};
export default SelectDesign;
