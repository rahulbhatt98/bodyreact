import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
  Card,
  Grid,
  Icon,
  Hidden,
} from "@material-ui/core";
import { ReducersModal } from "../../models";
import { useSelector } from "react-redux";
import { useState } from "react";
import _ from "lodash";
// ** icons and images **
import Utils from "../../utils";
import StoreDetail from "./storeDetail";
import Skeleton from "@mui/material/Skeleton";
import Loader from "../../components/loader";
import Pagination from "../../components/common/pagination/pagination";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchListDiv: {
      padding: theme.spacing(4, 3),
      backgroundColor: "var(--white)",
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1.5),
      },
    },
    heading: {
      color: "var(--black)",
      fontFamily: "Recoleta Alt",
      fontSize: 18,
      fontWeight: 700,
      lineHeight: "25px",
      // [theme.breakpoints.down("xs")]: {
      //   fontSize: 22,
      // },
      margin: theme.spacing(1),
      "& span": {
        color: "var(--light-gray)",
        fontWeight: 500,
        fontFamily: "Work Sans",
      },
    },

    cardBox: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      border: "1px solid var(--border-color)",
      boxSizing: "border-box",
      borderRadius: "4px",
      padding: theme.spacing(1.4),
      height: 368,
      [theme.breakpoints.down("xs")]: {
        border: "none",
        boxShadow: "none",
        padding: "0",
        height: "auto",
      },
    },
    subCardBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        columnGap: "10px",
        alignItems: "stretch",
      },
    },

    subCardText: {
      fontFamily: "Work Sans",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "19px",
      color: "var(----secondary-black)",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.2)}px Work Sans Medium`,
      },
    },
    subCardPara: {
      fontFamily: theme.typography.body1.fontFamily,
      color: "var(--secondary-black)",
      // padding: theme.spacing(0, 1),
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: 16,
      marginTop: theme.spacing(0.5),
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.4)}px Work Sans SemiBold`,
        color: "var(--black)",
        lineHeight: "25px",
        margin: theme.spacing(0, 0),
      },
    },
    subCardImg: {
      // padding: theme.spacing(1, 1, 0.8, 0),
      width: 80,
      height: 80,
      borderRadius: 4,
      objectFit: "cover",
      [theme.breakpoints.down("xs")]: {
        width: 100,
        height: "auto",
      },
    },
    outerText: {
      fontSize: "12px",
      fontWeight: "bold",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.2)}px Work Sans Regular`,
      },
    },
    text: {
      color: "var(--stepper-color)",
      fontSize: "12px",
      fontWeight: 700,
    },
    subCardInfo: {
      display: "flex",
      padding: "10px 0",
      flexDirection: "row",
      alignItems: "center",
      "& .MuiIcon-root": {
        overflow: "unset",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "5px 0",
      },
    },
    btnWrapper: {
      display: "flex",
      justifyContent: "space-between",
      "& .MuiButton-label": {
        fontFamily: "Work Sans",
        fontWeight: 600,
        fontSize: 14,
        textTransform: "capitalize",
        letterSpacing: "0.04em",
      },
      "& .MuiButton-root": {
        fontFamily: "Work Sans",
        fontWeight: 600,
        fontSize: 14,
        padding: theme.spacing(1.5, 1),
        lineHeight: "16px",
        // minWidth: '134px',

        marginTop: 10,
        "& a": {
          color: theme.palette.primary.main,
        },
        [theme.breakpoints.down("md")]: {
          padding: "3%",
        },
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        fontSize: 12,
      },
      [theme.breakpoints.down("xs")]: {
        justifyContent: "end",
        // marginTop: "-35px",
        flexDirection: "row",
        padding: theme.spacing(0.2),
      },
    },
    outerBTn: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px",
      border: "1px solid var(--primary)",
    },
    subCardMobileDiv: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    addressTitle: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.2
      )}px Work Sans`,
      color: "var(--light-gray)",
      lineHeight: "25px",
      margin: theme.spacing(0, 1),
      [theme.breakpoints.down("xs")]: {
        margin: 0,
        lineHeight: "20px",
        fontWeight: 500,
        font: `normal ${theme.spacing(1.2)}px Work Sans Regular`,
        letterSpacing: "0.02em",
      },
    },
    phoneTitle: {
      fontSize: "12px",
      fontWeight: 700,
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.2)}px Work Sans Medium`,
      },
    },
    loader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    btnDivContainer:{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "end",
    }
  })
);

function SearchList({
  handleChange,
  handleTabChange,
  handleProdID,
  device,
}: any) {
  const classes = useStyles();

  const { AllData, data, totalCount, showStoreDetail } = useSelector(
    (state: ReducersModal) => state.storeReducer
  );

  const listData = device === "mob" ? data : AllData && AllData.data;

  const [storeDetail, setStoreDetail] = useState(showStoreDetail);
  const [productId, setProductId] = useState("");

  const handleClick = (id: any) => {
    setStoreDetail(true);
    setProductId(id);
    handleTabChange(1);
    handleProdID(id);
  };
  const handleGetDirection = (data: any) => {
    if (data && data?.coordinates?.length) {
      const startingPoint = localStorage.getItem("currentLng")
        ? `${localStorage.getItem("currentLat")},${localStorage.getItem(
            "currentLng"
          )}`
        : "";
      const longitude = data.coordinates[0];
      const latitude = data.coordinates[1];
      const destinationPoint = `${latitude},${longitude}` || "";
      window.open(
        `https://www.google.com/maps/dir/${startingPoint}/${destinationPoint}`
      );
    }
  };

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  return (
    <>
      {storeDetail ? (
        <>
          <StoreDetail
            setStoreDetail={setStoreDetail}
            productId={productId}
            getDetails={true}
            mapZoom={14}
          />
        </>
      ) : (
        <div className={classes.searchListDiv}>
          <Hidden xsDown>
            <Typography variant="h3" className={classes.heading}>
              The Body Shop Stores <span>{`(${totalCount} results)`}</span>
            </Typography>
          </Hidden>
          <Grid container spacing={3}>
            {listData &&
              listData.map((value: any, i: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  {skeletonLoader ? (
                    <Skeleton variant="rectangular" height={300} />
                  ) : (
                    <Card className={classes.cardBox}>
                      {skeletonLoader ? (
                        <Skeleton variant="rectangular" height={50} />
                      ) : (
                        <>
                          <Hidden xsDown>
                            <div className={classes.subCardBox}>
                              <img
                                src={value.image[0]}
                                alt="google"
                                className={classes.subCardImg}
                              />

                              <Typography
                                variant="h3"
                                component="span"
                                align="right"
                                className={classes.subCardText}
                              >
                                {value.distance}
                              </Typography>
                              {/* <h2>{person.name}</h2> */}
                            </div>

                            <Typography
                              variant="h4"
                              color="textSecondary"
                              component="p"
                              className={classes.subCardPara}
                            >
                              {value.name}
                            </Typography>
                            {/* <p>{person.email}</p> */}
                            <div className={classes.subCardInfo}>
                              <Icon>
                                <img src={Utils.images.PHONE} alt="phone" />
                              </Icon>

                              <Typography variant="body1">
                                <a href={`tel:${value.contactNo.join(", ")}`}>
                                  {value.contactNo.join(", ")}
                                </a>
                              </Typography>
                            </div>
                            <div className={classes.subCardInfo}>
                              <Icon>
                                <img
                                  src={Utils.images.LOCATION_ICON}
                                  alt="location"
                                />
                              </Icon>

                              <Typography variant="body1">
                                {_.truncate(
                                  `${value.location.address}, ${value.location.street}, ${value.location.city}, ${value.location.state}, ${value.location.country}, ${value.location.pincode}`,
                                  { length: 70 }
                                )}
                              </Typography>
                            </div>
                            <Typography variant="body1">
                              {value.todayHours
                                ? `Open today : ${value.todayHours}`
                                : `Closed`}
                            </Typography>
                            <div className={classes.btnWrapper}>
                              {/* <Button variant="outlined" color="primary" >
                        <Link to={`/store/${btoa(value.magentoId)}`} >
                          Information
                        </Link>
                      </Button> */}
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={() =>
                                  handleClick(btoa(value.magentoId))
                                }
                              >
                                {/* <Link to={`/store/${btoa(value.magentoId)}`} > */}
                                Information
                                {/* </Link> */}
                              </Button>

                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  // handleClick(btoa(value.magentoId))
                                  handleGetDirection(value?.location)
                                }
                              >
                                Get Directions
                              </Button>
                            </div>
                          </Hidden>
                          <Hidden smUp>
                            <div className={classes.subCardBox}>
                              <img
                                src={value.image[0]}
                                alt="google"
                                className={classes.subCardImg}
                              />
                              <div className={classes.subCardMobileDiv}>
                                <Typography
                                  variant="h4"
                                  color="textSecondary"
                                  component="p"
                                  className={classes.subCardPara}
                                >
                                  {value.name}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.addressTitle}
                                >
                                  {_.truncate(
                                    `${value.location.address}, ${value.location.street}, ${value.location.city}, ${value.location.state}, ${value.location.country}, ${value.location.pincode}`,
                                    { length: 70 }
                                  )}
                                </Typography>
                                <div className={classes.subCardInfo}>
                                  <Icon>
                                    <img
                                      src={Utils.images.LOCATION_ICON}
                                      alt="location"
                                    />
                                  </Icon>

                                  <Typography
                                    variant="h3"
                                    component="span"
                                    align="right"
                                    className={classes.subCardText}
                                  >
                                    {value.distance}
                                  </Typography>
                                </div>
                                <div className={classes.btnDivContainer}>
                                  <div>
                                    <div className={classes.subCardInfo}>
                                      <Icon>
                                        <img
                                          src={Utils.images.PHONE}
                                          alt="phone"
                                        />
                                      </Icon>

                                      <Typography
                                        variant="body1"
                                        className={classes.phoneTitle}
                                      >
                                        <a
                                          href={`tel:${value.contactNo.join(
                                            ", "
                                          )}`}
                                        >
                                          {value.contactNo.join(", ")}
                                        </a>
                                      </Typography>
                                    </div>

                                    {value.todayHours ? (
                                      <Typography
                                        variant="body1"
                                        className={classes.outerText}
                                      >
                                        <span className={classes.text}>
                                          {" "}
                                          Open today :
                                        </span>{" "}
                                        {value.todayHours}
                                      </Typography>
                                    ) : (
                                      <span>Closed</span>
                                    )}
                                  </div>

                                  <div className={classes.btnWrapper}>
                                    <div className={classes.outerBTn}>
                                      <img
                                        src={Utils.images.GREEN_ARROW}
                                        alt="arrow"
                                        onClick={() =>
                                          handleClick(btoa(value.magentoId))
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Hidden>
                        </>
                      )}
                    </Card>
                  )}
                </Grid>
              ))}
            <Loader />
            {device !== "mob" && AllData?.page && (
              <Pagination data={AllData} handleChange={handleChange} />
            )}
            {/* {totalCount !== data?.length ? (
              <div className={classes.loader}>
                <CircularProgress color="primary" />
              </div>
            ) : null} */}
          </Grid>
        </div>
      )}
    </>
  );
}

export default SearchList;
