import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Hidden,
} from "@material-ui/core";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AboutToUsSkeleton,
  FooterbannerSkeleton,
} from "../../components/common/skeletonList/aboutToUsSkeleton";
import { ReducersModal } from "../../models";
import Utils from "../../utils";
import { getPageData } from "../footerPages/action";
import { hideSkeleton, showSkeleton } from "../home/actions";
import Banner from "./banner";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerDiv: {
      margin: theme.spacing(4, 7),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(2, 1),
      },
    },
    img: {
      width: theme.spacing(8.4),
      height: theme.spacing(8.4),
      objectFit: "cover",
    },
    innerDiv: {},
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans`,
      color: "var(--green-color-100)",
      lineHeight: "28.15px",
      letterSpacing: "0.02em",
      margin: theme.spacing(1, 0),
    },
    version: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.6
      )}px Work Sans Medium`,
      color: "var(--light-gray)",
      lineHeight: "16px",
      margin: theme.spacing(0.5, 0),
    },
    // para: {
    //   font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
    //     1.5
    //   )}px Work Sans`,
    //   color: "var(--light-gray)",
    //   lineHeight: "22.4px",
    //   margin: theme.spacing(3, 0, 0, 0),
    //   letterSpacing: "-0.03em",
    //   [theme.breakpoints.down("xs")]: {
    //     margin: theme.spacing(2, 0, 0, 0),
    //   }
    // },
    para: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--light-gray)",
      lineHeight: "22.4px",
      margin: theme.spacing(1, 0),
      letterSpacing: "-0.03em",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(2, 0, 0, 0),
      },
      "& li": {
        padding: "10px 0px",
      },
      "& strong": {
        color: "#333333",
        font: `normal 700 16px Work Sans`,
      },
    },
  })
);

const MobileBanner = () => {
  const classes = useStyles();
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  return skeletonLoader ? (
    <FooterbannerSkeleton />
  ) : (
    <div className={classes.outerDiv}>
      {/* <img
        src={Utils.images.PRODUCT_PLACEHOLDER}
        alt="img"
        className={classes.img}
      /> */}
      <div className={classes.innerDiv}>
        {/* <Typography variant="h2" className={classes.heading} align="center">
          {"The Body Shop"}
        </Typography> */}
        {/* <Typography variant="h4" className={classes.version} align="center">
              {data?.version || ""}
            </Typography>
            <div className={classes.para} dangerouslySetInnerHTML={{ __html: data?.content || "" }} /> */}
      </div>
    </div>
  );
};
export default MobileBanner;
