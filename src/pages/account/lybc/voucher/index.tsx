import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Grid,
  Hidden,
} from "@material-ui/core";
import { format } from "date-fns";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import Utils from "../../../../utils";
import { hideLoader, showLoader } from "../../../home/actions";
import { getRedeemGv, unblockGv } from "../action";
import RedeemVoucher from "./redeemVoucher";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "var(--white)",
      padding: theme.spacing(2),
      border: "1px solid var(--border-color)",

      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0, 0),
        background: "#f8f8f8",
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
      letterSpacing: "0.04em",
    },
    couponBox: {
      border: "1px solid var(--border-color)",
      boxSizing: "border-box",
      borderRadius: "4px",
      padding: theme.spacing(1),
      margin: theme.spacing(1, 1, 1, 0),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 0, 1, 0),
        background: "white",
        border: "none",
        padding: theme.spacing(1, 1),


      }
    },
    couponTitle: {
      font: `normal ${theme.spacing(
        2
      )}px Work Sans SemiBold`,
      color: "var(--secondary-black)",
      lineHeight: "23px",
      [theme.breakpoints.down("xs")]: {
        font: `normal  ${theme.spacing(
          1.6
        )}px Work Sans SemiBold`,
      }
    },
    couponPara: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--grey-color)",
      lineHeight: "16px",
      textTransform: "uppercase",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.2
        )}px Work Sans Regular`,
        lineHeight: "21px",
        letterSpacing: "0.02em"

      },
    },
    couponParaBold: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--grey-color)",
      lineHeight: "16px",
      textTransform: "uppercase",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.2
        )}px Work Sans Medium`,
        lineHeight: "21px",
        letterSpacing: "0.02em"
      },
    },
    couponLink: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      color: "var(--main-opacity)",
      lineHeight: "19px",
      textTransform: "uppercase",
      cursor: "pointer",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.3
        )}px Work Sans Semibold`,
      }
    },
    couponDescription: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--light-gray)",
      lineHeight: "20px",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.1
        )}px Work Sans Regular`,
      }
    },
    innerContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: theme.spacing(0, 0, 1.2, 0),
      [theme.breakpoints.down("xs")]: {
        alignItems: "normal",
      },
    },
    applyBtn: {
      "&.Mui-disabled > .MuiButton-label  > .MuiTypography-body1": {
        color: "var(--light-gray)",
      },
    },
    imagecontainer: {
      display: "flex",
      alignItems: "center",
      width: "100%"

    },
    couponImage: {
      height: '50px'
    },
    coponTextContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%"
    },
    couponText: {
      margin: theme.spacing(0, 1),
    },
    gridRoot: {
      width: "100%",
      margin: theme.spacing(1, 0),
    },
    noData: {
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      padding: "20px"
    },
    secondCoupon: {
      border: "1px solid var(--border-color)",
      boxSizing: "border-box",
      borderRadius: "4px",
      padding: theme.spacing(1),
      margin: theme.spacing(1, 0, 1, 1),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 0, 1, 0),
        background: "white",
        border: "none",
        padding: theme.spacing(2, 1),

      }
    },
    descriptionContent: {
      display: "flex",
      padding: theme.spacing(0.6,0,0,0),

    }

  })
);
export interface redeemGvInterface {
  voucherNumber: string, requestId: string, amount: string
}
interface Props {
  voucherList: any;
  getRedeemData: Function
}

const Voucher: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [openRedeemVoucherModal, setOpenRedeemVoucherModal] = useState(false);
  const dispatch = useDispatch();
  const { voucherList, getRedeemData } = props;
  const [redeemGvData, setRedeemGvData] = useState<redeemGvInterface>({ voucherNumber: "", requestId: "", amount: '' })

  const handleRedeemVoucherOpen = (gvCode: string, amount: string) => {
    const payload = {
      gvCode: gvCode,
      amount: amount || ""
    }
    dispatch(showLoader())
    dispatch(getRedeemGv(payload, (resp: any) => {
      dispatch(hideLoader())
      setRedeemGvData({ voucherNumber: resp?.GVCode || "", requestId: resp?.RequestID || "", amount: String(amount) })
    }))
    setOpenRedeemVoucherModal(true)
  };

  const handleRedeemVoucherClose = () => {
    const payload = {
      gvCode: redeemGvData?.voucherNumber || "",
      amount: redeemGvData?.amount || '',
      requestId: redeemGvData?.requestId || ""
    }
    dispatch(showLoader())
    dispatch(unblockGv(payload, (resp: any) => {
      dispatch(hideLoader())
      setOpenRedeemVoucherModal(false)
    }))
  };




  return (
    <div className={classes.root}>
      {
        voucherList?.length > 0 ?
          <>
            {/* <Hidden xsDown>
              <Typography variant="h2" className={classes.heading}>
                My Vouchers
              </Typography>
            </Hidden> */}
            {
              <Grid container className={classes.gridRoot} >
                {
                  voucherList.map((item: any, index: any) => (
                    <Grid item xs={12} md={6} key={index}>
                      <div className={clsx(index % 2 === 0 ? classes.couponBox : classes.secondCoupon)}>
                        <div className={classes.innerContainer}>
                          <div className={classes.imagecontainer}>
                            <img className={classes.couponImage} src={Utils.images.COUPON_ICON} alt="coupon_icon" />
                            <div className={classes.coponTextContainer}>
                              <div className={classes.couponText}>
                                <Typography variant="h3" className={classes.couponTitle}>
                                  {item?.GVCode || ""}
                                </Typography>
                                <div className={classes.descriptionContent} >
                                  <Typography className={classes.couponParaBold} >{"Expires On:"}</Typography>
                                  &nbsp; <Typography className={classes.couponPara} >{item?.ExpiryDate ? ` ${format(new Date(item.ExpiryDate), 'dd MMMM, yyyy')}` : ""}</Typography>
                                </div>
                              </div>
                              <Typography
                                variant="body1"
                                className={classes.couponLink}
                                onClick={() => handleRedeemVoucherOpen(item?.GVCode, item?.AvailableBalance || "")}
                              >
                                Redeem
                              </Typography>
                            </div>
                          </div>
                          <div>
                            {/* <Typography
                              variant="body1"
                              className={classes.couponLink}
                              onClick={() => handleRedeemVoucherOpen(item?.GVCode, item?.AvailableBalance || "")}
                            >
                              Redeem
                            </Typography> */}
                            <RedeemVoucher
                              getRedeemData={getRedeemData}
                              closeModal={() => setOpenRedeemVoucherModal(false)}
                              redeemGvData={redeemGvData}
                              open={openRedeemVoucherModal}
                              handleClose={handleRedeemVoucherClose}
                            />

                          </div>
                        </div>
                        <Typography variant="body2" className={classes.couponDescription}>
                          {item?.GVNarration || ""}
                        </Typography>
                      </div>
                    </Grid>
                  ))
                }

              </Grid>
            }
          </>
          : <Typography className={classes.noData}>No Vouchers Found</Typography>

      }
    </div >
  );
};

export default Voucher;
