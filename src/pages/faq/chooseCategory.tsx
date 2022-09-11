import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  List,
  Collapse,
  ListItemText,
  ListItem,
  Divider,
  Typography,
  Hidden,
  useMediaQuery,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReducersModal } from "../../models";
import { getFaqList } from "./action";
import { ListItemButton } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import SelectedCategory from "./selectedCategory";
import Utils from "../../utils";
import OrderNotFound from "../account/orders/orderNotFound";
import { useHistory } from "react-router-dom";
import theme from "../../theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("xs")]: {
        background: "#fafafa",
      },
    },
    categoryItem: {
      "& .MuiTypography-body1": {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.6
        )}px Work Sans`,
        color: "var(--secondary-black)",
        lineHeight: "19px",
        letterSpacing: "0.08em",
        textTransform: "capitalize",
        [theme.breakpoints.down("xs")]:{
          font: `normal ${theme.spacing(
            1.4
          )}px Work Sans SemiBold`,
        },
        
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: "28px",
      letterSpacing: "0.08em",
      margin: theme.spacing(2, 0),
    },
    list: {
      backgroundColor: "var(--white) !important",
      "& .MuiListItem-button": {
        backgroundColor: "var(--white) !important",
        transition: "none ! important",
        [theme.breakpoints.down("xs")]: {
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            padding: "12px",
          },
       
      },
      "& .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root:hover": {
        backgroundColor: "var(--white) !important",
      },
      [theme.breakpoints.down("xs")]: {
        "&.MuiList-padding": {
          padding: 0,
        },
      },
    },
    outerDiv: {
      border: "1px solid var(--border-color)",
    },

    accordion: {
      padding: theme.spacing(0, 2),
      "& .MuiPaper-elevation1": {
        boxShadow: "none",
      },
      "& .MuiAccordionSummary-root": {
        minHeight: theme.spacing(6),
        padding: theme.spacing(0),
      },
    },
    subcategoryClass: {
      "& .MuiTypography-body1": {
        font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
          1.4
        )}px Work Sans`,
        color: "var(--secondary-black)",
        lineHeight: "16px",
        letterSpacing: "0.08em",
        textTransform: "capitalize",
        [theme.breakpoints.down("xs")]:{
          font: `normal ${theme.spacing(
            1.4
          )}px Work Sans Medium`,
          color:"#666666"
        },
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
    noDataDiv: {
      display: "flex",
      placeItems: "center",
      flexDirection: "column",
      marginTop: theme.spacing(3),
    },
    noData: {
      width: "100%",
      height: "auto",
    },
    noDataTitle: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Roacalt Alt`,
      color: "var(--secondary-black)",
      lineHeight: "28.8px",
      letterSpacing: "0.03em",
      textTransform: "capitalize",
    },
  })
);

const ChooseCategory: React.FC<any> = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState<any>([]);
  const [selectedId, setSelectedId] = useState(categories?.[0]?.catId);
  const [subCategoryId, setSubCategoryId] = useState(
    categories?.[0]?.subCategory?.[0]?.catId
  );
  const [title, setTitle] = useState(
    categories?.[0]?.subCategory?.[0]?.category
  );
  const [questions, setQuestions] = useState<any>([]);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));


  useEffect(() => {
    dispatch(
      getFaqList(`?type=category`, (resp: any) => {
        setCategories(resp);
        setSelectedId(resp?.[0]?.catId);
        setSubCategoryId(resp?.[0]?.subCategory?.[0]?.catId);
        setTitle(resp?.[0]?.subCategory?.[0]?.category);
        dispatch(
          getFaqList(
            `?catId=${resp?.[0]?.subCategory?.[0]?.catId}&type=questions`,
            (resp: any) => {
              setQuestions(resp);
            }
          )
        );
      })
    );
  }, []);

  const handleSubmit = (e: any) => {
    if (selectedId === e) {
      setOpen(!open);
      setSelectedId(e);
    } else {
      setOpen(true);
      setSelectedId(e);
    }
  };

  const handleSubmitCategory = (id: any) => {
    setSubCategoryId(id.catId);
    setTitle(id.category);
    dispatch(
      getFaqList(`?catId=${id.catId}&type=questions`, (resp: any) => {
        setQuestions(resp);
      })
    );
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

  const handleSubmitSelectedCategory = (id: any) => {
    setSubCategoryId(id.catId);
    setTitle(id.category);
    dispatch(
      getFaqList(`?catId=${id.catId}&type=questions`, (resp: any) => {
        setQuestions(resp);
        history.push({
          pathname: Utils.routes.SELECTED_CATEGORY,
          state: {
            questions: questions,
            title: title,
            subCategoryId: subCategoryId,
            pageName: title,
            // handleQuerySearch: handleQuerySearch
          },
        });
      })
    );
  };

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  return (
    <div>
      <div className={classes.root}>
        {skeletonLoader ? (
          <div className={classes.outerDiv}>
            <div className={classes.skeletonBox}>
              {Array.of(1, 2, 3, 4).map((ele: number) => {
                return (
                  <div key={ele}>
                    <div className={classes.skeletonContainer}>
                      <Skeleton variant="rectangular" width={170} height={20} />
                      <Skeleton variant="rectangular" width={60} height={20} />
                    </div>
                    {ele !== 4 && <Divider className={classes.divider} />}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <Grid container spacing={isSmall ? 0 : 2}>
            {categories.length > 0 ? (
              <Grid item xs={12} md={4}>
                <div className={classes.outerDiv}>
                  <List component="nav" className={classes.list}>
                    {categories.map(
                      ({ _id, catId, category, subCategory }: any) => {
                        return (
                          <div key={_id}>
                            <ListItem
                              button
                              onClick={() => {
                                handleSubmit(catId);
                              }}
                            >
                              <ListItemText className={classes.categoryItem}>
                                {category}
                              </ListItemText>
                              {catId === selectedId && open ? (
                                <img src={Utils.images.UPARROW} alt="upIcon" />
                              ) : (
                                <img
                                  src={Utils.images.DOWNARROW}
                                  alt="downIcon"
                                />
                              )}
                            </ListItem>
                            <Collapse
                              in={catId === selectedId && open}
                              timeout="auto"
                              unmountOnExit
                            >
                              <List component="div" disablePadding>
                                {subCategory?.map((item: any, index: any) => (
                                  <ListItem key={index} button>
                                    <Hidden xsDown>
                                      <ListItemButton
                                        key={item.catId + catId}
                                        onClick={() => {
                                          handleSubmitCategory(item);
                                        }}
                                      >
                                        <ListItemText
                                          className={classes.subcategoryClass}
                                        >
                                          {item.category}
                                        </ListItemText>
                                      </ListItemButton>{" "}
                                    </Hidden>
                                    <Hidden smUp>
                                      <ListItemButton
                                        key={item.catId + catId}
                                        onClick={() => {
                                          handleSubmitSelectedCategory(item);
                                        }}
                                      >
                                        <ListItemText
                                          className={classes.subcategoryClass}
                                        >
                                          {item.category}
                                        </ListItemText>
                                      </ListItemButton>{" "}
                                    </Hidden>
                                  </ListItem>
                                ))}
                              </List>
                            </Collapse>
                          </div>
                        );
                      }
                    )}
                  </List>
                </div>
              </Grid>
            ) : (
              <Grid item xs={12} md={12}>
                <OrderNotFound
                  message="No Data Found"
                  noDataFoundIcon={true}
                  hideButton={true}
                />
              </Grid>
            )}

            <Hidden xsDown>
              <Grid item xs={12} md={8}>
                {questions && questions.length > 0 ? (
                  <SelectedCategory
                    questions={questions}
                    title={title}
                    subCategoryId={subCategoryId}
                    handleQuerySearch={handleQuerySearch}
                  />
                ) : null}
              </Grid>
            </Hidden>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default ChooseCategory;
