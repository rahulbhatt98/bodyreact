import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
  Input,
  Button,
} from "@material-ui/core";
import Utils from "../../../utils";
import { useHistory } from "react-router-dom";
import _ from "lodash";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchContainer: {
      padding: theme.spacing(2, 3),
      background: `url(${Utils.images.SEARCH_BACKGROUND}) top left no-repeat`,
      backgroundColor: "#044236",
      borderRadius: 5,
      backgroundSize: "cover",
      margin: theme.spacing(3, 0),
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        justifyContent: "center",
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(2, 2),
      },
      alignItems: "center",
    },
    searchHeading: {
      font: `normal ${theme.spacing(
        2.4
      )}px Druk Bold`,
      color: "#D6CD56",
      lineHeight: "27.96px",
      textTransform: "uppercase",
      letterSpacing: "2px !important",
      padding: theme.spacing(0, 1),
    },
    searchInput: {
      backgroundColor: "var(--white)",
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      height: "44px",
      width: "-webkit-fill-available",
      margin: 0,
      paddingLeft: "45px",

      "&:before": {
        border: 0,
      },
    },
    btn: {
      position: "relative",
      background: "var(--light-green)",
      color: "var(--primary)",
      font: `normal ${theme.spacing(
        1.6
      )}px Druk Bold`,
      padding: theme.spacing(1.2),
      letterSpacing: "0.06em",
      borderRadius:"4px",
    },
    searchIcon: {
      position: "absolute",
      top: "10px",
      left: "12px",
      zIndex: 9,
    },
    img: {
      width: "100%",
      height: "100%",
      borderRadius: "10px",
    },
    descContainer: {
      margin: theme.spacing(2, 0),
    },
    buyDescription: {
      color: "var(--white)",
      fontWeight: 400,
      fontFamily: "Work Sans Regular",
      fontSize: 16,
      lineHeight: "25.6px",
      margin: theme.spacing(1),
      textAlign: "center",
      letterSpacing:"0.08em"
    },
  })
);

interface Props {
  data: any;
  key: string
}

const FindNewStore = ({ data }: Props) => {
  const classes = useStyles();
  const content: any = data?.content && Array.isArray(data.content) && data?.content?.[0] ? data.content[0] : {};
  const history = useHistory();
  // const redirectToStore = () => {
  //   history.push("/stores");
  // };
  return (
    <>
      <Grid container className={classes.searchContainer}>
        <Grid item xs={12}>
          <div className={classes.descContainer}>
            <Typography
              variant="h3"
              align="center"
              className={classes.searchHeading}
            >
              {content?.title || ""}
            </Typography>
            {/* <Typography
              variant="h3"
              align="center"
              className={classes.buyDescription}
            >
              Visit us in store for a free consultation lorem ipsum dolor sit
              ametabore et magna aliqua quis nostrud exercitation
            </Typography> */}
            <div className={classes.buyDescription} dangerouslySetInnerHTML={{
              __html: content?.description ?
                _.truncate(Utils.CommonFunctions.replaceHtmlTag(
                  content?.description
                ),
                  { length: 1000 }
                ) : ""
            }}></div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            className={classes.btn}
            // onClick={redirectToStore}
            onClick={() =>
              history.push({
                pathname: Utils.routes.STORE,
                state: { pageName: "Find Stores" },
              })
            }
          >
            Find Stores
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
export default FindNewStore
