import { makeStyles, createStyles, Theme, Typography, Hidden } from "@material-ui/core";
import Products from "./products";
import Queries from "./queries";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    homeRoot: {
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(0),
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
      [theme.breakpoints.down(350)]: {
        fontSize: "30px",
      },
    },
  })
);

const NeedHelp = () => {
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={classes.homeRoot}>
      <Hidden xsDown>
        <Typography variant="h1" className={classes.heading}>
          Order Related Queries
        </Typography>
      </Hidden>

      <Products />
      <Queries />
    </div>
  );
};

export default NeedHelp;
