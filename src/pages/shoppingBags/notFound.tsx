import {
  Paper,
  Typography,
  Grid,
  makeStyles,
  createStyles,
  Theme,
  Hidden,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import CustomButton from "../../components/common/button";
import { ReducersModal } from "./../../models";

// ** components ****

import Utils from "../../utils";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../pages/account/profile/action";
import { getDashboardData } from "../../pages/account/lybc/action";
import RecommendationCarousel from "../../components/common/recommendationCarousel";
import Recommended from "./recommended";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // backgroundColor: "var(--backgroun-color)",
      [theme.breakpoints.down("xs")]: {
        width: "112%",
        marginLeft: "-20px"
      }
    },
    outerRoot: {

    },
    heading: {
      font: `normal  ${theme.spacing(2.8)}px Recoleta`,
      lineHeight: "38px",
      fontWeight: 600,
      color: "var(--green-color)",
      marginTop: "20px",
    },
    heading2: {
      font: `normal  ${theme.spacing(1.6)}px Work Sans Medium`,
      lineHeight: "38px",
      fontWeight: 500,
      color: "var(--secondary-color)",
      marginTop: "20px",
    },

    btn: {
      width: "25%",
      [theme.breakpoints.down("xs")]: {
        width: "60%",
        // padding:"0px 20px"
      },
    },
    paper: {
      margin: theme.spacing(7, 0),
      padding: theme.spacing(1.5),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(2, 1),
        boxShadow: "none",
      },
    },
    innerContainer: {
      justifyContent: "center",
      height: "35em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        height: "20em",
      },
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

    subHeading: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--light-gray)",
      marginLeft: theme.spacing(1),
    },
    sideBarLogo: {
      display: "flex",
      padding: theme.spacing(2, 1),
      backgroundColor: "var(--primary)",
      "& div": {
        display: "flex",
        flexDirection: "column",
        paddingLeft: theme.spacing(1),

        "& .MuiTypography-body2": {
          font: `normal 20px Druk`,
          color: theme.palette.secondary.main,
          letterSpacing: "2px",
        },
        "& .MuiTypography-body1": {
          font: `normal 400  12px Work Sans`,
          color: "var(--white)",
        },
      },
    },
    logo: {
      height: "45px",
      width: "45px",
    },
    description: {
      font: `normal ${theme.spacing(1.4)}px Work Sans !important`,
    },
  })
);
interface Props {
  message: string;
  type: string;
}
function NotFound({ message, type }: Props) {
  const classes = useStyles();
  const history = useHistory();
  const [sideBar, setSideBar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const userInfo = useSelector(
    (state: ReducersModal) => state.userDetailReducer.userInfo
  );
  const configs: any = useSelector(
    (state: ReducersModal) => state.configReducer.generalConfigs
  );
  const toggleDrawer = (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    // if (
    //   !sideBar &&
    //   isAuthenticated()
    //   // &&showMode("wallet")
    // ) {
    //   // dispatch(showLoader())
    //   dispatch(getUserProfile());
    //   getBalance();

    //   dispatch(getDashboardData(() => {}));

    // }
    setSideBar(!sideBar);
  };
  const redirect = () => {
    if (userInfo?.tierType !== 1) {
      const type = userInfo.tierType === 2 ? 1 : 2;
      history.push({
        pathname: Utils.routes.UPGRADE_MEMBERSHIP,
        state: { type, pageName: "Love Your Body Club" },
      });
    }
  };
  return (
    <div className={type === "shoppingBag" ? classes.root : classes.outerRoot}>
      <Hidden xsDown>
        <Typography className={classes.heading}>
          Shopping Bag
          <Typography className={classes.subHeading}>(O Items)</Typography>
        </Typography>
      </Hidden>
      <Hidden smUp>
        {type === "shoppingBag" ? (
          <>
          {userInfo?.tierType !== 1 &&userInfo?.tierType !== 2 && (
              <div
                className={classes.sideBarLogo}
                onClick={(e: any) => {
                  toggleDrawer(e);
                  redirect();
                }}
              >
                <img
                  className={classes.logo}
                  src={Utils.images.LYBC_FIVE}
                  alt="logo"
                />
                <div>
                  <Typography variant="body2">
                    {configs?.lybc_banner_title || ""}
                  </Typography>
                  <Typography className={classes.description} variant="body1">
                    {configs?.lybc_banner_description || ""}{" "}
                  </Typography>
                </div>
              </div>
            )}
          </>
        ) : (
          <Typography className={classes.heading}>
            Shopping Bag
            <Typography className={classes.subHeading}>(O Items)</Typography>
          </Typography>
        )}
      </Hidden>
      <Grid container>
        <Grid item xs={12}>
          <div>
            <Paper className={classes.paper}>
              <div className={classes.innerContainer}>
                <Hidden xsDown>
                  <img src={Utils.images.EMPTY} alt="empty" />
                  <Typography
                    variant="h3"
                    align="center"
                    className={classes.heading}
                  >
                    No Items in the Cart
                  </Typography>
                </Hidden>
                <Hidden smUp>
                  {type === "shoppingBag" ? (
                    <img src={Utils.images.EMPTYBAG} alt="empty" />
                  ) : (
                    <img src={Utils.images.EMPTY} alt="empty" />
                  )}
                  {type === "shoppingBag" ? (
                    <Typography
                      variant="h3"
                      align="center"
                      className={classes.heading2}
                    >
                      Your bag is empty
                    </Typography>
                  ) : (
                    <Typography
                      variant="h3"
                      align="center"
                      className={classes.heading}
                    >
                      No Items in the Cart
                    </Typography>
                  )}
                </Hidden>

                {!message.includes("filters") && 
                (
                  type === "shoppingBag" ?
                    <>
                      <Hidden smUp>
                        <div className={classes.btn}>
                          <CustomButton
                            onClick={() => history.push(Utils.routes.WISHLIST)}
                            fullWidth
                            type={"submit"}
                            text={"Select From Wishlist"}
                            variant={"contained"}
                          />
                        </div>
                      </Hidden>
                      <Hidden xsDown>
                        <div className={classes.btn}>
                          <CustomButton
                            onClick={() => history.push("/")}
                            fullWidth
                            type={"submit"}
                            text={"Start Shopping"}
                            variant={"contained"}
                          />
                        </div>
                      </Hidden>
                    </>

                    :
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
              {type === "shoppingBag" && <Hidden smUp>
                <Recommended/>

              </Hidden>
              }
            </Paper>
          </div>
        </Grid >
      </Grid >
    </div >
  );
}

export default NotFound;
