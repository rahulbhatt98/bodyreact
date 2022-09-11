import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReducersModal } from "../../../models";
import Utils from "../../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileContainer: {
      display: "flex",
      // justifyContent: "space-between",
      padding: "20px",
      background: "#044236",
      marginTop: "4px",
    },
    nameEmailContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      marginLeft: "15px",
    },
    nameEditContent: {
      display: "flex",
      alignItems: "baseline",
    },
    img: {
      height: "80px",
      width: "80px",
      borderRadius: "50%",
      // background: "lightgrey",
      objectFit: "cover",
      marginRight: "5px",
    },
    noImage: {
      // background: "lightgrey",
      // border: "1px solid lightgrey",
      width: "80px",
      height: "80px",
      display: "flex",
      justifyContent: "center",
      borderRadius: "50%",
      background: "#D6CD56",
      alignItems: "center",
      objectFit: "scale-down",
      padding: "17px",
      marginRight: "5px",
    },
    name: {
      font: "normal 18px Druk Bold",
      color: "#FFFFFF",
      lineHeight: "18.4px",
      letterSpacing: "01.5px",
      textTransform: "capitalize",
      paddingTop:"2px"

    },
    email: {
      font: "normal 13px Work Sans Medium",
      color: "#FFFFFF",
      lineHeight: "15.25px",
      paddingBottom:"2px",
      letterSpacing: "0.03em",
    },
    editIcon: {
      marginLeft: "15px",
    },
  })
);

const MobileMyAccountHeader = () => {
  const classes = useStyles();
  const history = useHistory();
  const userInfo = useSelector(
    (state: ReducersModal) => state.userDetailReducer.userInfo
  );
  const img = userInfo?.profilePicture
    ? userInfo?.profilePicture
    : Utils.images.PROFILE_IMAGE_OUTLINE;

  return (
    <div className={classes.profileContainer}>
      <img
        className={userInfo?.profilePicture ? classes.img : classes.noImage}
        src={img}
        alt="icon"
        onClick={() =>
          history.push({
            pathname: "/my-profile",
            state: { pageName: "My Account" },
          })
        }
      />
      <div className={classes.nameEmailContent}>
        <div className={classes.nameEditContent}>
          <Typography variant="body1" className={classes.name}>
            {userInfo?.fullName
              ? userInfo.fullName
              : localStorage.getItem("fullName")}
          </Typography>
          <img
            className={classes.editIcon}
            src={Utils.images.EDIT_ICON_YELLOW}
            onClick={() =>
              history.push({
                pathname: Utils.routes.MOBILE_EDIT_PROFILE,
                state: { pageName: "Edit Profile" },
              })
            }
          />
        </div>
        <Typography variant="body1" className={classes.email}>
          {userInfo?.email ? userInfo.email : localStorage.getItem("email")}
        </Typography>
      </div>
    </div>
  );
};
export default MobileMyAccountHeader;
