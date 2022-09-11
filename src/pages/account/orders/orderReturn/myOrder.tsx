import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  withStyles,
  Divider,
  Checkbox,
  Hidden
} from "@material-ui/core";
import Utils from "../../../../utils";
import { useEffect, useState } from "react";
import CustomButton from "../../../../components/common/button";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../../../models";
import clsx from "clsx";
import BreadCrumb from "../../../../components/breadCrumb";
import MyOrdersSkeleton from "../../../../components/common/skeletonList/myOrderSkeleton";

const GreenCheckbox = withStyles({
  root: {
    color: "#3d857e",
    "&$checked": {
      color: "#3d857e",
    },
  },
  checked: {},
})((props: any) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderItemRoot: {
      padding: theme.spacing(1, 0),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1.5, 2),
      }
    },

    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans`,
      lineHeight: "28px",
      color: "var(--secondary-black)",
    },
    rightDiv: {
      flexBasis: "100%",
      marginTop: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        flexBasis: "100%",
        marginTop: theme.spacing(1),
        padding: "0px 10px"
      },
    },
    product: {
      display: "flex",
      alignItems: "stretch",
      flexWrap: "wrap",
      justifyContent: "space-between",

      "&:not(:last-child)": {
        marginBottom: theme.spacing(1),
      },
      [theme.breakpoints.down("xs")]: {
        justifyContent: "inherit",
        flexWrap: "nowrap",

      }
    },
    innerleftDiv: {
      display: "flex",
      alignItems: "center",
    },
    imgDiv: {
      backgroundColor: "var(--light-creame-color)",
      borderRadius: 4,
      width: "80px",
      height: "80px",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
    },
    img: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
    noImgBackground: {
      backgroundColor: "#F8F3E9",
      padding: "8px",
    },
    detailsDiv: {
      marginLeft: theme.spacing(1),
      width: "50%",
      [theme.breakpoints.down("xs")]: {
        width: "auto",
      },
    },
    productName: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: 1.5,
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down(500)]: {
        marginBottom: theme.spacing(0),
      },
    },
    productWeight: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )}px Work Sans`,
      color: "var(--light-gray)",
    },
    innerrightDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down(500)]: {
        width: "100%",
        marginTop: theme.spacing(1),
        flexDirection: "row",
        justifyContent: "space-between",
        // paddingRight: "20px"

      },
    },
    radioButton: {
      transition: "none",
      "&:hover": { backgroundColor: "white" },
      width: "14px",
      height: "14px",
    },
    divider: {
      border: "1px solid #F2F2F2",
      margin: theme.spacing(1, 0),
      "&:last-child": {
        display: "none",
      },
    },
    btn: {
      width: "15%",
      "& .makeStyles-btnProceed-64.MuiButton-root": {
        marginTop: theme.spacing(0),
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    btnDiv: {
      display: "flex",
      alignContent: "center",
      justifyContent: "space-between",

    },
    btnName: {
      alignSelf: "center",
    },
    root: {
      padding: theme.spacing(1, 0, 0, 0),
      marginLeft: theme.spacing(-0.4),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1, 0, 0, 1.5),

      }
    },
    fixedButtonContainer: {
      position: "fixed",
      bottom: "0px",
      left: "0px",
      right: "0px",
      width: "100%",
      background: "white",
      padding: "0px 10px"
    }
  })
);

