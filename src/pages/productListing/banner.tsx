import {
  makeStyles,
  createStyles,
  Theme,
  Collapse,
  Button,
  Hidden,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import Utils from "../../utils";
import BreadCrumb from "../../components/breadCrumb";
import _ from "lodash";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { debug } from "util";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bannerRoot: {
      // background: `linear-gradient(rgba(51, 51, 51, 0.1), rgba(51, 51, 51, 0.1)), url(${Utils.images.PLPIMG}) center center  no-repeat`,
      // backgroundSize: "cover !important",
      maxWidth: "100%",
      height: "auto",
      display: "flex",
      backgroundColor: "var(--gray)",
      // backdropFilter: "blur(2px)",
      flexDirection: "row",
      [theme.breakpoints.down("sm")]: {
        // height: "400px",
        // marginBottom: "20%",
      },
      [theme.breakpoints.down("xs")]: {
        // height: "auto",
        background: "var(--primary)",
        marginTop: theme.spacing(1.5),
      },
    },
    routeName: {
      padding: theme.spacing(2, 0, 0, 1.5),
      font: `normal ${theme.spacing(1.3)}px Work Sans`,
      fontWeight: 600,
      lineHeight: "15px",
      zIndex: 1,
      position: "absolute",
      color: "#FFFFFF",
    },
    findContainer: {
      // position: "relative",
      display: "flex",
      height: "500px",
      flexDirection: "column",
      // alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F8F3E9",
      flexBasis: "50%",
      [theme.breakpoints.down("xs")]: {
        height: "220px",
        backgroundColor: "var(--primary)",
        justifyContent: "flex-start",
        flexBasis: "60%",
        padding: theme.spacing(2),
      },
    },
    innerFindContainer: {
      textAlign: "center",
      overflow: "hidden",
      color: theme.palette.primary.main,
      // padding: theme.spacing(2),
      padding: "4rem 4rem 4rem 0",
      "& p": {
        font: `normal  ${theme.spacing(1.6)}px Work Sans Regular`,
        maxWidth: "none",
        textAlign: "left ",
        lineHeight: "19px",
        margin: theme.spacing(1.5, 5),
        [theme.breakpoints.down("sm")]: {
          fontSize: theme.spacing(1.4),
        },
        [theme.breakpoints.down("xs")]: {
          fontSize: "12px",
          textAlign: "left",
          margin: theme.spacing(0, 0.5),
          lineHeight: "20px",
        },
      },
      "& h2": {
        font: `normal ${theme.spacing(
          4
        )}px Recoleta Medium`,
        textAlign: "center",
        lineHeight: "70px",
        textTransform: "none",
        marginTop: "5px",
        [theme.breakpoints.down("xs")]: {
          fontSize: theme.spacing(2),
          textAlign: "left",
          marginTop: 0
        },
      },
      "& h1": {
        textAlign: "center",
        letterSpacing: "0.04em",
        textTransform: "none",
        font: `normal ${theme.spacing(
          4
        )}px Recoleta Bold`,
        marginTop: "5px",
        [theme.breakpoints.down("sm")]: {
          fontSize: theme.spacing(1.7),
          marginTop: 0
        },
        [theme.breakpoints.down("xs")]: {
          fontSize: theme.spacing(2),
          textAlign: "left",
        },
      },
      [theme.breakpoints.down("xs")]: {
        // height: "130px",
        color: "var(--white)",
        padding: theme.spacing(0),
        marginBottom: "19px",
      },
    },
    imageContainer: {
      display: "flex",
      height: "500px",
      justifyContent: "center",
      flexBasis: "50%",
      [theme.breakpoints.down("xs")]: {
        height: "220px",
        justifyContent: "flex-start",
        flexBasis: "40%",
      },
    },
    readMoreBtn: {
      // position: "absolute",
      // bottom: 10,
      width: "45%",
      borderRadius: "4px",
      padding: theme.spacing(0.5),
      "& .MuiButton-label": {
        fontSize: 12,
        fontFamily: "Work Sans",
        textTransform: "capitalize",
      },
      [theme.breakpoints.down(350)]: {
        // margin: theme.spacing(0, 1.5),
        fontSize: "11px",
        width: "50%",
      },
    },
    expandBannerRoot: {
      height: "auto",
      marginBottom: 0,
    },
    imageContainer2: {
      position: "absolute",
      maxWidth: "none",
      maxHeight: "500px",
      width: "50%",
      height: "auto",
      display: "block",

      // margin: theme.spacing(3, 0, 0, 1.5),
      "& img": {
        height: "500px",
        width: "100%",
        // borderRadius: "8px",
      },
      [theme.breakpoints.down("xs")]: {
        maxWidth: "150px",
        maxHeight: "160px",
        margin: theme.spacing(3, 0, 0, 1.5),
        width: "auto",
        "& img": {
          height: "145px",
          width: "160px",
          borderRadius: "8px",
        },
      },
    },
    backgroundImage: {
      display: "flex",
      alignItems: "end",
      justifyContent: "end",
      marginBottom: "30px",
      "& img": {
        height: "130px",
      },
    },
    readLessbtn: {
      // position: "absolute",
      // bottom: 10,
      borderRadius: "4px",
      padding: theme.spacing(0, 0.5),
      "& .MuiButton-label": {
        fontSize: 12,
      },
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 1.5),
        fontSize: "11px",
        // bottom: 90,
      },
    },
    readBtnOuterDiv: {
      textAlign: "center",
    },
  })
);

