import {
  Typography,
  Grid,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router";
import CustomButton from "../../../components/common/button";
import clsx from "clsx";
// ** components ****

import Utils from "../../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // backgroundColor: "var(--backgroun-color)",
    },
    heading: {
      font: `normal  ${theme.spacing(2.8)}px Recoleta`,
      lineHeight: "38px",
      fontWeight: 600,
      color: "var(--green-color)",
      marginTop: "20px",
      [theme.breakpoints.down("xs")]: {
        font: `normal  ${theme.spacing(2)}px Recoleta Alt Bold`,
        fontWeight: 600,
        lineHeight: "35px",
        color: "var(--secondary-black)",
      },
    },
    description: {
      font: `normal  ${theme.spacing(2)}px Recoleta`,
      lineHeight: "20px",
      fontWeight: 500,
      color: "var(--green-color)",
      marginTop: "20px",
      marginBottom: "20px",
    },
    btn: {
      width: "25%",
      [theme.breakpoints.down("xs")]: {
        width: "50%",
      },
    },
    paper: {
      margin: theme.spacing(7, 0),
      padding: theme.spacing(1.5),
      // [theme.breakpoints.down("sm")]: {
      //   margin: theme.spacing(0),
      // }
    },
    innerContainer: {
      justifyContent: "center",
      height: "35em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      font: `normal  ${theme.spacing(3.6)}px Work Sans`,
      lineHeight: "42px",
      fontWeight: 600,
      color: "var(--green-color)",
      marginBottom: theme.spacing(0.5),
    },
    subTitle: {
      font: `normal  ${theme.spacing(1.6)}px Work Sans`,
      lineHeight: "19px",
      fontWeight: 500,
      color: "var(--black)",
    },
    imgDiv:{
      position: "absolute",
      marginTop: "-125px",
    marginLeft: "240px",
    [theme.breakpoints.down(600)]:{
      marginTop: "-120px",
      right: "110px",
    },
    [theme.breakpoints.down(500)]:{
      right: "48px",
    },
    [theme.breakpoints.down(400)]:{
      right: "30px",
    },
    [theme.breakpoints.down(365)]:{
      right: "23px",
    }
   

    }
  })
);
interface Props {
  message: string;
  hideButton?: boolean;
  emptyBagIcon?: boolean;
  background?: any;
  noDataFoundIcon?: any;
  description?: string;
  noPaymentFound?: boolean;
}
function OrderNotFound({
  message,
  hideButton,
  emptyBagIcon,
  background,
  noDataFoundIcon,
  noPaymentFound,
  description,
}: Props) {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <div>
            {/* <Paper className={classes.paper}> */}
            {/* {!message.includes('filters') &&
                <>
                  <Typography variant="h5" className={classes.title}>
                    My Order
                  </Typography>
                  <Typography variant={"body1"} className={classes.subTitle}>
                    Please note that orders declined will not appear in this list
                  </Typography>
                </>
              } */}
            <div
              className={clsx(
                classes.innerContainer,
                background ? background : ""
              )}
            >
              <img
                src={
                  emptyBagIcon
                    ? Utils.images.EMPTY_BAG
                    : noDataFoundIcon
                    ? Utils.images.PRODUCT_NOT_FOUND
                    : noPaymentFound
                    ? Utils.images.NO_PAYMENT
                    : Utils.images.EMPTY
                }
                alt="empty"
              />
              {noPaymentFound && <div className={classes.imgDiv}><img src={Utils.images.CROSS_PAYMENT} alt="crossPayment" /> </div>}
              <Typography
                variant="h3"
                align="center"
                className={classes.heading}
              >
                {message}
              </Typography>
              {description && (
                <Typography
                  variant="h3"
                  align="center"
                  className={classes.description}
                >
                  {description}
                </Typography>
              )}
              {!message.includes("filters") && !hideButton && (
                <div className={classes.btn}>
                  <CustomButton
                    onClick={() => history.push("/")}
                    fullWidth
                    type={"submit"}
                    text={"Start Shopping"}
                    variant={"contained"}
                  />
                </div>
              )}
            </div>

            {/* </Paper> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default OrderNotFound;
