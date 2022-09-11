import { makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { isTemplateExpression } from "typescript";
import CustomButton from "../../components/common/button";
import { ReducersModal } from "../../models";
import Utils from "../../utils";
import { getRewardRate } from "./action";
import clsx from "clsx";
import { isAuthenticated } from "../../utils/session";
import { useHistory } from "react-router-dom";
import { showLoader, hideLoader } from "../home/actions";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#FFFFFF",
    offset: "0px 5px",
    boxShadow: "-1px 5px 5px 3px #f2f1f1",
    border: "1px solid #FFFFFF",
    borderRadius: "2px",
    margin: "10px 0px 10px 0px",
    padding: "10px",
  },
  divider: {
    margin: theme.spacing(3.5, 0),


  },
  imgBackground: {
    padding: theme.spacing(0.5),
    background:
      "url(/assets/images/gifts/search_background.svg) top left no-repeat",
    alignItems: "center",
    borderRadius: "5px",
    backgroundSize: "cover",
    backgroundColor: "#044236",
    width: "45px",
    height: "45px",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  textContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "10px",
  },
  leftContent: {
    display: "flex",
  },
  points: {
    font: `normal 700 ${theme.spacing(1.6)}px Work Sans`,
    lineHeight: "18.7px",
    color: "#333333",
  },
  label: {
    font: `normal 500 ${theme.spacing(1.2)}px Work Sans`,
    lineHeight: "24px",
    color: "#666666",
  },
  btn: {
    borderRadius: "4px",
    width: "125px",
    height: "40px",
    // padding:"10px 10px",
    marginTop: "0px !important",
    font: `normal 500 ${theme.spacing(1.5)}px Work Sans !important`,
    lineHeight: "16.42px !important",
  },
  title: {
    font: `normal 700 ${theme.spacing(1.6)}px Recoleta Alt `,
    lineHeight: "21.7px",
    color: "#333333",
    letterSpacing: "0.5px",
    paddingTop: "15px",
    [theme.breakpoints.down("xs")]: {
      font: `normal ${theme.spacing(1.6)}px Recoleta Alt Bold`,

    }
  },
  link: {
    // font: `normal 500 ${theme.spacing(
    //     1.3
    // )}px  Work Sans`,
    // lineHeight: "21.7px",
    // color: "#333333",
    // letterSpacing: "0.5px"
    color: "#044236",
    font: `normal 500 ${theme.spacing(1.3)}px Work Sans`,
    lineHeight: "16px",
    cursor: "pointer",
  },
  description: {
    font: `normal 500 ${theme.spacing(1.3)}px Work Sans Medium`,
    lineHeight: "15.25px",
    color: "#333333",
    letterSpacing: "2%",
    // display: "flex",
    // alignItems: "center",
    marginTop: "5px",
    [theme.breakpoints.down("xs")]: {
      font: `normal ${theme.spacing(1.2)}px Work Sans Regular`,

    }
  },
  pointValue: {
    color: "#3D857E",
    margin: "0px 5px",
  },
  content: {
    padding: "10px 0px",
    // background:"rgba(35, 30, 30, 0.06)"
  },
  bold: {
    font: `normal 600 ${theme.spacing(1.3)}px Work Sans SemiBold`,
    // margin: "0px 5px 0px 0px"
  },
  bottom: {
    marginBottom: "20px",
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2, 0)
    }
  },
  linkContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

interface Props {
  details: any;
}
interface tierData {
  tier: number;
  points: number;
}
const Rewards: React.FC<any> = ({ details }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [rewardData, setRewardData] = useState<any>({});
  const userInfoTierType: any = useSelector(
    (state: ReducersModal) => state.userDetailReducer.userInfo?.tierType
  );
  const [currentTierType, setCurrentTierType] = useState(userInfoTierType || 0);

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(showLoader());
      dispatch(
        getRewardRate((response: any) => {
          if (response) {
            dispatch(hideLoader());
            setRewardData(response || {});
          }
        })
      );
    }
  }, []);

  useEffect(() => {
    setCurrentTierType(userInfoTierType);
  }, [userInfoTierType]);

  const getCurrentTierPoints = (tierType: number) => {
    const tierInfo = details
      ? details?.find((item: tierData) => item?.tier == tierType)
      : {};
    const point = tierInfo && tierInfo?.points ? tierInfo.points : 0;
    return point;
  };

  const redirect = (type: number) => {
    history.push({
      pathname: Utils.routes.UPGRADE_MEMBERSHIP,
      state: { type },
    });
  };

  return (
    <>
      <div
        className={clsx(
          classes.linkContainer,
          !isAuthenticated() ? classes.bottom : ""
        )}
      >
        <Typography className={classes.title}>Earn Reward Points</Typography>
        {!isAuthenticated() ? (
          <Typography
            className={classes.link}
            onClick={() => history.push(Utils.routes.LOGIN_OTP)}
          >
            Login To Know More
          </Typography>
        ) : null}
      </div>
      {isAuthenticated() ? (
        <>
          <Typography className={classes.description}>
            {`You will receive`}
            <span className={classes.pointValue}>
              {getCurrentTierPoints(currentTierType)}
            </span>
            <span className={classes.bold}>{`reward points`}</span>
            {` after the delivery.`}
          </Typography>
          {currentTierType !== 1 ? (
            <>
              <div className={classes.content}>
                {currentTierType === 3 ? (
                  <div className={classes.container}>
                    <div className={classes.leftContent}>
                      <div className={classes.imgBackground}>
                        <img
                          className={classes.img}
                          alt="logo"
                          src={Utils.images.LYBC_FIVE}
                        />
                      </div>
                      <div className={classes.textContent}>
                        <Typography className={classes.points}>
                          {getCurrentTierPoints(2)}
                        </Typography>
                        <Typography className={classes.label}>
                          Loyalty Points
                        </Typography>
                      </div>
                    </div>
                    <CustomButton
                      className={classes.btn}
                      type="button"
                      text={"Join Club"}
                      fullWidth={false}
                      variant="contained"
                      onClick={() => redirect(2)}
                    />
                  </div>
                ) : null}
                {currentTierType === 3 || currentTierType === 2 ? (
                  <div className={classes.container}>
                    <div className={classes.leftContent}>
                      <div className={classes.imgBackground}>
                        <img
                          className={classes.img}
                          src={Utils.images.LYBC_FIVE}
                          alt="five"
                        />
                      </div>
                      <div className={classes.textContent}>
                        <Typography className={classes.points}>
                          {getCurrentTierPoints(1)}
                        </Typography>
                        <Typography className={classes.label}>
                          Loyalty Points
                        </Typography>
                      </div>
                    </div>
                    <CustomButton
                      className={classes.btn}
                      type="button"
                      text={"Join Platinum"}
                      fullWidth={false}
                      variant="contained"
                      onClick={() => redirect(1)}
                    />
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
          <Typography className={clsx(classes.description, classes.bottom)}>
            <span className={classes.bold}>{`${rewardData?.PointRate ? 1 / Number(rewardData.PointRate) : 0
              } points = ₹ 1`}</span>
            {currentTierType === 3
              ? `, Become a Member and save more.`
              : ""}
          </Typography>
        </>
      ) : null}
    </>
  );
};
export default Rewards;
