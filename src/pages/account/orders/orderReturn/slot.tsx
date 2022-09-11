import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Divider,
  Radio,
  Hidden,
} from "@material-ui/core";
import CustomButton from "../../../../components/common/button";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import BreadCrumb from "../../../../components/breadCrumb";
// import Utils from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
// import { orderHistoryReducer } from "../reducer";
import { ReducersModal } from "../../../../models";
import { useHistory } from "react-router";
// import { isTemplateTail } from "typescript";
import { returnOrder } from "../action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    writeDiv: {
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 1.5),
      },
    },

    btn: {
      width: "15%",
      "& .makeStyles-btnProceed-64.MuiButton-root": {
        marginTop: theme.spacing(0),
      },
      [theme.breakpoints.down(500)]: {
        width: "100%",
      },
    },
    btnDiv: {
      display: "flex",
      alignContent: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 0),
      },
    },
    btnName: {
      alignSelf: "center",
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans`,
      lineHeight: "28px",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "22px",
      },
    },
    externalContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margintop: "1px",
    },
    subheading: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "16px",
      color: "var(--black)",
    },
    root: {
      "&$checked": {
        color: "var(--main-opacity)",
        borderRadius: theme.spacing(0.4),
      },
    },
    checked: {},
    break: {
      margin: theme.spacing(1, 0),
      width: "92%",
      "& .MuiInputBase-multiline": {
        padding: theme.spacing(1.5),
        border: "1px solid #E2E2E2",
        borderRadius: "2px",
      },
      "& .MuiInput-underline:before": {
        borderBottom: "none",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    orderNo: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.6
      )}px Work Sans`,
      lineHeight: "19px",
      color: "var(--secondary-black)",
      marginTop: theme.spacing(0.6),
      textTransform: "uppercase",
    },
    title: {
      margin: theme.spacing(2, 0, 0, 0),
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      lineHeight: "18px",
      color: "var(--black)",
      [theme.breakpoints.down("xs")]: {
        font: `normal 700 ${theme.spacing(
          1.5
        )}px Work Sans`,
        marginBottom: "10px",

      }
    },
    divider: {
      border: "border: 1px solid #F2F2F2",
      margin: theme.spacing(2,0),
    },
    outerBox: {
      [theme.breakpoints.down("xs")]: {

        marginTop: theme.spacing(3),
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

const Slot = () => {
  const classes = useStyles();
  // const selectedOrder: any = orderHistoryReducer?.selectedOrder || {};
  const selectedOrderForReturn: any =
    useSelector((state: ReducersModal) => state.orderHistoryReducer.selectedOrderForReturn) || {};

  const selectedOrderId: any =
    useSelector((state: ReducersModal) => state.orderHistoryReducer.selectedOrder?._id) || null;

  const pickUpSlots = useSelector((state: ReducersModal) => state.configReducer.generalConfigs?.return_pickup_slots) || [];
  const [checked, setChecked] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const handleChange = (event: any) => {
    setChecked(event.target.value);
  };

  useEffect(() => {
    if (!selectedOrderForReturn?.addressId) {
      return history.push("/order/list");
    }
  }, []);

  const handleSubmit = () => {
    const images: any = [];
    selectedOrderForReturn?.urls.map((obj: any) => images.push(obj.url));
    const payload = {
      orderStatus: 8,
      orderId: selectedOrderId || null,
      itemId: selectedOrderForReturn?.items?.join(",") || "",
      reason:
        selectedOrderForReturn?.reason?.checked !== "Others"
          ? selectedOrderForReturn.reason.checked
          : selectedOrderForReturn?.reason?.othersText,
      returnData: {
        images: images,
        addressId: selectedOrderForReturn?.addressId || null,
        timeSlot: checked,
      },
    };
    dispatch(
      returnOrder(payload, () => {
        history.push("/order/detail/" + selectedOrderId);
      })
    );
  };
  return (
    <>
      <div className={classes.writeDiv}>
        <BreadCrumb
          breadcrumb={[
            { title: "Reason For Return", action: "/return-reasons" },
            { title: "Address", action: "/my-address" },
            { title: "Time Slot", action: "#" },
          ]}
        />
        <Hidden xsDown>
          <div className={classes.btnDiv}>
            <div className={classes.btnName}>
              <Typography className={classes.heading}>
                Select Pick Up Slot
              </Typography>
            </div>
            <div className={classes.btn}>
              <CustomButton
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                text={"Submit"}
                disabled={!checked}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </Hidden>
        <div>
          <div className={classes.outerBox}>
            {pickUpSlots?.map((item: any) => (
              <>
                <Typography className={classes.title}>{item.label}</Typography>
                {item?.values &&
                  Array.isArray(item?.values) &&
                  item?.values?.map((value: any) => {
                    return (
                      <>
                      <div
                        className={classes.externalContainer}
                        key={item?.type}
                      >
                        <Typography
                          variant="h4"
                          align="center"
                          className={classes.subheading}
                        >
                          {value || ""}
                        </Typography>
                        <Radio
                          value={value || ""}
                          classes={{
                            root: classes.root,
                            checked: classes.checked,
                          }}
                          onChange={handleChange}
                          checked={checked === value}
                        />
                      </div>

                      </>
                    );
                  })}
            <Divider className={classes.divider} />

              </>
            ))}
          </div>
        </div>
        <Hidden smUp>
          <div className={classes.fixedButtonContainer}>
            <div className={classes.btn}>
              <CustomButton
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                text={"Submit"}
                disabled={!checked}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </Hidden>
      </div>
    </>
  );
};

export default Slot;
