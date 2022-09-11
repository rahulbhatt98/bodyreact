import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import { Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FooterContentSkeleton } from "../../components/common/skeletonList/footerContentSkeleton";
import { ReducersModal } from "../../models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: theme.spacing(0, 0, 0, 4),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 0, 0, 0),
      },
    },
    img: {
      width: theme.spacing(8.4),
      height: theme.spacing(8.4),
      objectFit: "cover",
    },
    innerDiv: {},
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: "28px",
      letterSpacing: "0.02em",
      margin: theme.spacing(1, 0),
    },
    subHeading: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.6
      )}px Work Sans SemiBold`,
      color: "var(--secondary-black)",
      lineHeight: "16px",
      margin: theme.spacing(0.5, 0),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1.5, 0, 0, 0),
      },
    },
    // para: {
    //   font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
    //     1.5
    //   )}px Work Sans`,
    //   color: "var(--light-gray)",
    //   lineHeight: "22.4px",
    //   margin: theme.spacing(1, 0),
    //   letterSpacing: "-0.03em",
    //   [theme.breakpoints.down("xs")]: {
    //     margin: theme.spacing(1.2, 0, 0, 0),
    //   },
    // },
    para: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.5
      )}px Work Sans`,
      // color: "var(--light-gray)",
      lineHeight: "22.4px",
      margin: theme.spacing(1, 0),
      letterSpacing: "-0.03em",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(2, 0, 0, 0),
      },
      '& li': {
        padding: "10px 0px"
      },
      '& strong': {
        color: '#333333',
        font: `normal 700 16px Work Sans`
      }
    },
    btn: {
      margin: theme.spacing(2, 0, 4, 0),
      "& .MuiButton-fullWidth": {
        width: "40%",
        [theme.breakpoints.down("xs")]: {
          width: "100%",
        }
      }
    },

  })
);
interface Props {
  title: string;
  content: any;
}

const CookiesDetails: React.FC<Props> = ({ title, content }) => {
  const classes = useStyles();
  // useEffect(() => {
  //   window.scrollTo(0,0)
  // }, []);
 const  skeletonLoader  = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });;
  return (
    skeletonLoader ?
      <FooterContentSkeleton />
      :
      <>
        <div className={classes.outerDiv}>
          <div className={classes.innerDiv}>
            {/* <Typography variant="h4" className={classes.heading}>
              Cookies
            </Typography> */}
            <div className={classes.para} dangerouslySetInnerHTML={{ __html: content?.content || "" }} />
          </div>
        </div>
      </>
  );
};

export default CookiesDetails;
