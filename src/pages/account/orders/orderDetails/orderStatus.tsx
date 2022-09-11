import { useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
  Collapse,
  Icon,
  Hidden,
} from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Skeleton from "@mui/material/Skeleton";
import Utils from "../../../../utils";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CancelModal from "../modal/cancelModal";
import { getReasons, updateOrder } from "../action";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../modal/confirmationModal";
import { useHistory } from "react-router";
import { ReducersModal } from "../../../../models";
import OrderStatusSkeleton from "../../../../components/common/skeletonList/orderStatusSkeleton";
import { getOrderList } from "../../../help&Support/action";
import clsx from "clsx";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderStatusRoot: {
      borderBottom: "1px solid var(--text-color)",

      padding: theme.spacing(1.5, 0),
      display: "flex",
      flexWrap: "wrap",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    leftDiv: {
      flexBasis: "25%",
      [theme.breakpoints.down("xs")]: {
        flexBasis: "100%",
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
    },
    rightDiv: {
      flexBasis: "75%",
      [theme.breakpoints.down("xs")]: {
        flexBasis: "100%",
        marginTop: theme.spacing(1),
      },
      '& .MuiStepLabel-root': {
        padding: 0,
        margin: "-2px 0px"
      },
      "& .MuiIcon-root": {
        height: "26px",
        width: "26px",
      },

    },
    stepper: {
      backgroundColor: "inherit",
      padding: 0,

      "& .MuiStepConnector-vertical": {
        padding: 0,
      },
      "& .MuiIcon-root": {
        overflow: "hidden",
        width: "24px",
        height: "28px",
        margin: theme.spacing(-0.2, 0),
      },
      // "& > div": {
      //   "& > div": {
      //     "& :nth-child(odd)": {
      //       animation: `$progressAnimationStrike 6s`,
      //     },
      //   }

      // },
    },
    stepLabelDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    expandDiv: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    checkIconChildDiv: {
      width: 16,
      height: 16,
      borderRadius: "50%",
      backgroundColor: "#a7dcd7",
      position: "relative",
      "&::after": {
        position: "absolute",
        content: '""',
        width: 10,
        height: 10,
        top: "50%",
        left: "50%",
        backgroundColor: "var(--main-opacity)",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
      },
    },
    imgAnimation: {
      animation: `$fadeIn 3s`,
      animationDelay: "3s",
      animationFillMode: "forwards",
      opacity: 0,
      // zIndex: 9,
      [theme.breakpoints.up(1600)]: {
        "& .MuiIcon-root": {
          height: "26px",
        }
      }
    },
    checkIconPendingDiv: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      backgroundColor: "#a7dcd7",
      position: "relative",
      marginLeft: "-3px",
      animation: `$fadeIn 3s`,
      animationDelay: "3s",
      animationFillMode: "forwards",
      opacity: 0,
      "&::after": {
        position: "absolute",
        content: '""',
        width: 15,
        height: 15,
        top: "50%",
        left: "50%",
        backgroundColor: "var(--main-opacity)",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
      },
    },
    "@keyframes fadeIn": {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
    stepperChild: {
      marginTop: theme.spacing(2.4),
      position: "relative",
      "&::before": {
        position: "absolute",
        content: '""',
        width: 2,
        height: 24,
        top: "-9%",
        left: "12px",
        backgroundColor: "var(--main-opacity)",
        // transform: "translate(0%, -50%)",
      },
      "& .MuiStepLabel-iconContainer": {
        paddingLeft: theme.spacing(0.4),
      },
    },
    stepLabelChild: {
      fontSize: `${theme.spacing(1.3)}px !important`,
    },
    disabledText: {
      color: "var(--light-gray-text) !important",
    },
    cancelledText: {
      color: "#f44437 !important",
    },
    stepLabel: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--black)",
    },
    checkIconDiv: {
      width: 24,
      height: 24,
      borderRadius: "50%",
      backgroundColor: "var(--main-opacity)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    checkIcon: {
      color: "var(--white)",
    },
    stepLabelTime: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.3
      )}px Work Sans`,
      color: "var(--light-gray)",
    },
    returnPolicyDiv: {
      padding: theme.spacing(1.5, 0),
      borderBottom: "1px solid var(--text-color)",
      // borderTop: "1px solid var(--text-color)",
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "normal",
      },
    },
    returnLeft: {
      flexBasis: "25%",
      [theme.breakpoints.down("xs")]: {
        flexBasis: "100%",
      },
    },
    returnRight: {
      flexBasis: "75%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        flexBasis: "100%",
        flexDirection: "column",
        alignItems: "normal",
      },
    },
    viewReturnDiv: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing(1.5)
      }
    },
    returnPolicyHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--main-opacity)",
      cursor: "pointer",
      marginLeft: theme.spacing(1),
    },
    btnDiv: {
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing(1),
        flexWrap: "wrap",
      },
    },
    btnReturn: {
      borderRadius: 4,
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(1, 2),
      letterSpacing: 0.6,
      marginLeft: "10px",
    },
    btnHelp: {
      borderRadius: 4,
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(1, 2),
      letterSpacing: 0.6,
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1.4, 2),
        margin: 0,

      }
    },
    skeleton: {
      margin: theme.spacing(1, 0.5),
    },
    skeletonContainer: {
      display: "flex",
      alignItems: "center",
    },
    // leftContent: {
    //   display: "flex",
    //   alignItems: "center"
    // },
    skelton2: {
      padding: theme.spacing(3.5, 17),
    },
    codBtn: {
      borderRadius: "4px",
      [theme.breakpoints.down(370)]: {
        marginTop: "10px",
      },
    },
    container: {
      // height: "500px",
      // width: "4px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "20px",
    },

    progress: {
      // marginLeft: theme.spacing(1),
      // marginTop: theme.spacing(-0.2),
      // padding: theme.spacing(0.2),
      background: "#D2D2D2",
      width: "10%",
      height: theme.spacing(4.5),
      [theme.breakpoints.down("xs")]: {
        height: theme.spacing(3.5),
      },
    },

    progressBar: {
      width: "30px",
      backgroundColor: "var(--main-opacity)",
      borderRadius: " 4px",
      transition: "0.7s linear",
      "& :nth-child(odd)": {
        transition: "3.7s linear",
      },
    },
    progressStriped: {
      height: 45,
      '& .MuiStepConnector-line': {
        minHeight: 0,
        borderColor: "var(--main-opacity)",
        animation: `$progressAnimationStrike 4s linear`,

      }
    },
    firstImg: {
      // zIndex: 9,


    },
    "@keyframes progressAnimationStrike": {
      '0%': {
        height: '0%'
      },
      '25%': {
        height: '50%'
      },
      '50%': {
        height: '75%'
      },
      '75%': {
        height: '85%'
      },
      '100%': {
        height: '100%'
      },

      // from: {
      //   height: 0,
      // },
      // to: {
      //   height: "100%",
      // },
    },
  })
);


const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.root}`]: {
    marginLeft: 10
  },
  [`& .${stepConnectorClasses.line}`]: {
    minHeight: 0,
    height: 45,
    borderWidth: 5
  },
}));

