import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
  Divider,
  FormControlLabel,
  Hidden,
} from "@material-ui/core";
import GreenRadio from "../../components/common/customRadio";
import ClubMemberBenefit from "./clubMemberBenefit";
import { useEffect, useState } from "react";
import BreadCrumb from "../../components/breadCrumb";
import {
  HomeModal,
  ReducersModal,
  ShoppingBagModal,
  UserDetailModal,
} from "../../models";
import { useSelector, useDispatch } from "react-redux";
import { getTierDetails } from "../account/lybc/action";
import Utils from "../../utils";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "var(--max-width)",
      margin: theme.spacing(0, "auto"),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 1.5),
      },
    },
    chooseDiv: {
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1.5, 0),
      },
    },
    breadcrumb: {
      font: `normal 500 ${theme.spacing(1.4)}px Work Sans`,
      marginTop: "25px",
    },
    radioButton: {
      transition: "none",
      "&:hover": { backgroundColor: "white" },
      width: "14px",
      height: "14px",
    },
    optionTitle: {
      "& .MuiFormControlLabel-label": {
        font: `normal  ${theme.spacing(1.8)}px Work Sans`,
        fontWeight: 600,
        lineHeight: "19px",
        letterSpacing: "-0.333333px",
        color: "var(--black300)",
        margin: theme.spacing(0, 1),
        [theme.breakpoints.down("xs")]: {
          font: `normal ${theme.spacing(1.4)}px Work Sans SemiBold`,
        },
      },
      margin: theme.spacing(0),
    },

    outerDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

    },
    optionDescription: {
      font: `normal  ${theme.spacing(1.4)}px Work Sans`,
      fontWeight: 600,
      lineHeight: "19px",
      letterSpacing: "-0.333333px",
      color: "rgba(102, 102, 102, 0.99)",
      margin: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        font: `normal  ${theme.spacing(1.2)}px Work Sans Regular`,
        margin: "5px",
        letterSpacing: "0.02em"
      },
    },
    price: {
      font: `normal  ${theme.spacing(1.5)}px Work Sans`,
      fontWeight: 600,
      lineHeight: "24px",
      letterSpacing: "-0.333333px",
      color: "#333333",
      margin: theme.spacing(0, 1),
      [theme.breakpoints.down("xs")]: {
        font: `normal  ${theme.spacing(1.3)}px Work Sans Bold`,

      }
    },
    innerContainer: {
      margin: theme.spacing(0, 2),
      flexDirection: "column",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 0, 0, 2),
      },
    },
    innerDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexDirection: "column",
    },
    divider: {
      margin: theme.spacing(2, 0),
      color: "#F2F2F2",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 0),
      },
    },
  })
);

const ChoosePlan: React.FC<any> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [memberShip, setMemberShip] = useState<any>({});
  const [data, setData] = useState([]);

  const userInfo = useSelector(
    (state: ReducersModal) => state.userDetailReducer.userInfo
  );
  const memberShipData = useSelector(
    (state: ReducersModal) => state.homeReducer.memberShipData
  );
  const isMembershipAdded = useSelector(
    (state: ReducersModal) => state.shoppingBagReducer.isMembershipAdded
  );



  useEffect(() => {
    if (userInfo?.tierType !== 1 && !isMembershipAdded) {
      if (!memberShipData?.length) {
        let payload = { type: 2 };
        dispatch(
          getTierDetails(payload, (data: any) => {
            dispatch({
              type: Utils.ActionName.MENU_DATA,
              payload: { memberShipData: data },
            });
          })
        );
      }
    } else {
      history.push(Utils.routes.SHOPPING_BAG);
    }
  }, [isMembershipAdded]);

  useEffect(() => {
    let temp = memberShipData?.filter(
      (item: any) => item?.tierType < userInfo?.tierType
    );
    setData(temp);
  }, [userInfo, memberShipData]);

  useEffect(() => {
    setMemberShip(data?.[0]);
  }, [data]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Hidden xsDown>
          <Grid item xs={12} md={12}>
            {/* <Typography className={classes.breadcrumb}>{`Home / ${getPageName()}`}</Typography> */}
            <div className={classes.breadcrumb}>
              <BreadCrumb
                breadcrumb={[
                  { title: "Home", action: "/" },
                  { title: "Shopping Bag", action: "/shopping-bag" },
                  { title: "Choose Plan", action: "#" },
                ]}
              />
            </div>
          </Grid>
        </Hidden>

        <Grid item xs={12} md={8}>
          {data.map((item: any, index: any) => (
            <div className={classes.chooseDiv}>
              <Hidden xsDown>
                <Divider light className={classes.divider} />
              </Hidden>
              <Hidden smUp>
                {index === 0 ? null : (
                  <Divider light className={classes.divider} />
                )}
              </Hidden>
              <div className={classes.outerDiv}>
                <div className={classes.innerDiv}>
                  <FormControlLabel
                    value={item.tierType}
                    className={classes.optionTitle}
                    control={
                      <GreenRadio
                        className={classes.radioButton}
                        checked={memberShip?.tierType === item.tierType}
                        onChange={() => setMemberShip(item)}
                        value={item.tierType}
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "C" }}
                      />
                    }
                    label={item?.name}
                  />
                  <Hidden xsDown>
                    <div className={classes.innerContainer}>
                      {/* <Typography className={classes.optionTitle}>
                      {item?.name}
                    </Typography> */}
                      <Typography
                        className={classes.optionDescription}
                        dangerouslySetInnerHTML={{
                          __html: item?.description || "",
                        }}
                      ></Typography>
                    </div>
                  </Hidden>
                </div>

                <Typography
                  className={classes.price}
                >{`₹ ${Utils.CommonFunctions.decimalFlat(
                  item.price
                )}`}</Typography>
              </div>
              <Hidden smUp>
                <div className={classes.innerContainer}>
                  <Typography className={classes.optionDescription}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Typography>
                  {/* <Typography
                  className={classes.optionDescription}
                  dangerouslySetInnerHTML={{
                    __html: item?.description || "",
                  }}
                ></Typography> */}
                </div>
              </Hidden>

              {data.length - 1 === index && (
                <Divider light className={classes.divider} />
              )}
            </div>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <ClubMemberBenefit memberShip={memberShip} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ChoosePlan;
