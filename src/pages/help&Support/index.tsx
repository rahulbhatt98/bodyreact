import { makeStyles, createStyles, Theme, Typography, Hidden } from "@material-ui/core";
import { useEffect } from "react";
import MoreQueries from "./moreQueries";
import RecentPurchase from "./recentPurchase";
import { screenViewed } from "../../utils/event/action";
import events from "../../utils/event/constant";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    homeRoot: {
      // margin: theme.spacing(1, 5),
      [theme.breakpoints.down("sm")]: {
        // margin: theme.spacing(1),
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.6
      )}px Work Sans`,
      lineHeight: "42px",
      color: "var(--green-color)",
      padding: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        lineHeight: "inherit",
        fontSize: "26px",
      },

    },
  })
);

const HelpSupport = () => {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    /**
        * Event logger
        */
    screenViewed({
      ScreenName: events.SCREEN_HELP_SUPPORT,
      CTGenerated: "WEB"
    })
  }, [])


  return (
    <div className={classes.homeRoot}>
      {/* <BreadCrumb
          breadcrumb={[
            { title: "Home", action: "/" },
            { title: "Help and Support", action: "#"  },
          ]}
        /> */}
      <Hidden xsDown>
        <Typography variant="h1" className={classes.heading}>
          Order Related Queries
        </Typography>
      </Hidden>
      <RecentPurchase />
      <MoreQueries />
    </div>
  );
};

export default HelpSupport;
