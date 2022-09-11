import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Grid,
  Hidden,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideSkeleton } from "../home/actions";
import { getOlderQueryList } from "./action";
import format from "date-fns/format";
import clsx from "clsx";
import { handleScrollHeight } from "../../utils/scroll";
import OrderNotFound from "../account/orders/orderNotFound";
import Loader from '../../components/loader';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    homeRoot: {
      [theme.breakpoints.down("sm")]: {
        // margin: theme.spacing(1),
      },
    },
    container: {
      border: "1px solid var(--text-color)",
      padding: theme.spacing(1),
      margin: theme.spacing(2.2, 0, 0, 0),
      [theme.breakpoints.down("xs")]: {
        border:"none",
        background: "var(--white)", 
        margin: theme.spacing(0.5, 0, 0, 0),
      }
    },
    divider:{

    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.6
      )}px Work Sans`,
      lineHeight: "42px",
      color: "var(--green-color)",
      [theme.breakpoints.down("xs")]: {
        lineHeight: "inherit",
        fontSize: "26px",
      },
      [theme.breakpoints.down(350)]: {
        fontSize: "30px",
      },
    },
    title: {
      font: `normal 400 ${theme.spacing(
        1.5
      )}px Work Sans SemiBold`,
      lineHeight: "18px",
      color: "var(--light-gray)",
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.3
        )}px Work Sans Regular`,
      }
    },
    subTitle: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans Medium`,
      lineHeight: "18px",
      color: "var(--black300)",
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.2
        )}px Work Sans SemiBold`,
      }
    },
    secondSubTitle: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans Medium`,
      lineHeight: "18px",
      color: "#0EA52F",
      margin: theme.spacing(1, 0),
      textTransform: "capitalize",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.2
        )}px Work Sans SemiBold`,
      }
    },
    thirdTitle: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans Medium`,
      lineHeight: "18px",
      color: "#0879E1",
      textTransform: "uppercase",
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.2
        )}px Work Sans SemiBold`,
      }
    },
    showText: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    hideText: {
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
      },
    },
    rootDiv:{
      [theme.breakpoints.down("xs")]:{
        background: "rgba(35, 30, 30, 0.06)",

      }
    },
    noOrder: {
      margin: theme.spacing(4, 0),
      color: "var(--secondary-black)",
    },
  })
);

const ShowQuery = () => {
  const classes = useStyles();
  const [oldQuery, setOldQuery] = useState<any>([]);
  const [isFetching, setIsFetching] = useState<any>(false);
  const [page, setPage] = useState<any>(1);
  const limit = 100;

  const dispatch = useDispatch();
  const getQueries = () => {
    dispatch(
      getOlderQueryList(`?limit=${limit}&page=${page}`, (resp: any) => {
        if (resp) {
          setOldQuery(resp.data);
        }
        dispatch(hideSkeleton());
        setIsFetching(false);
      })
    );
  };
  useEffect(() => {
    if (!oldQuery.nextPage) {
      getOlderQueryList(true);
    } else {
      setPage(1);
    }
    getQueries();
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    getOlderQueryList(oldQuery?.nextPage > 0 ? true : false);
  }, [isFetching]);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const handleScroll = (e: any) => {
  //   let check = false;
  //   (function (a: any) {
  //     if (
  //       /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
  //         a
  //       ) ||
  //       /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
  //         a.substr(0, 4)
  //       )
  //     )
  //       check = true;
  //   })(navigator.userAgent || navigator.vendor);
  //   if (
  //     window.innerHeight +
  //     document.documentElement.scrollTop +
  //     (check ? 1200 : 800) >=
  //     document.documentElement.offsetHeight
  //   )
  //     setIsFetching(true);
  //   else setIsFetching(false);
  // };
  const handleScroll = (e: any) => {
    handleScrollHeight(e, (value: boolean) => {
      setIsFetching(value);
    })
  };

  return (
    <div className={classes.homeRoot}>
      <Loader />
      <Hidden xsDown>
        <Typography variant="h1" className={classes.heading}>
          Older Queries
        </Typography>
      </Hidden>


      {oldQuery &&
        Array.isArray(oldQuery) && oldQuery.length > 0 ? (
        <div className={classes.rootDiv}>
          {
            oldQuery.map((item: any) => (
              <div className={classes.container} key={item._id}>
                <Grid container>
                  <Grid item xs={5} md={3}>
                    <Typography variant="body1" className={classes.title}>
                      Title:
                    </Typography>
                  </Grid>
                  <Grid item xs={7} md={9}>
                    <Typography variant="body1" className={classes.subTitle}>
                      {item?.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} md={3}>
                    <Typography variant="body1" className={classes.title}>
                      Ticket ID:
                    </Typography>
                  </Grid>
                  <Grid item xs={7} md={9}>
                    <Typography variant="body1" className={classes.subTitle}>
                      {item?.ticketId}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} md={3}>
                    <Typography variant="body1" className={classes.title}>
                      Issue:
                    </Typography>
                  </Grid>
                  <Grid item xs={7} md={9}>
                    <Typography variant="body1" className={classes.subTitle}>
                      {item?.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} md={3}>
                    <Typography variant="body1" className={classes.title}>
                      {" "}
                      Status:
                    </Typography>
                  </Grid>

                  <Grid item xs={7} md={9}>
                    <Typography
                      variant="body1"
                      className={clsx(classes.secondSubTitle, classes.hideText)}
                    >
                      {item?.status}
                    </Typography>
                    <Grid container className={classes.showText}>
                      <Grid item xs={12} md={4}>
                        <Typography
                          variant="body1"
                          className={classes.secondSubTitle}
                        >
                          {item?.status}
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={3}>
                        <Typography
                          variant="body1"

                          className={classes.title}
                        >
                          Order ID:
                        </Typography>
                      </Grid>
                      <Grid item xs={7} md={3}>
                        <Typography
                          variant="body1"
                          className={classes.thirdTitle}
                        >
                          {item?.orderId}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.hideText}>
                    <Grid item xs={5} md={3}>
                      <Typography
                        variant="body1"

                        className={classes.title}
                      >
                        Order ID:
                      </Typography>
                    </Grid>
                    <Grid item xs={7} md={9}>
                      <Typography
                        variant="body1"
                        className={classes.thirdTitle}
                      >
                        {item?.orderId}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={5} md={3}>
                    <Typography variant="body1" className={classes.title}>
                      Date & Time:
                    </Typography>
                  </Grid>

                  <Grid item xs={7} md={9}>
                    <Typography variant="body1" className={classes.subTitle}>
                      {item.createdAt
                        ? `${format(new Date(item.createdAt), "dd MMMM yyyy")} | ${format(new Date(item.createdAt), "hh:mm aaa")}`
                        : "-"}
                    </Typography>
                  </Grid>
                </Grid>
                
              </div>
            ))}
        </div>
      ) : (
        <OrderNotFound
        noDataFoundIcon={true}
        hideButton={true}
          message="No Queries Found"
        />
        // <Typography variant="h5" align="center" className={classes.noOrder}>
        //   No Record Found
        // </Typography>
      )}
    </div>
  );
};

export default ShowQuery;
