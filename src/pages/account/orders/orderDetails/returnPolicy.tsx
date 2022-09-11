import {
  Grid,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Divider,
  Hidden,
} from "@material-ui/core";
import Utils from "../../../../utils";
import { useHistory } from "react-router-dom";
import ContainedButton from "../../../../components/containedButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReturnPolicy } from "./action";
import { ReducersModal } from "../../../../models";
import Skeleton from "@mui/material/Skeleton";
import CustomButton from "../../../../components/common/button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    returnDiv: {
      // padding: theme.spacing(3, 5),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(3, 2, 0, 2)
      }
    },
    imgDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    skeleton: {
      margin: theme.spacing(1),
      width: "100%",
    },
    img: {
      objectFit: "cover",
      height: "100% ",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 0, 0, 0),
      },
    },
    noImg: {
      // width: '30px',
      // height: '30px'
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: "28px",
    },
    divider: {
      borderBottom: "6px solid #D5CE4B",
      width: "90px",
    },
    listItem: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.6
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: "19px",
      margin: theme.spacing(3, 2),
    },

    // content > li : {
    //   display: "block !important",
    //   backgroundColor: "yellow",
    // },
    content: {
      margin: theme.spacing(2, 0),
      color: "black",
      opacity: "0.7",
      "& li": {
        margin: theme.spacing(1, 0),
      },
    },
    btnProceed: {
      [theme.breakpoints.down("xs")]: {
        "&.MuiButton-root": {
          marginTop: "2px"
        }
      }
    }
    // "& li": {
    //   padding: "28px 0px 0px 0px ",
    // },
    // }
  })
);

const ReturnPolicy: React.FC = () => {
  const classes = useStyles();
  // const styleRef = useRef();
  const dispatch = useDispatch();
  const [content, setContent] = useState<any>({});
  const history = useHistory()
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      getReturnPolicy((resp: any) => {
        if (resp) {
          setContent(resp?.content || {});
        }
      })
    );
  }, []);
  console.log('content', content)
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });;
  return (
    <div className={classes.returnDiv}>
      {/* <BreadCrumb
        breadcrumb={[
          { title: "Order History", action: Utils.routes.ORDER_HISTORY },
          { title: "Order Details", action: "order-detail/" + (selectedOrder?._id || 0) },
          { title: "Return Policy", action: "#" },
        ]}
      /> */}
      <Grid container>
        <Grid item xs={12} md={6} />
        <Hidden xsDown>
          <Grid item xs={12} md={6}>
            {skeletonLoader ? (
              <Skeleton
                variant="rectangular"
                className={classes.skeleton}
                height={30}
                width={170}
              />
            ) : (
              <>
                <Typography variant="h3" className={classes.heading}>
                  {content?.title || ""}
                </Typography>
                <Divider className={classes.divider} />
              </>
            )}
          </Grid>
        </Hidden>
        <Grid item xs={12} md={5} className={classes.imgDiv}>
          {skeletonLoader ? (
            <Skeleton
              variant="rectangular"
              className={classes.skeleton}
              height={200}
            />
          ) : (
            <img
              className={content?.image ? classes.img : classes.noImg}
              src={
                content?.image
                  ? `${IMAGE_URL}${content.image}`
                  : Utils.images.RETURN_IMG
              }
              alt="discover one"
            />
          )}
        </Grid>

        <Grid item md={1} />
        <Grid item xs={12} md={6}>
          {skeletonLoader ? (
            <Skeleton
              variant="rectangular"
              className={classes.skeleton}
              height={200}
            />
          ) : (
            <div
              className={classes.content}
              dangerouslySetInnerHTML={{ __html: content?.content || "" }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} />
        <Grid item xs={12} md={6}>
          {skeletonLoader ? (
            <Skeleton
              variant="rectangular"
              className={classes.skeleton}
              height={30}
              width={120}
            />
          ) : (
            <CustomButton
              className={classes.btnProceed}
              type="submit"
              variant="outlined"
              fullWidth={true}
              onClick={() => history.push("/write-to-us")}
              text={"Write to Us"}
            // isOutline={true}
            // isGreen={true}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ReturnPolicy;
