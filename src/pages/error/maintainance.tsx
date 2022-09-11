import { Hidden, makeStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CustomButton from "../../components/common/button";
import Utils from "../../utils";
import { getConfig } from "../home/actions";

const useStyles = makeStyles((theme) => ({
  outerDiv: {
    // margin: "100px",
    display: "flex",
    placeItems: "center",
    flexDirection: "column",
    // [theme.breakpoints.down("xs")]: {
    //   margin: theme.spacing(10, 1),
    // },
  },
  imgDiv: {
    width: "100%",
    height: "100vh",
    [theme.breakpoints.down("xs")]:{
      height: "auto",
    },
  },
  heading: {
    margin: theme.spacing(2.5, 0, 2, 0),
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.8
    )}px Recoleta`,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: "var(--primary)",
  },
  subHeading: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.6
    )}px Work Sans Medium`,
    lineHeight: "24px",
    color: "var(--black)",
    width: "80%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  innerDiv: {
    width: "100%",
    display: "flex",
    placeItems: "center",
    flexDirection: "column",
  },
  btn: {
    "& .MuiButton-root": {
      backgroundColor: "#144236",
      padding: theme.spacing(1.5, 2.5),
    },
  },
}));

const Maintainance = () => {
  const classes = useStyles();
  // const history = useHistory();
  // const dispatch = useDispatch()
  console.log("router")
  // useEffect(() => {
  //   dispatch(getConfig({ configCode: "general" }));
  //   dispatch(getConfig({ configCode: "payment" }));
  // }, [])
  return (
    <>
      <div className={classes.outerDiv}>
        <div>
          <Hidden xsDown>
            <img src={Utils.images.NOT_FOUND_IMG} className={classes.imgDiv} />
          </Hidden>
          <Hidden smUp>
            <img
              src={Utils.images.NOT_FOUND_IMAGE}
              className={classes.imgDiv}
            />
          </Hidden>
          {/* <Typography variant="h4" align="center" className={classes.heading}>
            Under Maintainance
          </Typography> */}
          {/* <div className={classes.innerDiv}>
            <Typography
              variant="h4"
              align="center"
              className={classes.subHeading}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Typography>

            <div className={classes.btn}>
              <CustomButton
                text={"Start Shopping"}
                fullWidth={true}
                type="submit"
                variant="contained"
                onClick={() => history.push('/')}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Maintainance;