function Banner() {
  const classes = useStyles();
  const [collapse, setCollapse] = useState(false);
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
  const location: any = useLocation()

  const productData = useSelector(
    (state: ReducersModal) => state.productReducer?.data
  );
  const { menuData } = useSelector(
    (state: ReducersModal) => state.homeReducer
  );
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setCollapse(false);
  }, []);

  const categoryData = productData?.categoryData || {};
  const category = menuData.find((item: any) => item.id == location?.state?.categoryId)

  let breadCrumb: any = [
    { title: "Home", action: "/" },

  ]
  if (category) {
    breadCrumb.push({
      title: category?.title,
      action: (category?.is_root == 1) ? `/${category?.url}/h/${category?.google_category}/${category?.id}` : `/${category?.url}/c/${category?.google_category}/${category?.id}`
    })
  }

  breadCrumb.push({
    title: categoryData.name,
    // action: `/product-listing?categoryId=${categoryData.id}`,
    action: {
      pathname: Utils.CommonFunctions.seoUrl(
        categoryData,
        "plp"
      ),
    },
  })

  return (
    <>
      {skeletonLoader || Object.keys(productData).length === 0 ? (
        <Skeleton variant="rectangular" height={500} />
      ) : (
        <>
          {_.has(categoryData, "id") ? (
            <>
              {(categoryData.description || categoryData.image) && (
                <Hidden xsDown>
                  <div
                    key={categoryData.id}
                    className={clsx({
                      [classes.bannerRoot]: true,
                    })}
                  >
                    <div className={classes.routeName}>
                      {skeletonLoader ? (
                        <Skeleton variant="rectangular" />
                      ) : (
                        <BreadCrumb
                          breadcrumb={breadCrumb}
                        />
                      )}
                    </div>
                    <div className={classes.findContainer}>
                      {categoryData.description ? (
                        <>
                          <div
                            className={clsx({
                              [classes.innerFindContainer]: true,
                            })}
                            dangerouslySetInnerHTML={{
                              __html: categoryData.description,
                            }}
                          ></div>
                        </>
                      ) : null}
                    </div>
                    <div className={classes.imageContainer}>
                      <div className={classes.imageContainer2}>
                        {categoryData.image ? (
                          <img
                            src={`${IMAGE_URL}catalog/category${categoryData.image}`}
                          />
                        ) : (
                          <img src={`${Utils.images.PRODUCT_PLACEHOLDER}`} />
                        )}
                      </div>
                    </div>
                  </div>
                </Hidden>
              )}

              {(categoryData.description || categoryData.image) && (
                <Hidden smUp>
                  <div
                    key={categoryData.id}
                    className={clsx({
                      [classes.bannerRoot]: true,
                    })}
                  >
                    <div
                      className={clsx({
                        [classes.findContainer]: true,
                        [classes.expandBannerRoot]: collapse,
                      })}
                    >
                      {categoryData.description ? (
                        <>
                          <div
                            className={clsx({
                              [classes.innerFindContainer]: true,
                              [classes.expandBannerRoot]: collapse,
                            })}
                            dangerouslySetInnerHTML={{
                              __html: categoryData.description,
                            }}
                          ></div>
                          <div className={classes.readBtnOuterDiv}>
                            {categoryData.description.length > 295 && (
                              <Button
                                onClick={() => setCollapse(!collapse)}
                                variant="contained"
                                // className={clsx(
                                //   collapse ? classes.readMoreBtn : classes.readLessbtn
                                // )}
                                className={clsx(classes.readMoreBtn)}
                                color="secondary"
                              >
                                {collapse ? "Read Less" : "Read More"}
                              </Button>
                            )}
                          </div>
                        </>
                      ) : null}
                    </div>
                    {categoryData.image && (
                      <div className={classes.imageContainer}>
                        <div className={classes.imageContainer2}>
                          <img
                            src={`${IMAGE_URL}catalog/category${categoryData.image}`}
                          />
                        </div>
                        <div className={classes.backgroundImage}>
                          <img
                            src={Utils.images.MOBILE_PLP}
                            alt="backgroundImage"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Hidden>
              )}
            </>
          ) : null}
        </>
      )}
    </>
  );
}

export default Banner;
