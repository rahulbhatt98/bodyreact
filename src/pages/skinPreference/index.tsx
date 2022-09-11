import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Hidden,
} from "@material-ui/core";
import CustomButton from "../../components/common/button";
import Utils from "../../utils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../models";
// import { getHomeData } from "../home/actions";
import { getUserProfile, updateUserInfo } from "../account/profile/action";
import { hideLoader } from "../home/actions";
import { screenViewed, updateProfile } from "../../utils/event/action";
import events from "../../utils/event/constant";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.6
      )}px Work Sans`,
      lineHeight: "42px",
      [theme.breakpoints.down("xs")]: {
        fontWeight: 600,
        fontSize: "29px",
        padding: theme.spacing(1, 0),
      },
    },
    outerRoot: {
      margin: theme.spacing(1, 0),
      height: "auto",
      [theme.breakpoints.down("xs")]: {
        height: "auto",
        padding: "15px",
      },
    },
    title: {
      font: `normal 500 ${theme.spacing(1.8)}px  Work Sans SemiBold`,
      lineHeight: "30px",
      letterSpacing: "-0.33px",
      color: " rgba(51, 51, 51, 0.99)",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.6)}px  Recoleta Alt Bold`,
        letterSpacing: "0.04em",
        lineHeight: "26px",
      },
    },
    subTitle: {
      font: `normal 500 ${theme.spacing(1.4)}px  Work Sans`,
      lineHeight: "22.4px",
      letterSpacing: "-0.33px",
      color: " rgba(102, 102, 102, 0.99)",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(1.4)}px  Work Sans Regular`,
        lineHeight: "23px",
        letterSpacing: "0.01em",
      }
    },
    skinType: {
      font: `normal 500 ${theme.spacing(1.5)}px  Work Sans`,
      letterSpacing: "-0.33px",
      color: "var(--secondary-black)",
      marginTop: "11px",
      textAlign: "center",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(1.3)}px  Work Sans Medium`,

      }
    },
    skinType2: {
      font: `normal 600 ${theme.spacing(1.5)}px  Work Sans`,
      letterSpacing: "-0.33px",
      color: "var(--main-opacity)",
      marginTop: "11px",
      textAlign: "center",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(1.3)}px  Work Sans Medium`,

      }
    },

    innerContainer: {
      display: "flex",
      // justifyContent: "space-between",
      flexWrap: "wrap",
    },
    imgDiv: {
      cursor: "pointer",
    },
    img: {
      width: "90px",
      height: "90px",
      objectFit: "cover",
      borderRadius: "50%",
    },
    border: {
      // width: "90px",
      // height: "90px",
      // objectFit: "cover",
      // borderRadius: "50%",
      border: "4px solid var(--main-opacity)",
    },
    innerDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "125px",
      margin: "20px 0px",
      marginRight: "20px",

      [theme.breakpoints.down("xs")]: {
        marginRight: "0px",
        justifyContent: "flex-start",
        // width: theme.spacing(11),
      },
      [theme.breakpoints.down(400)]: {
        marginRight: "0px",
        width: theme.spacing(11),
      },

      [theme.breakpoints.down(370)]: {
        marginRight: "0px",
        width: theme.spacing(10.7),
      },
    },
    btnWidth: {
      "& .MuiButton-fullWidth": {
        width: "25%",
        [theme.breakpoints.down("xs")]: {
          width: "90%",
          margin: "20px",
          position: "fixed",
          bottom: "0px",
        },
      },
    },
    noImgBackground: {
      backgroundColor: "#F8F3E9",
      padding: "10px",
    },
    error: {
      color: "#f44336",
      fontSize: "12px",
      fontFamily: "Work Sans",
      fontWeight: 400,
      lineHeight: 1.66,
    },

    animated: {
      overflow: "hidden",
      width: "5rem",
      whiteSpace: "nowrap",
      "& *": {
        display: "inline-block",
        position: "relative",
        animation: `4s linear  $move`,
      },
      "& *.min": {
        minWidth: "100%",
      },
    },

    "@keyframes move ": {
      " 0%": {
        transform: "translateX(0%)",
        right: "0%",
      },

      "100%": {
        transform: "translateX(-100%)",
        right: "100%",
      },
    },
  })
);
function SkinPreference() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const homeData = useSelector(
    (state: ReducersModal) => state.homeReducer.homeData
  );
  const userSkinType =
    useSelector(
      (state: ReducersModal) => state.userDetailReducer.userInfo?.skinType
    ) || [];
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
  const [selectedSkinType, setSelectedSkinType] = useState<any>(
    userSkinType || []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const skinType = homeData?.find(
    (data: any) => data?.block_key === "skin_type"
  );

  useEffect(() => {
    setSelectedSkinType(userSkinType || []);
    screenViewed({
      ScreenName: events.SCREEN_SKIN_PREFERENCE,
      CTGenerated: "WEB",
    });
  }, [userSkinType]);

  const setSelectedData = (item: any) => {
    setErrorMessage("");

    // code for multiple selection
    // const data = selectedSkinType;
    // const selectedItem = data.find((element: any) => element.id === item.id)
    // if (!selectedItem) {
    //   data.push({ id: item.id, name: item.title });
    //   setSelectedSkinType([...data])
    // } else {
    //   const filteredData = data.filter((element: any) => element.id !== item.id)
    //   setSelectedSkinType([...filteredData])
    // }
    // code for single selection
    const data = selectedSkinType;
    const selectedItem = data.find((element: any) => element.id === item.id);
    if (!selectedItem && data.length == 0) {
      data.push({ id: item.id, name: item.title });
      setSelectedSkinType([...data]);
    } else if (!selectedItem && data.length == 1) {
      data.splice(0, 1, { id: item.id, name: item.title });
      setSelectedSkinType([...data]);
    } else {
      const filteredData = data.filter(
        (element: any) => element.id !== item.id
      );
      setSelectedSkinType([...filteredData]);
    }
  };

  const checkIfSelected = (id: string | number) => {
    const selectedItem = selectedSkinType.find(
      (element: any) => element.id === id
    );
    return selectedItem ? true : false;
  };

  const onSubmit = () => {
    // if (selectedSkinType.length === 0)
    //   setErrorMessage("Please select atleast one skin type")
    // else
    dispatch(
      updateUserInfo({ skinType: selectedSkinType }, () => {
        updateProfile("Skin_Type", selectedSkinType[0].name);
        dispatch(hideLoader());
        dispatch(getUserProfile());
        dispatch({
          type: "show-alert",
          payload: {
            type: "success",
            message: "Skin Type updated Successfully!!",
          },
        });
      })
    );
  };

  return (
    <>
      <Hidden xsDown>
        <Typography variant="h2" color="primary" className={classes.heading}>
          My Skin Preferences
        </Typography>
      </Hidden>
      {/* {selected} */}
      <div className={classes.outerRoot}>
        <Typography variant="h5" className={classes.title}>
          What is your skin type?
        </Typography>
        <Typography variant="body1" className={classes.subTitle}>
          This information will help us to show you relevant content that suits
          you the best.
        </Typography>

        <div className={classes.innerContainer}>
          {skinType?.content &&
            Array.isArray(skinType.content) &&
            skinType.content.map((item: any) => (
              <div className={classes.innerDiv} key={item.id}>
                <div
                  className={classes.imgDiv}
                  onClick={() => setSelectedData(item)}
                >
                  <img
                    src={
                      item?.img_path
                        ? `${IMAGE_URL}${item.img_path}`
                        : Utils.images.PRODUCT_PLACEHOLDER
                    }
                    alt="product"
                    className={
                      item?.img_path
                        ? clsx(
                            classes.img,
                            checkIfSelected(item?.id || "")
                              ? classes.border
                              : ""
                          )
                        : clsx(
                            classes.img,
                            classes.noImgBackground,
                            checkIfSelected(item?.id || "")
                              ? classes.border
                              : ""
                          )
                    }
                  />
                </div>
                <Hidden xsDown>
                  <Typography
                    variant="body2"
                    align="center"
                    className={clsx(
                      // item.id === 1 || item.id === 6
                      checkIfSelected(item?.id || "")
                        ? classes.skinType2
                        : classes.skinType
                    )}
                  >
                    {item.title}
                  </Typography>
                </Hidden>
                <Hidden smUp>
                  {item?.title?.length <= 15 ? (
                    <Typography
                      variant="body2"
                      align="center"
                      className={clsx(
                        // item.id === 1 || item.id === 6
                        checkIfSelected(item?.id || "")
                          ? classes.skinType2
                          : classes.skinType
                      )}
                    >
                      {item.title}
                    </Typography>
                  ) : (
                    <div className={classes.animated}>
                      <Typography
                        className={clsx(
                          // item.id === 1 || item.id === 6
                          checkIfSelected(item?.id || "")
                            ? classes.skinType2
                            : classes.skinType
                        )}
                      >
                        {item.title}
                      </Typography>
                    </div>
                  )}
                </Hidden>
              </div>
            ))}
        </div>
      </div>
      {errorMessage && (
        <Typography className={classes.error}>{errorMessage}</Typography>
      )}
      <Hidden xsDown>
        <div className={classes.btnWidth}>
          <CustomButton
            type="submit"
            fullWidth
            text="Save"
            variant="contained"
            onClick={onSubmit}
          />
        </div>
      </Hidden>
      <Hidden smUp>
        <div className={classes.btnWidth}>
          <CustomButton
            type="submit"
            fullWidth
            text="Save"
            variant="contained"
            onClick={onSubmit}
          />
        </div>
      </Hidden>
    </>
  );
}

export default SkinPreference;
