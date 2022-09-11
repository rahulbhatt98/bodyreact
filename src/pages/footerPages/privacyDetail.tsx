import { makeStyles, createStyles, Theme, Typography, Hidden } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FooterContentSkeleton } from "../../components/common/skeletonList/footerContentSkeleton";
import { ReducersModal } from "../../models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerPrivacyDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(0, 0, 0, 4),
      },
      [theme.breakpoints.down("xs")]: {
        margin:"0px 0px 0px 0px important",
      },
    },
    // img: {
    //   width: theme.spacing(8.4),
    //   height: theme.spacing(8.4),
    //   objectFit: "cover",
    // },
    // innerDiv: {},
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans`,
      color: "var(--green-color-100)",
      lineHeight: "28px",
      letterSpacing: "0.02em",
      margin: theme.spacing(1, 0),
      textTransform: "capitalize",
    },
    // subHeading: {
    //   font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
    //     1.6
    //   )}px Work Sans SemiBold`,
    //   color: "var(--secondary-black)",
    //   lineHeight: "16px",
    //   margin: theme.spacing(0.5, 0),
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
        margin: theme.spacing(0, 0, 0, 0),
      },
      "& li": {
        padding: "10px 0px",
      },
      [theme.breakpoints.down("xs")]:{
        "& h1":{
          marginBottom: theme.spacing(2.5)
        }
      }
     
      // '& strong': {
      //   color: '#333333',
      //   font: `normal 700 16px Work Sans`
      // }
    },
  })
);
interface Props {
  content: any;
  title: string;
}
const PrivacyDetail: React.FC<Props> = ({ content, title }) => {
  const classes = useStyles();
  // useEffect(() => {
  //   window.scrollTo(0,0)
  // }, []);
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });
  return (
    skeletonLoader ?
      <FooterContentSkeleton />
      :
      <>
        <div className={classes.outerPrivacyDiv}>
          <div>
            {/* <Hidden xsDown>
              <Typography variant="h4" className={classes.heading}>
                {content?.title || ""}
              </Typography>
            </Hidden> */}
            <div
              className={classes.para}
              dangerouslySetInnerHTML={{ __html: content?.content || "" }}
            />
          </div>
        </div>
      </>
  );
};

export default PrivacyDetail;
