import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import Utils from "../../../../utils";
import "./level.css";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../../../models";
import DashboardBannerSkeleton from "../../../../components/common/skeletonList/dashboardBannerSkeleton";
import { useParams } from "react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tierRootContainer: {
      display: "flex",
      alignItems: "stretch",
      justifyContent: "center",
      margin: theme.spacing(2, 0),
      [theme.breakpoints.down("xs")]: {
        // margin: theme.spacing(2, -1),
        margin: theme.spacing(0.5, 0),
      }
    },

    tierTitle: {
      background: "var(--primary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexBasis: "30%",
      height: "53px",
      [theme.breakpoints.down("xs")]: {
        height: "40px",
       
      }
    },
    tierName: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.6
      )}px Work Sans`,
      color: "var(--white)",
      textTransform: "uppercase",
      [theme.breakpoints.down("xs")]: {
        fontSize: "10px",
      }
    },
    tierText: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.6
      )}px Work Sans Medium`,
      color: "var(--black300)",
      textTransform: "uppercase",
      letterSpacing: "-0.33px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "10px",
      }
    },
  })
);

function Level() {
  const classes = useStyles();
  const params:any = useParams()
  const TierType = useSelector((state: ReducersModal) => state.userDetailReducer.dashboard?.TierType) || 0;
  const  skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });
  return (
    params?.slug === "dashboard" && skeletonLoader  ?
      <DashboardBannerSkeleton label="level" />
      :
      <>
        <div className={classes.tierRootContainer}>
          <div className={classes.tierTitle}>
            <Typography variant="body1" className={classes.tierName}>
              Tiers
            </Typography>
          </div>
          <ul className="tierLevel">
            {
              Utils.constants.tierType.map((item: any) => {

                return (
                  <li key={item.id} className={TierType&&item.id >= TierType ? "stepper__item current" : "stepper__item"}>
                    <Typography variant="body1" className={item.id >= TierType ? classes.tierName : classes.tierText}>
                      {item.label}
                    </Typography>
                  </li>
                )
              })
            }

          </ul>
        </div>
      </>
  );
}

export default Level;
