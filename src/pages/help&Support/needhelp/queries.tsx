import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button,
} from "@material-ui/core";
import CustomButton from "../../../components/common/button";
import Utils from "../../../utils";
import { useState, useEffect } from "react";
import ContactModal from "./contactModal";
import Skeleton from "@mui/material/Skeleton";
import { ReducersModal } from "../../../models";
import { useSelector, useDispatch } from "react-redux";
import { getHelpSupportQues } from "../action";
import { submitQuestionsPoll } from "../../productDetail/action";
import { useLocation } from "react-router";
import { hideSkeleton, showSkeleton } from "../../home/actions";



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
    },
    innerContainer: {
      margin: theme.spacing(2, 0),
    },

    product: {
      "& .MuiAccordionSummary-root": {
        padding: theme.spacing(0, 0, 1, 0),
      },
      "& .MuiPaper-elevation1": {
        boxShadow: "none !important",
        borderBottom: "1px solid var(--text-color)",
      },
      "& .MuiAccordionDetails-root": {
        flexDirection: "column",
        padding: theme.spacing(0, 0, 1, 0),
        [theme.breakpoints.down("xs")]: {
          padding: theme.spacing(0, 0, 1, 0),
        },
      },
      "& .MuiAccordion-rounded:last-child": {
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
      },
      "& .MuiAccordion-rounded:first-child": {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
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
    },

    rightDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
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
        font: `normal ${theme.spacing(
          1.6
        )}px Recoleta Alt Bold`,
        letterSpacing: "0.05em",

      }
    },
    innerDiv: {
      margin: theme.spacing(2, 0),
    },
    para: {
      font: `normal ${theme.spacing(
        1.4
      )}px Work Sans Regular`,
      color: "var(--secondary-black)",
      lineHeight: 2.2,
      letterSpacing: "-0.333333px",
    },
    btnWidth: {
      width: "38%",
      [theme.breakpoints.down("xs")]: {
        width: "auto",
      },
    },
    summary: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "rgba(102, 102, 102, 0.99)",
      lineHeight: 2.6,
      letterSpacing: "-0.333333px",
      width: "70%",
      [theme.breakpoints.down("xs")]: {
        width: "auto",
        lineHeight: 2,
      },
    },
    divider: {
      margin: theme.spacing(1, 0),
    },
    btn: {
      background: "var(--backgroun-color)",
      border: "1px solid var(--light-gray-text)",
      boxSizing: "border-box",
      borderRadius: "4px",
      margin: theme.spacing(1, 1.5),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 1),
      },
    },
    query: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: 1.6,
      letterSpacing: "-0.333333px",
    },
    outerDiv: {
      display: "flex",
      justifyContent: "end",
      alignItems: "center",
    },
    skeleton: {
      margin: "10px 0px",
    },
    skeletonContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px",
    },
    skeletonBox: {
      padding: "20px",
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
  })
);

// interface Props {
//   open: boolean;
//   handleClose: () => void;
// }

const Queries = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [question, setQuestion] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const [accordionId, setAccordionId] = useState<string | false>("");
  const location: any = useLocation();
  const orderStatus = location?.state?.data?.items?.orderStatus || null;
  const orderId = location?.state?.data?.orderId || null;
  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setAccordionId(newExpanded ? panel : false);
    };

  const [state, setState] = useState({
    contactModal: false,
  });

  const handleContactModalOpen = () => {
    setState({ ...state, contactModal: true });
  };

  const handleContactModalClose = () => {
    setState({ ...state, contactModal: false });
  };

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });;

  const dispatch = useDispatch();
  const getQuestions = () => {
    dispatch(
      getHelpSupportQues(
        `?type=questions&orderStatus=${orderStatus}`,
        (resp: any) => {
          setQuestion(resp?.data || []);
          dispatch(hideSkeleton())
        }
      )
    );
  }
  useEffect(() => {
    dispatch(showSkeleton())
    getQuestions()
  }, []);

  const handleExpand = (e: any) => {
    if (selectedId === e) {
      setExpanded(!expanded);
      setSelectedId(e);
    } else {
      setExpanded(true);
      setSelectedId(e);
    }
  };

  const onClickHelpful = (value: string, question: any) => {
    const payload = {
      "orderId": orderId,
      "pollType": value,
      "ques": {
        "id": question.id,
        "ques": question.ques
      }
    }
    dispatch(submitQuestionsPoll(payload, () => {
      getQuestions()
    }))
  }

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
          <div className={classes.skeletonBox}>
            {Array.of(1, 2, 3, 4).map((ele: number) => {
              return (
                <>
                  <div className={classes.skeletonContainer}>
                    <Skeleton variant="rectangular" width={170} height={20} />
                    <Skeleton variant="rectangular" width={90} height={20} />
                  </div>
                  {ele !== 4 && <Divider className={classes.divider} />}
                </>
              );
            })}
          </div>
        </>

      ) : (
        <>
          {question.length > 0 ?
            <Typography variant="h1" className={classes.heading}>
              Queries related to your order ?
            </Typography> : ""
          }

          <div className={classes.innerContainer}>
            {question.map((item: any) => (
              <div className={classes.product} key={item.id}>
                <Accordion
                  expanded={accordionId === item.id}
                  onChange={handleChange(item.id)}
                  key={item.id}
                  onClick={() => {
                    handleExpand(item.id);
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      item.id === selectedId && expanded ? (
                        <img src={Utils.images.DELETE_DATA} alt="icon" />
                      ) : (
                        <img src={Utils.images.ADD_DATA} alt="icon" />
                      )
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.productName}>
                      {item.ques}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Typography className={classes.summary}>
                        {item.ans}
                      </Typography>
                    </div>
                    {item?.isPollShow &&
                      <>
                        <Divider className={classes.divider} />
                        <div className={classes.outerDiv}>
                          <Typography className={classes.query}>
                            {" "}
                            Was this helpful ?
                          </Typography>
                          <div>
                            <Button variant="outlined" className={classes.btn} onClick={() => onClickHelpful('No', item)}>
                              No
                            </Button>
                            <Button variant="outlined" className={classes.btn} onClick={() => onClickHelpful('Yes', item)}>
                              Yes
                            </Button>
                          </div>
                        </div>
                      </>
                    }
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </>
      )
      }
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
            Have more Queries
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
            Want to share a feedback related to your experience with us
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
              text={"Contact Us"}
              variant={"outlined"}
              type={"submit"}
              onClick={handleContactModalOpen}
            />
          )}
          <ContactModal
            orderId={orderId}
            open={state.contactModal}
            handleClose={handleContactModalClose}
          />
        </div>
      </div>
    </div >
  );
};

export default Queries;