const QontoStepIcon = (props: any) => {
  const classes = useStyles();
  const icons: { [index: string]: React.ReactElement } = {
    1: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.PLACED} alt="placed" />
      </Icon>
    ),
    2: (
      <div className={classes.checkIconPendingDiv}></div>

    ),
    3: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.CANCELLED} alt="disabled" />
      </Icon>
    ),
    4: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.CANCELLED} alt="disabled" />
      </Icon>
    ),
    4.1: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.CANCELLED} alt="disabled" />
      </Icon>
    ),
    4.2: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.CANCELLED} alt="disabled" />
      </Icon>
    ),
    4.3: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.CANCELLED} alt="disabled" />
      </Icon>
    ),
    5: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.PLACED} alt="placed" />
      </Icon>
    ),
    6: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.PLACED} alt="placed" />
      </Icon>
    ),
    7: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.PLACED} alt="placed" />
      </Icon>
    ),
    8: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.RETURN} alt="placed" />
      </Icon>
    ),
    9: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.PLACED} alt="placed" />
      </Icon>
    ),
    10: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.PLACED} alt="placed" />
      </Icon>
    ),
    12: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.CANCELLED} alt="cancelled" />
      </Icon>
    ),
    21: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.PLACED} alt="placed" />
      </Icon>
    ),
    23: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.PLACED} alt="placed" />
      </Icon>
    ),
    30: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.PLACED} alt="placed" />
      </Icon>
    ),
    41: (
      <Icon
        className={
          props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
        }
      >
        <img src={Utils.images.PLACED} alt="placed" />
      </Icon>
    ),
  };
  return (
    <>
      {props.active ? (
        icons[String(props.id)]
      ) : (
        <Icon
          className={
            props?.indexKey !== 0 ? classes.imgAnimation : classes.firstImg
          }
        >
          <img src={Utils.images.DISABLED} alt="disable" />
        </Icon>
      )}
    </>
  );
}


const QontoChildConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.root}`]: {
    marginLeft: 10
  },
  [`& .${stepConnectorClasses.line}`]: {
    minHeight: 0,
    height: 24,
    borderWidth: 2,
    borderColor: "var(--main-opacity)"
  },
}));

function QontoChildStepIcon() {
  const classes = useStyles();
  return (
    <div className={classes.checkIconChildDiv}></div>
  );
}


interface Props {
  orderDetail: any;
  getDetails?: Function;
  selectedItem?: any;
}

function OrderStatus(props: Props) {
  const { orderDetail, getDetails, selectedItem } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(
    selectedItem?.shippingData?.length ? true : false
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cancelModalVisibility, setCancelModalVisibility] = useState(false);
  const [reasons, setReasonsList] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const map = new Map();

  // selectedItem?.trackingData.forEach((item: any) => map.set(item.orderStatus, item));
  // Utils.constants.ORDER_STATUS?.[selectedItem?.orderStatus]?.forEach((item: any) => map.set(item.id, { ...map.get(item.id), ...item }));

  var OrderStatus = [];
  const containsConfirmed = selectedItem?.trackingData?.find(
    (data: any) => data?.orderStatus === 5
  )?.orderStatus
    ? true
    : false;
  const containsFailed = selectedItem?.trackingData?.find(
    (data: any) => data?.orderStatus === 12
  )?.orderStatus
    ? true
    : false;
  const containsPending = selectedItem?.trackingData?.find(
    (data: any) => data?.orderStatus === 2
  )?.orderStatus
    ? true
    : false;
  if (orderDetail?.orderType == 1) {
    // //products
    // OrderStatus =
    //   Utils.constants.ORDER_STATUS.PRODUCT?.[
    //   selectedItem?.orderStatus === 4
    //     ? containsConfirmed
    //       ? 4.1
    //       : containsFailed
    //         ? 4.2
    //         : containsPending
    //           ? 4.3
    //           : 4.1
    //     : selectedItem?.orderStatus
    //   ];

    if (orderDetail?.paymentMethodSource != 1) {//not cod

      let index = selectedItem?.orderStatus === 4
        ? containsConfirmed
          ? 4.1
          : containsFailed
            ? 4.2
            : containsPending
              ? 4.3
              : 4.1
        : selectedItem?.orderStatus
      if (index === 10) {//cancelled status
        if (selectedItem?.trackingData?.findIndex((item: any) => item?.orderStatus === 9) > -1) {
          OrderStatus = Utils.constants.ORDER_STATUS.PRODUCT?.[10.1];
        }
        // else if (selectedItem?.trackingData?.findIndex((item: any) => item?.orderStatus === 6) > -1) {
        //   OrderStatus = Utils.constants.ORDER_STATUS.PRODUCT?.[10.2];
        // } else if (selectedItem?.trackingData?.findIndex((item: any) => item?.orderStatus === 3) > -1) {
        //   OrderStatus = Utils.constants.ORDER_STATUS.PRODUCT?.[10.3];
        // }
        else {
          OrderStatus = Utils.constants.ORDER_STATUS.PRODUCT?.[10];
        }

        // let OrderStatus: any = []
        // selectedItem?.trackingData?.map((item: any) => {
        //   let data = Utils.constants.ORDER_STATUS.PRODUCT?.[10.4]?.find((val: any) => item?.orderStatus === val?.id)

        //   if (data && item?.orderStatus !== 2) {
        //     data = { ...data, ...item }
        //     let temp = OrderStatus.findIndex((citem: any) => citem.id === item?.orderStatus);
        //     debugger
        //     if (temp < 0) {
        //       debugger
        //       OrderStatus.push(data)
        //     }
        //   }

        // });
        // debugger
      } else {
        OrderStatus = Utils.constants.ORDER_STATUS.PRODUCT?.[index];
      }

    } else {
      OrderStatus =
        Utils.constants.ORDER_STATUS.PRODUCT?.[6.1];
    }



    // OrderStatusData = Utils.constants.ORDER_STATUS.PRODUCT;
  } else {

    OrderStatus = Utils.constants.ORDER_STATUS.OTHER?.[selectedItem?.orderStatus];
    // OrderStatusData = Utils.constants.ORDER_STATUS.OTHER;
  }

  OrderStatus?.forEach((item: any) => {
    map.set(item.id, item);
  });
  selectedItem?.trackingData.forEach(
    (item: any) =>
      map.get(item.orderStatus) &&
      map.set(item.orderStatus, { ...map.get(item.orderStatus), ...item })
  );

  if (selectedItem?.orderStatus === 10) {//refunded case
    map.forEach((item: any, index: any) => {
      if (selectedItem?.trackingData?.findIndex((val: any) => val.orderStatus == index) < 0) {
        map.delete(index)
      }
    })
  }

  let steps = Array.from(map.values());
  let activeStep = steps.filter((item: any) => item?.timestamp).length - 1

  const handleClick = () => {
    selectedItem?.shippingData.length && setOpen(!open);
  };
  const handleCancelModal = () => {
    if (!cancelModalVisibility) {
      dispatch(
        getReasons("cancel", (response: any) => {
          setReasonsList(response);
        })
      );
    }
    setCancelModalVisibility(!cancelModalVisibility);
  };
  const handleSubmit = (reason: string) => {
    const payload = {
      orderStatus: 3,
      orderId: orderDetail._id,
      itemId: orderDetail?.items?.[0]?._id || null,
      reason,
    };
    dispatch(
      updateOrder(payload, (response: any) => {
        if (response && Object.keys(response)?.length > 0)
          // setState({ ...state, open: true });
          setCancelModalVisibility(!cancelModalVisibility);
        handleConfirmClose();
      })
    );
  };

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  const handleConfirmClose = () => {
    setConfirmOpen(!confirmOpen);
  };

  const handleNeedHelp = (item: any) => {
    const id = item?.items?.[0]._id;
    dispatch(
      getOrderList(`?limit=1&page=1&itemId=${id}`, (resp: any) => {
        if (resp)
          history.push({
            pathname: Utils.routes.NEED_HELP,
            state: { data: resp?.data?.[0] || {}, pageName: "Help & Support" },
          });
      })
    );
  };
  const cancelledStatus = [1, 2, 5, 6];
  const exchangeStatus = [9];
  return (
    <>
      {steps?.length ? (
        <div className={classes.orderStatusRoot}>
          <div className={classes.leftDiv}>
            {skeletonLoader ? (
              <Skeleton width={130} height={20} />
            ) : (
              <Typography className={classes.heading}>Order Status</Typography>
            )}
          </div>
          <div className={classes.rightDiv}>
            {skeletonLoader ? (
              <OrderStatusSkeleton />
            ) : (
              <>
                <Stepper
                  orientation="vertical"
                  // className={classes.stepper}
                  activeStep={activeStep}
                  connector={<QontoConnector classes={{ completed: classes.progressStriped, active: classes.progressStriped }} />}
                >
                  {steps.map((item: any, index: any) => (
                    <Step key={index}>
                      {item?.id === 7 ? ( //shipped
                        <>
                          <StepLabel
                            StepIconComponent={() =>
                              QontoStepIcon({
                                ...item,
                                active: item?.timestamp,
                                indexKey: index,
                              })
                            }
                            StepIconProps={{ ...item, active: item?.timestamp }}
                          >
                            <div className={classes.stepLabelDiv}>
                              <div
                                className={classes.expandDiv}
                                onClick={handleClick}
                              >
                                <Typography
                                  className={clsx(
                                    classes.stepLabel,
                                    item?.timestamp ? "" : classes.disabledText,
                                  )}
                                >
                                  {item?.label || ""}
                                </Typography>
                                {selectedItem?.shippingData.length ? (
                                  open ? (
                                    <ExpandLess />
                                  ) : (
                                    <ExpandMore />
                                  )
                                ) : null}
                              </div>
                              <Typography className={classes.stepLabelTime}>
                                {item?.timestamp &&
                                  Utils.CommonFunctions.unixToDate(
                                    item?.timestamp,
                                    "DD MMMM, Y"
                                  )}
                              </Typography>
                            </div>
                          </StepLabel>
                          <Collapse in={open} timeout="auto" unmountOnExit>
                            <Stepper
                              orientation="vertical"
                              className={[
                                classes.stepper,
                                classes.stepperChild,
                              ].join(" ")}
                              connector={<QontoChildConnector />}
                            >
                              {selectedItem?.shippingData?.map(
                                (item: any, index: any) => (
                                  <Step key={index}>
                                    <StepLabel
                                      StepIconComponent={QontoChildStepIcon}
                                    >
                                      <div className={classes.stepLabelDiv}>
                                        <Typography
                                          className={[
                                            classes.stepLabel,
                                            classes.stepLabelChild,
                                          ].join(" ")}
                                        >
                                          {item?.location}
                                        </Typography>
                                        <Typography
                                          className={classes.stepLabelTime}
                                        >
                                          {Utils.CommonFunctions.formatDate(
                                            item?.created_at,
                                            "DD MMMM, Y"
                                          )}
                                        </Typography>
                                      </div>
                                    </StepLabel>
                                  </Step>
                                )
                              )}
                            </Stepper>
                          </Collapse>
                        </>
                      ) : (
                        <StepLabel
                          StepIconComponent={() =>
                            QontoStepIcon({
                              ...item,
                              active: item?.timestamp,
                              indexKey: index,
                            })
                          }
                          StepIconProps={{ ...item, active: item?.timestamp }}
                        >
                          <div className={classes.stepLabelDiv}>
                            <Typography
                              className={clsx(
                                classes.stepLabel,
                                item?.timestamp ? "" : classes.disabledText,
                                item?.orderStatus == 3 ? classes.cancelledText : "" //for cancelled order status
                              )}
                            >
                              {item?.label || ""}
                            </Typography>
                            <Typography className={classes.stepLabelTime}>
                              {item?.timestamp &&
                                Utils.CommonFunctions.unixToDate(
                                  item?.timestamp,
                                  "DD MMMM, Y"
                                )}
                            </Typography>
                          </div>
                        </StepLabel>
                      )}
                    </Step>
                  ))}
                </Stepper>
              </>
            )}
          </div>
        </div>
      ) : null
      }
      {
        orderDetail?.orderType === Utils.constants.CART_TYPE.BAG && (
          <div className={classes.returnPolicyDiv}>
            <div className={classes.returnLeft}></div>
            <Hidden smUp>
              <Button
                className={classes.btnHelp}
                variant="contained"
                color="primary"
                onClick={() => handleNeedHelp(orderDetail)}
              >
                Need Help
              </Button>
            </Hidden>
            <div className={classes.returnRight}>
              {skeletonLoader ? (
                <div className={classes.skeletonContainer}>
                  <Skeleton height={40} width={40} className={classes.skeleton} />
                  <Skeleton height={20} width={60} className={classes.skeleton} />
                </div>
              ) : (
                <div
                  className={classes.viewReturnDiv}
                  onClick={() => history.push({ pathname: "/return-policy", state: { pageName: "Return Policy" } })}
                >
                  <img src={Utils.images.RETURN_POLICY} alt="policy" />
                  <Typography className={classes.returnPolicyHeading}>
                    View Return Policy
                  </Typography>
                </div>
              )}
              <CancelModal
                handleSubmit={handleSubmit}
                reasons={reasons}
                open={cancelModalVisibility}
                handleClose={handleCancelModal}
              />
              {confirmOpen && (
                <ConfirmationModal
                  open={confirmOpen}
                  handleClose={() => {
                    handleConfirmClose();
                    if (getDetails) getDetails();
                  }}
                />
              )}
              <div className={classes.btnDiv}>
                {skeletonLoader ? (
                  <div className={classes.skeletonContainer}>
                    <Skeleton
                      height={70}
                      width={100}
                      className={classes.skeleton}
                    />
                    <Skeleton
                      height={70}
                      width={100}
                      className={classes.skeleton}
                    />
                  </div>
                ) : (
                  <>
                    {cancelledStatus.includes(
                      orderDetail?.items?.[0]?.orderStatus
                    ) ? (
                      <Button
                        className={classes.btnReturn}
                        variant="outlined"
                        color="primary"
                        onClick={handleCancelModal}
                      >
                        Cancel Order
                      </Button>
                    ) : exchangeStatus.includes(
                      orderDetail?.items?.[0]?.orderStatus
                    ) ? (
                      // <Button
                      //   className={classes.btnReturn}
                      //   variant="outlined"
                      //   color="primary"
                      //   onClick={() =>
                      //     history.push({
                      //       pathname: "/my-order",
                      //       state: { pageName: "Select Order For Return" },
                      //     })
                      //   }
                      // >
                      //   Return/Exchange
                      // </Button>
                      null
                    ) : null}
                    <Hidden xsDown>
                      <Button
                        className={classes.btnHelp}
                        variant="contained"
                        color="primary"
                        onClick={() => handleNeedHelp(orderDetail)}
                      >
                        Need Help
                      </Button>
                    </Hidden>

                    {orderDetail?.items?.[0]?.orderStatus === 12 && (
                      <>
                        <Button
                          className={classes.btnReturn}
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            history.push({
                              pathname: "/shopping-bag/payment",
                              search: "?activeStep=3",
                              state: {
                                pageName: "my Bag",
                                flag: "retry",
                                mongoOrderId: orderDetail?._id || "",
                                paymentMethodId:
                                  orderDetail?.paymentMethodId || "",
                                itemId: orderDetail?.items?.[0]?._id,
                              },
                            });
                          }}
                        >
                          Retry Payment
                        </Button>
                        {!orderDetail?.isMembershipAdded && <Button
                          className={clsx(classes.btnReturn, classes.codBtn)}
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            history.push({
                              pathname: "/shopping-bag/payment",
                              search: "?activeStep=3",
                              state: {
                                pageName: "my Bag",
                                flag: "convertToCod",
                                mongoOrderId: orderDetail?._id || "",
                                paymentMethodId:
                                  orderDetail?.paymentMethodId || "",
                                itemId: orderDetail?.items?.[0]?._id,
                              },
                            })
                          }
                        >
                          Convert to COD
                        </Button>
                        }
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default OrderStatus;
