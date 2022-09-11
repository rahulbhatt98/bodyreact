import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  TextField,
  Radio,
  Hidden,
  Divider,
} from "@material-ui/core";
import CustomButton from "../../../../components/common/button";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReasons } from "../action";
import clsx from "clsx";
import { ReducersModal } from "../../../../models";
// import Utils from "../../../../utils";
import BreadCrumb from "../../../../components/breadCrumb";
// import Skeleton from "@mui/material/Skeleton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    writeDiv: {
      margin: theme.spacing(3, 0.4),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 1.5),
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
      marginTop: "15px",
      display: "flex",
      alignContent: "center",
      justifyContent: "space-between",
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
        fontSize: "16px",
      },
    },
    externalContainer: {
      display: "flex",
      padding: theme.spacing(1, 0, 0, 0),
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
      },
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
      [theme.breakpoints.down("xs")]: {
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
    padding: {
      paddingLeft: "9px",
      [theme.breakpoints.down("xs")]: {
        paddingLeft: "0px",
        paddingRight: "15px",
      },
    },
    skeleton: {},
    rootDiv: {
      padding: theme.spacing(1, 0, 0, 0),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(3, 0, 0, 1.5),
      },
    },
    fixedButtonContainer: {
      position: "fixed",
      bottom: "0px",
      left: "0px",
      right: "0px",
      width: "100%",
      background: "white",
      padding: "0px 10px",
    },
    divider: {
      border: "border: 1px solid #F2F2F2",
      marginTop: theme.spacing(1),
    },
  })
);

const ReasonReturn: React.FC<any> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedOrderForReturn: any =
    useSelector(
      (state: ReducersModal) => state.orderHistoryReducer.selectedOrderForReturn
    ) || {};

  const selectedOrderId: any =
    useSelector(
      (state: ReducersModal) => state.orderHistoryReducer.selectedOrder?.orderId
    ) || null;

  const [reasons, setReasonsList] = useState([]);
  const [checked, setChecked] = useState<any>(
    selectedOrderForReturn?.reason?.checked || ""
  );
  const [othersText, setOthersText] = useState(
    selectedOrderForReturn?.reason?.othersText || ""
  );
  const history = useHistory();

  const handleChange = (e: any) => {
    setChecked(e.target.value);
    if (e?.target?.value?.toLowerCase() !== "others") {
      setOthersText("");
    }
  };

  const onCommentChange = (e: any) => {
    setOthersText(e.target.value);
  };
  useEffect(() => {
    if (
      !selectedOrderForReturn?.images ||
      selectedOrderForReturn?.images?.length === 0
    ) {
      return history.push("/order/list");
    }
    dispatch(
      getReasons("cancel", (response: any) => {
        setReasonsList(response);
      })
    );
  }, []);

  const handleSubmit = () => {
    const reason = checked?.toLowerCase() === "others" ? othersText : null;
    dispatch({
      type: "selectedOrderForReturn",
      payload: {
        ...selectedOrderForReturn,
        reason: { checked: checked, othersText: reason },
      },
    });
    history.push({
      pathname: "/my-address",
      state: {
        pageName: "Select Pickup Address",
      },
    });
  };

  return (
    <>
      <div className={classes.rootDiv}>
        <BreadCrumb
          breadcrumb={[
            { title: "My Orders", action: "/my-order" },
            { title: "Add Photo", action: "/add-photo" },
            { title: "Reason For Return", action: "/return-reasons" },
          ]}
        />
      </div>
      <div className={classes.writeDiv}>
        <Hidden xsDown>
          <div className={classes.btnDiv}>
            <div className={classes.btnName}>
              <Typography className={classes.heading}>
                Select Reason for Return
              </Typography>
              <Typography className={classes.orderNo}>
                {selectedOrderId}
              </Typography>
            </div>
            <div className={classes.btn}>
              <CustomButton
                disabled={
                  (checked?.toLowerCase() === "others" && !othersText) ||
                  !checked
                }
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                text={"Next"}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </Hidden>
        <Hidden smUp>
          <Typography className={classes.orderNo}>{selectedOrderId}</Typography>
          <Divider className={classes.divider} />
        </Hidden>
        <div>
          {reasons.map((item: any, index) => (
            <>
              <div className={classes.externalContainer} key={index}>
                <Radio
                  value={item.reason}
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  onChange={handleChange}
                  checked={checked === item.reason}
                />
                <Typography
                  variant="h4"
                  align="center"
                  className={classes.subheading}
                >
                  {item?.reason || ""}
                </Typography>
              </div>
              {item?.reason?.toLowerCase() === "others" &&
                checked?.toLowerCase() === "others" && (
                  <div className={clsx(classes.break, classes.padding)}>
                    <TextField
                      id="filled-multiline-static"
                      multiline
                      fullWidth
                      rows={4}
                      placeholder="Please leave a comment"
                      // className={classes.break}
                      onChange={onCommentChange}
                      value={othersText}
                    />
                  </div>
                )}
            </>
          ))}
        </div>

        <Hidden smUp>
          <div className={classes.fixedButtonContainer}>
            <div className={classes.btn}>
              <CustomButton
                disabled={
                  (checked?.toLowerCase() === "others" && !othersText) ||
                  !checked
                }
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                text={"Next"}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </Hidden>
      </div>
    </>
  );
};

export default ReasonReturn;
