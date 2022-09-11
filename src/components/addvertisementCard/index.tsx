import { makeStyles, createStyles, Theme, Hidden } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory} from "react-router-dom";
import { ReducersModal } from "../../models";
import { getAuthToken } from "../../utils/session";
import { getHomeData, hideSkeleton, showSkeleton } from "../../pages/home/actions";

type AppProps = {
  heading?: string;
  data?: any
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addvertisementRoot: {
      backgroundColor: theme.palette.secondary.main,
      padding: theme.spacing(0.5),
      position: "sticky",
      top: "123px",
      zIndex: 25,
      [theme.breakpoints.down(700)]:{
        top: "141px",
      }
    },
    dashedBordered: {
      // border: `1px dashed ${theme.palette.primary.light}`,
      padding: theme.spacing(0.5),
      width: "100%",
    },
    heading: {
      fontWeight: 600,
      color: theme.palette.primary.light,
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      '& p': {
        margin: theme.spacing(0, 0.2),
        [theme.breakpoints.down("sm")]: {
          fontSize: 12
        }
      }
    },
  })
);

function Addvertisement({ heading }: AppProps) {
  const classes = useStyles();
  const dispatch = useDispatch()
  // const history = useHistory()
  const { authToken, homeData } = useSelector((state: ReducersModal) => state.homeReducer)
  const advertisementData = homeData?.find((data: any) => data.block_key === "promotional_banner");

  useEffect(() => {
    if (authToken) {
      if (!advertisementData?.title) {
        dispatch(showSkeleton())
        dispatch(getHomeData(() => {
          dispatch(hideSkeleton())
        }))
      }
    }
  }, []);

  // const content = advertisementData?.content?.[0] || {}
  const content = advertisementData?.content?.map((item: any) => item.description).join("<p> | <p>")
  return (
    advertisementData?.status === "1" ?
      <>
        <Hidden xsDown>
          <div className={classes.addvertisementRoot}>
            <div className={classes.dashedBordered}>
              {/* <Typography className={classes.heading} variant="body1">
          {content?.description}
          {/* {heading && heading} */}
              {/* Free shower gel when you spend <span>&#8377;</span> 1000* code: 21082
          | Free delievery over <span>&#8377;</span> 20000* | Join our club to
          recieve exclusive rewards */}
              {/* </Typography> */}
              <div className={classes.heading} dangerouslySetInnerHTML={{ __html: content || '' }}>
              </div>
            </div>
          </div>
        </Hidden>
        {
          // pathname === "/" &&
          // <Hidden smUp>
          //   <MobilePromotional />
          // </Hidden>
        }
      </>

      : null
  );
}

export default Addvertisement;