function MyOrder() {
  const classes = useStyles();

  const selectedOrderForReturn: any =
    useSelector((state: ReducersModal) => state.orderHistoryReducer.selectedOrderForReturn) || {};

  const selectedOrder: any =
    useSelector((state: ReducersModal) => state.orderHistoryReducer.selectedOrder) || {};

  const items = selectedOrder?.items || [];

  const [selectedItems, setSelectedItems] = useState(
    items?.length==1?[items?.[0]?._id]:(selectedOrderForReturn?.items || [])
  );
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!selectedOrder?._id) {
      return history.push("/order/list");
    }
  }, []);

  const handleChange = (e: any, item: any) => {
    let itemsToBeSelected: any = selectedItems;
    if (
      e.target.checked &&
      item?._id &&
      !itemsToBeSelected.includes(item._id)
    ) {
      itemsToBeSelected.push(item._id);
      setSelectedItems([...itemsToBeSelected]);
    } else if (
      !e.target.checked &&
      item?._id &&
      itemsToBeSelected.includes(item._id)
    ) {
      itemsToBeSelected = itemsToBeSelected.filter(
        (id: string) => id !== item._id
      );
      setSelectedItems([...itemsToBeSelected]);
    }
  };

  const handleSubmit = () => {
    dispatch({
      type: "selectedOrderForReturn",
      payload: { ...selectedOrderForReturn, items: [...selectedItems] },
    });
    history.push({ pathname: "/add-photo", state: { pageName: "Add Photo" } });
  };
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });;

  return (
    <>
      <div className={classes.root}>
        <BreadCrumb
          breadcrumb={[
            { title: "Order History", action: Utils.routes.ORDER_HISTORY },
            { title: "Order Details", action: "order/detail/" + (selectedOrder?._id || 0) },
            { title: "My Orders", action: "#" },
          ]}
        />
      </div>
      <Hidden xsDown>

        <div className={classes.orderItemRoot}>
          <div className={classes.btnDiv}>
            <div className={classes.btnName}>
              <Typography className={classes.heading}>My Orders</Typography>
            </div>
            <div className={classes.btn}>
              {/* <Link to="/add-photo"> */}
              <CustomButton
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                text={"Next"}
                onClick={handleSubmit}
                disabled={selectedItems.length === 0}
              />
              {/* </Link> */}
            </div>
          </div>

          <div className={classes.rightDiv}>
            {
              skeletonLoader ?
                <MyOrdersSkeleton flag="my_order" />
                : items.map((item: any) => {
                  return (
                    <>
                      {/* {skeletonLoader ? (
                  <Skeleton variant="rectangular" height={200} />
                ) : ( */}
                      <div className={classes.product} key={item._id}>
                        <div className={classes.innerleftDiv}>
                          <div className={classes.imgDiv}>
                            <img
                              src={
                                item?.image?.[0]?.file
                                  ? `${IMAGE_URL}catalog/product${item.image[0].file}`
                                  : Utils.images.PRODUCT_PLACEHOLDER
                              }
                              alt="one"
                              className={
                                item?.image?.[0]?.file
                                  ? classes.img
                                  : clsx(classes.img, classes.noImgBackground)
                              }
                            />
                          </div>
                          <div className={classes.detailsDiv}>
                            <Typography className={classes.productName}>
                              {item.name}
                            </Typography>
                            <Typography className={classes.productWeight}>
                              Quantity : {item.quantity}
                            </Typography>
                          </div>
                        </div>
                        <div className={classes.innerrightDiv}>
                          <Typography className={[classes.productName].join(" ")}>
                            ₹{Utils.CommonFunctions.addCommaToAmount(item.totalPrice)}
                          </Typography>
                          {/* <GreenCheckbox
                    className={classes.radioButton}
                    checked={order === "item"}
                    onChange={() => setOrder("item")}
                    value="UPI Payment"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "C" }}
                  /> */}
                          <GreenCheckbox
                            key={item._id}
                            // defaultChecked={selectedOrderForReturn?.items?.includes(item._id)?true:false}
                            checked={
                              selectedItems.length > 0 &&
                                selectedItems?.includes(item._id)
                                ? true
                                : false
                            }
                            onChange={(e: any) => handleChange(e, item)}
                            name={item._id}
                            id={item._id}
                          />
                        </div>
                      </div>
                      <Divider className={classes.divider} />
                    </>
                  );
                })}
          </div>

        </div>
      </Hidden>
      <Hidden smUp>
        <div className={classes.rightDiv}>
          {
            skeletonLoader ?
              <MyOrdersSkeleton flag="my_order" />
              : items.map((item: any) => {
                return (
                  <>
                    <div className={classes.product} key={item._id}>
                      <div className={classes.innerleftDiv}>
                        <div className={classes.imgDiv}>
                          <img
                            src={
                              item?.image?.[0]?.file
                                ? `${IMAGE_URL}catalog/product${item.image[0].file}`
                                : Utils.images.PRODUCT_PLACEHOLDER
                            }
                            alt="one"
                            className={
                              item?.image?.[0]?.file
                                ? classes.img
                                : clsx(classes.img, classes.noImgBackground)
                            }
                          />
                        </div>

                      </div>
                      <div className={classes.innerrightDiv}>

                        <div className={classes.detailsDiv}>
                          <Typography className={classes.productName}>
                            {item.name}
                          </Typography>
                          <Typography className={classes.productWeight}>
                            Quantity : {item.quantity}
                          </Typography>
                        </div>

                        <div>
                          <Typography className={[classes.productName].join(" ")}>
                            ₹{Utils.CommonFunctions.addCommaToAmount(item.totalPrice)}
                          </Typography>
                          <GreenCheckbox
                            key={item._id}
                            checked={
                              selectedItems.length > 0 &&
                                selectedItems?.includes(item._id)
                                ? true
                                : false
                            }
                            onChange={(e: any) => handleChange(e, item)}
                            name={item._id}
                            id={item._id}
                          />
                        </div>
                      </div>
                    </div>
                    <Divider className={classes.divider} />
                  </>
                )
              })
          }
        </div>
        <div className={classes.fixedButtonContainer}>
          <div className={classes.btn}>
            {/* <Link to="/add-photo"> */}
            <CustomButton
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              text={"Next"}
              onClick={handleSubmit}
              disabled={selectedItems.length === 0}
            />
            {/* </Link> */}
          </div>
        </div>
      </Hidden>

    </>
  );
}

export default MyOrder;
