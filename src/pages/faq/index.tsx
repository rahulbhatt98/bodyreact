import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
  Box,
  Tab,
  Hidden,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { screenViewed } from "../../utils/event/action";
import events from "../../utils/event/constant";
import Banner from "./Banner";
import Tabs from "@mui/material/Tabs";
import ChooseCategory from "./chooseCategory";
import PopularCategory from "./popularCategory";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }} style={{ background: "#fafafa" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4, 8),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(3, 0),
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0, 0),
      },
    },

    tabContainer: {
      "& .MuiTab-wrapper": {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          2
        )}px  Work Sans`,
        lineheight: "23px",
        textTransform: "capitalize",
        color: "var(--secondary-black)",
        [theme.breakpoints.down("xs")]: {
          fontSize: "16px",
        },
      },
      "& .PrivateTabIndicator-root-62": {
        background: "#D5CE4B!important",
        height: "3.5px",
      },
      "& .MuiTabs-indicator": {
        background: "#D5CE4B!important",
        height: "3.5px",
      },
      "& .MuiTab-root": {
        width: theme.spacing(40),
        padding: theme.spacing(0.6, 2),
        [theme.breakpoints.down("xs")]: {
          width: "50%",
        },
      },
      "& .MuiTabs-flexContainer": {
        borderBottom: "1px solid #F2F5F5",
      },
    },
    skeleton: {
      // margin: "10px 0px",
      marginLeft: "60px",
      [theme.breakpoints.down("xs")]: {
        marginLeft: "30px",
      },
    },
    skeletonContainer: {
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "space-between",
      },
      padding: "0px 20px",
      paddingRight: "30px",
      marginTop: "20px",
    },
    label: {
      "& .MuiTab-wrapper": {
        [theme.breakpoints.down("xs")]: {
          font: `normal ${theme.spacing(
            1.5
          )}px  Work Sans Bold`,
        }
      }
    }
  })
);

const Faq: React.FC<any> = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  useEffect(() => {
    /**
     * Event logger
     */
    screenViewed({
      ScreenName: events.SCREEN_FAQ,
      CTGenerated: "WEB",
    });
  }, []);

  return (
    <div>
      <Helmet>
        <title>FAQ's | The Body Shop</title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Hidden xsDown>
        <Banner />
      </Hidden>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Box>
              {skeletonLoader ? (
                <div className={classes.skeletonContainer}>
                  <Skeleton
                    height={20}
                    width={90}
                    className={classes.skeleton}
                  />
                  <Skeleton
                    height={20}
                    width={90}
                    className={classes.skeleton}
                  />
                </div>
              ) : (
                <Tabs
                  value={value}
                  onChange={handleChange}
                  className={classes.tabContainer}
                  variant="scrollable"
                  aria-label="scrollable force tabs example"
                >
                  <Tab className={classes.label} label="Category" {...a11yProps(0)} />

                  <Tab className={classes.label} label="Popular FAQ’s" {...a11yProps(1)} />
                </Tabs>
              )}
            </Box>
            <TabPanel value={value} index={0}>
              <ChooseCategory />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PopularCategory />
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Faq;
