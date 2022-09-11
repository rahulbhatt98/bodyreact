import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Divider,
} from "@material-ui/core";
import CustomButton from "../../components/common/button";
import Utils from "../../utils";
import Skeleton from "@mui/material/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import { ReducersModal } from "../../models";
import { hideSkeleton, showSkeleton } from "../home/actions";
import { getHelpSupportQues } from "./action";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(3, 1),
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Recoleta Alt`,
      letterSpacing: "0.08em",
      lineHeight: "24px",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.6
        )}px Recoleta Alt Bold`,
        letterSpacing: "0.06em"
      }
    },
    innerContainer: {},

    product: {
      display: "flex",
      padding: theme.spacing(2, 0),
      borderBottom: "1px solid var(--text-color)",
      alignItems: "stretch",
      justifyContent: "space-between",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
      },
    },
    leftDiv: {
      display: "flex",
      alignItems: "stretch",
    },
    imgDiv: {
      borderRadius: 4,
      width: "80px",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
    },
    detailsDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    productName: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: 1.8,
      textTransform: "capitalize",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.4
        )}px Work Sans Medium`,
      }
    },

    rightDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      cursor: "pointer",
    },

    priceContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "flex-end",
      },
    },
    subHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
      lineHeight: 2.2,
      letterSpacing: "0.02em",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.6
        )}px Work Sans Bold`,
      }
    },
    innerDiv: {
      margin: theme.spacing(2, 0),
    },
    para: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: 2.2,
      letterSpacing: "-0.333333px",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.3
        )}px Work Sans Regular`,
        lineHeight: 2.2,

      }
    },
    btnWidth: {
      width: "30%",
      [theme.breakpoints.down("xs")]: {
        width: "auto",
      },
    },
    skeleton: {
      margin: "10px 0px",
    },
    skeletonContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px",
    },
    divider: {
      margin: "20px 0px",
      backgroundColor: "var(--text-color)",
    },
  })
);

const MoreQueries = () => {
  const classes = useStyles();
  const [question, setQuestion] = useState([]);
  const [visibility, setVisibility] = useState(false)
  const history = useHistory();

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const getQuestions = () => {
    dispatch(
      getHelpSupportQues(`?type=category`, (resp: any) => {
        if (resp) {
          setQuestion(resp?.data || []);
          setVisibility(resp?.oldQueries || false)
        }
        dispatch(hideSkeleton());
      })
    );
  };
  useEffect(() => {
    dispatch(showSkeleton());
    getQuestions();
  }, []);

  const handleClick = (id: string) => {
    const filteredData = question.filter((item: any) => item.catId === id);
    history.push({
      pathname: Utils.routes.SHOW_QUERY,
      state: { data: filteredData || [], pageName: "Help & Support" },
    });
  };

  return (
    <div className={classes.root}>
      {skeletonLoader ? (
        <>
          <Skeleton
            variant="rectangular"
            width={200}
            className={classes.skeleton}
            height={20}
          />
          {Array.of(1, 2, 3).map(() => (
            <>
              <div className={classes.skeletonContainer}>
                <Skeleton variant="rectangular" width={170} height={20} />
                <Skeleton variant="rectangular" width={90} height={20} />
              </div>
              <Divider className={classes.divider} />
            </>
          ))
          }
        </>
      ) : (
        <>
          {question.length > 0 ? <Typography variant="h1" className={classes.heading}>
            More queries related to your experience ?
          </Typography> : ""
          }
          <div className={classes.innerContainer}>
            {question?.map((item: any) => (
              <div
                className={classes.product}
                key={item?.catId}
                onClick={() => handleClick(item?.catId)}
              >
                <div className={classes.leftDiv}>
                  <div className={classes.detailsDiv}>
                    <Typography className={classes.productName}>
                      {item?.category}
                    </Typography>
                  </div>
                </div>
                <div className={classes.rightDiv}>
                  <div className={classes.priceContainer}>
                    <img src={Utils.images.ARROW_ICON} alt="icon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {visibility &&
        <div className={classes.innerDiv}>
          {skeletonLoader ? (
            <Skeleton
              variant="rectangular"
              className={classes.skeleton}
              width={190}
              height={20}
            />
          ) : (
            <Typography variant="h5" className={classes.subHeading}>
              Query history
            </Typography>
          )}
          {skeletonLoader ? (
            <Skeleton
              variant="rectangular"
              className={classes.skeleton}
              width={200}
              height={20}
            />
          ) : (
            <Typography variant="body1" className={classes.para}>
              Find your older queries status here
            </Typography>
          )}
          <div className={classes.btnWidth}>
            {skeletonLoader ? (
              <Skeleton
                variant="rectangular"
                className={classes.skeleton}
                width={"100%"}
                height={30}
              />
            ) : (
              <CustomButton
                fullWidth
                onClick={() => history.push({ pathname: Utils.routes.OLDER_QUERIES, state: { pageName: "Older Queries" } })}
                text={"Show older queries"}
                variant={"outlined"}
                type={"submit"}
              />
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default MoreQueries;
