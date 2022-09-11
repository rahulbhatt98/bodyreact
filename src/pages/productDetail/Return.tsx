import { Divider, Hidden, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import Utils from "../../utils";
import Skeleton from "@mui/material/Skeleton";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(3.5, 0),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2, 0, 1.2, 0),
    },
  },
  iconsWrapper: {
    display: "flex",
    justifyContent: "space-around",
  },
  divider1: {
    display: "none",
  },
  divider2: {
    display: "flex",
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(1.5, 0),
  },
  text: {
    font: `normal ${theme.spacing(
      1.4
    )}px Work Sans Medium`,
    lineHeight: "16px",
    color: "var(--secondary-black)",
    [theme.breakpoints.down("xs")]:{
      font: `normal ${theme.spacing(
        1.3
      )}px Work Sans Medium`,
    }
  },
}));

const options = [
  {
    id: 1,
    img: `${Utils.images.VEGAN_ICON}`,
    text: "100% Vegetarian",
  },
  {
    id: 2,
    img: `${Utils.images.CRUELTY_ICON}`,
    text: "Cruelty Free",
  },
  {
    id: 3,
    img: `${Utils.images.RETURN_ICON}`,
    text: "Easy Return",
  },
];

const Return = () => {
  const classes = useStyles();
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  return (
    <div>
      {/* <Hidden xsDown> */}
      <Divider light className={classes.divider} />
      {/* </Hidden> */}
      {skeletonLoader ? (
        <Skeleton variant="rectangular" height={80} />
      ) : (
        <div className={classes.iconsWrapper}>
          {options.map((items: any) => (
            <React.Fragment key={items.id}>
              <div>
                <div className={classes.iconsContainer}>
                  <img src={items.img} alt="vegan" />
                </div>
                <Typography className={classes.text}>{items.text}</Typography>
              </div>
              <Divider
                orientation="vertical"
                flexItem
                className={items.id === 3 ? classes.divider1 : classes.divider2}
              />
            </React.Fragment>
          ))}
        </div>
      )}
      <Divider light className={classes.divider} />
    </div>
  );
};

export default Return;
