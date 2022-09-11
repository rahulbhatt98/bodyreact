import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Hidden,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import Utils from "../../utils";
import Skeleton from "@mui/material/Skeleton";
import { useLocation } from "react-router-dom";
import { getFaqList } from "./action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    inputField: {
      background: "rgb(227 235 234)",
      padding: theme.spacing(1),
      border: "none !important",
      "& .MuiInput-underline:before": {
        borderBottom: "none !important",
      },
      "& .MuiInput-underline:after": {
        borderBottom: "none !important",
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans Bold`,
      color: "var(--secondary-black)",
      lineHeight: "28px",
      letterSpacing: "0.08em",
    //   margin: theme.spacing(2, 0),
      textTransform: "capitalize",
    //   position: "absolute",
    //   top: "12px",
    //   zIndex: 999999,
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   width: "100%",
    },
    list: {},
    outerDiv: {
      border: "1px solid var(--border-color)",
      [theme.breakpoints.down("xs")]:{
          margin: theme.spacing(3,0)
      }
    },
    divider: {
      border: "3px solid #D5CE4B",
      width: "28%",
      margin: theme.spacing(1, 0),
    },
    summary: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: "16px",
    },
    detail: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--light-gray)",
      lineHeight: "22.4px",
      letterSpacing: "-0.33px",
    },
    accordion: {
      padding: theme.spacing(0, 2),
      "& .MuiPaper-elevation1": {
        boxShadow: "none",
        // borderBottom: "1px solid var(--text-color)",
      },
      "& .MuiAccordionSummary-root": {
        minHeight: theme.spacing(6),
        padding: theme.spacing(0),
      },
      "& .MuiAccordionDetails-root": {
        padding: theme.spacing(0, 0, 2, 0),
        // borderBottom: "1px solid var(--text-color)",
      },
      "& .MuiCollapse-wrapperInner": {
        borderBottom: "1px solid #d5d5d5 !important",
        transition: "none !important",
        boxShadow: "none",
      },

      "& .MuiAccordion-root.Mui-expanded:before": {
        borderBottom: "1px solid #d5d5d5 !important",
        transition: "none !important",
        boxShadow: "none",
        opacity: 1,
      },
    },
    title: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: "19px",
      textTransform: "capitalize",
      [theme.breakpoints.down("xs")]:{
        font: `normal 600 ${theme.spacing(
          1.6
        )}px Work Sans SemiBold`,
        lineHeight: "30px"
      }
    },
    skeleton: {
      marginBottom: "10px !important",
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
    skeletonDivider: {
      margin: theme.spacing(1, 0),
    },
  })
);

const MobileSelectedCategory: React.FC<any> = ({
  //   questions,
  //   subCategoryId,
  title,
}: any) => {
  const classes = useStyles();
  const location: any = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [selectedAccordion, setSelectedAccordion] = useState(1);
  const [value, setValue] = useState();
  const [accordionId, setAccordionId] = useState<string | false>("");
  const titles: any = location?.state?.title;
  const subCategoryId: any = location?.state?.subCategoryId;
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState(location?.state?.questions || []);
  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setAccordionId(newExpanded ? panel : false);
    };

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getFaqList(`?catId=2&type=questions`));
  // }, []);

  const handleSearch = (event: any) => {
    let value = event.target.value.toLowerCase();
    setValue(value);

    if (value.length > 3 || value.length === 0) {
      handleQuerySearch(value);
    }
    // if (value) {
    //   dispatch(
    //     getFaqList(
    //       `?catId=${subCategoryId}&type=questions&search=${value}`
    //     )
    //   );
    // } else {
    //   dispatch(getFaqList(`?catId=${subCategoryId}&type=questions`));
    // }
  };
  const handleExpand = (e: any) => {
    if (selectedAccordion === e) {
      setExpanded(!expanded);
      setSelectedAccordion(e);
    } else {
      setExpanded(true);
      setSelectedAccordion(e);
    }
  };

  const handleQuerySearch = (id: any) => {
    if (id) {
      dispatch(
        getFaqList(
          `?catId=${subCategoryId}&type=questions&search=${id}`,
          (resp: any) => {
            setQuestions(resp);
          }
        )
      );
    } else {
      dispatch(
        getFaqList(`?catId=${subCategoryId}&type=questions`, (resp: any) => {
          setQuestions(resp);
        })
      );
    }
  };
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  return (
    <div>
      <div className={classes.root}>
        {skeletonLoader ? (
          <Skeleton width={"100%"} height={40} />
        ) : (
          //   <Hidden xsDown>
          <div>
            <TextField
              placeholder="Type here to search"
              fullWidth
              className={classes.inputField}
              onChange={(event) => handleSearch(event)}
              value={value}
            />
          </div>
          //   </Hidden>
        )}
        {/* {skeletonLoader ? (
          <Skeleton width={100} height={20} className={classes.skeleton} />
        ) : (
          <Typography className={classes.heading}>{titles}</Typography>
        )} */}
        <div className={classes.outerDiv}>
          {skeletonLoader ? (
            <div className={classes.skeletonBox}>
              {Array.of(1, 2, 3, 4).map((ele: number) => {
                return (
                  <div key={ele}>
                    <div className={classes.skeletonContainer}>
                      <Skeleton variant="rectangular" width={170} height={20} />
                      <Skeleton variant="rectangular" width={60} height={20} />
                    </div>
                    {ele !== 4 && (
                      <Divider className={classes.skeletonDivider} />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={classes.accordion}>
              {questions &&
                questions.length > 0 &&
                questions.map((item: any) => (
                  <Accordion
                    expanded={accordionId === item.id}
                    onClick={() => {
                      handleExpand(item.id);
                    }}
                    onChange={handleChange(item.id)}
                    key={item.id}
                  >
                    <AccordionSummary
                      expandIcon={
                        item.id === selectedAccordion && expanded ? (
                          <img src={Utils.images.DELETE_DATA} alt="icon" />
                        ) : (
                          <img src={Utils.images.ADD_DATA} alt="icon" />
                        )
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.title}>
                        {item.ques}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className={classes.detail}>
                        {item.ans}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileSelectedCategory;
