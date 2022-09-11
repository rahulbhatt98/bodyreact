import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  useMediaQuery,
} from "@material-ui/core";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import theme from "../../theme";
// import { ReducersModal } from "../../models";
import Utils from "../../utils";
import OrderNotFound from "../account/orders/orderNotFound";
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
      "& .MuiInputBase-root":{
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.4
        )}px Work Sans Medium`,
      }
    }
      
    },
    accordion: {
      margin: theme.spacing(2, 0),
      padding: theme.spacing(0, 1.5),
      border: "1px solid var(--border-color)",
      "& .MuiPaper-elevation1": {
        boxShadow: "none",
        // borderBottom: "1px solid #d5d5d5",
        transition: "none !important",
        [theme.breakpoints.down("xs")]:{
          padding: theme.spacing(1)
        }
      },
      [theme.breakpoints.down("xs")]:{
        padding: theme.spacing(0)
      },
      "& .MuiAccordionSummary-root": {
        padding: theme.spacing(0),
        transition: "none !important",
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
      "& .MuiAccordionDetails-root": {
        padding: theme.spacing(1, 0, 2, 0),
      },
      // "& .MuiAccordionDetails-root":{
      //   padding: theme.spacing(0,0,2,0),
      //   borderBottom: "1px solid var(--text-color)"

      // }
    },
    title: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: "19px",
      textTransform: "capitalize",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.4
        )}px Work Sans SemiBold`,
      },
    },
    detail: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--light-gray)",
      lineHeight: "22.4px",
      letterSpacing: "-0.33px",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.3
        )}px Work Sans Regular`,
        color:"#666666"
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
    skeletonBox: {
      padding: "20px",
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    divider: {
      margin: theme.spacing(1, 0),
    },
    outerDiv: {
      border: "1px solid var(--border-color)",
    }
  })
);

const PopularCategory: React.FC<any> = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [accordionId, setAccordionId] = useState<string | false>("");
  const [skeletonLoader,showSkeleton] = useState(false);
  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setAccordionId(newExpanded ? panel : false);
    };
    const isSmall = useMediaQuery(theme.breakpoints.down("xs"));


  // const { faqData } = useSelector((state: ReducersModal) => {
  //   return state.faqReducer;
  // });
  const dispatch = useDispatch();
  useEffect(() => {
    showSkeleton(true)
    dispatch(
      getFaqList(`?isPopular=true&type=questions`, (resp: any) => {
        setCategories(resp);
        showSkeleton(false)

      })
    );
  }, []);

  const handleSearch = (event: any) => {
    let value = event.target.value.toLowerCase();
    if (value) {
      dispatch(
        getFaqList(
          `?isPopular=true&type=questions&search=${value}`,
          (resp: any) => {
            setCategories(resp);
          }
        )
      );
    } else {
      dispatch(
        getFaqList(`?isPopular=true&type=questions`, (resp: any) => {
          setCategories(resp);
        })
      );
    }
  };

  const handleExpand = (e: any) => {
    if (selectedId === e) {
      setExpanded(!expanded);
      setSelectedId(e);
    } else {
      setExpanded(true);
      setSelectedId(e);
    }
  };

  return (
    <div>
      <div className={classes.root}>
        {skeletonLoader ? (
          <div className={classes.outerDiv}>
            <div className={classes.skeletonBox}>
              {Array.of(1, 2, 3, 4,5).map((ele: number) => {
                return (
                  <div key={ele}>
                    <div className={classes.skeletonContainer}>
                      <Skeleton
                        variant="rectangular"
                        width={170}
                        height={20}
                      />
                      <Skeleton
                        variant="rectangular"
                        width={60}
                        height={20}
                      />
                    </div>
                    {ele !== 5 && <Divider className={classes.divider} />}
                  </div>
                );
              })}
            </div>
          </div>
        ) :
          <Grid container spacing={isSmall ? 1 : 2}>
            <Grid item xs={12} md={12}>
              {categories && categories.length > 0 ? (
                <>
                  <div>
                    <TextField
                      placeholder="Type here to search"
                      fullWidth
                      className={classes.inputField}
                      onChange={(event) => handleSearch(event)}
                    />
                  </div>

                  <div className={classes.accordion}>
                    {categories?.map((item: any) => (
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
                            item.id === selectedId && expanded ? (
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
                </>


              ) : !skeletonLoader?(
                <OrderNotFound
                  message="No Data Found"
                  noDataFoundIcon={true}
                  hideButton={true}
                />
              ):""}
            </Grid>
          </Grid>
        }

      </div>
    </div>
  );
};

export default PopularCategory;
