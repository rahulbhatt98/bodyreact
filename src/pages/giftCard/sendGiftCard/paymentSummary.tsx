import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Divider,
  Hidden,
  Drawer,
  List,
  ListItem,
} from "@material-ui/core";
import { useState } from "react";
import CustomButton from "../../../components/common/button";
import React from "react";
import Utils from "../../../utils";

type Anchor = "bottom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paymentDiv: {
      padding: theme.spacing(2.5, 0),
      marginLeft: theme.spacing(1.5),
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(0),
      },
    },
    paymentDetails: {
      backgroundColor: "var(--white)",
      border: "1px solid var(--text-color)",
      borderRadius: 4,
      padding: theme.spacing(1.5),
    },
    paymentHeading: {
      font: `normal ${theme.spacing(1.8)}px Work Sans`,
      color: "var(--green-color)",
      marginBottom: theme.spacing(2),
      fontWeight: 600,
      lineHeight: "21px",
      textTransform: "uppercase",
      [theme.breakpoints.down("xs")]: {
        background: "#F8F8F8",
        color: "black",
        margin: theme.spacing(0.5, -1.5, 0, -1.5),
        padding: theme.spacing(1.2),
      },
    },
    reuseDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1.5, 0),
      },
    },
    reuseHeading: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.6
      )}px Work Sans`,
      color: "var(--secondary-black)",
      display: "flex",
      alignItems: "center",
      lineHeight: "19px",
      [theme.breakpoints.down("xs")]: {
        lineHeight: "25px",
      },
    },
    discountIcon: {
      color: "var(--main-opacity)",
      marginLeft: 0.5,
    },
    view: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      lineHeight: "18px",
      color: "var(--secondary-black)",
    },
    view2:{
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      lineHeight: "18px",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.6
        )}px Recoleta Alt Bold`,
      }
    },
    productWeight: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )}px Work Sans`,
      color: "var(--light-gray)",
      marginTop: "6px",
    },
    grandTotalDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(1, 0),
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "baseline",
        padding: theme.spacing(0),
      },
    },
    grandSecondDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#F8F8F8",
      color: "black",
      margin: theme.spacing(-1.5, -1.5, 0, -1.5),
      padding: theme.spacing(1.2),
    },
    grandHeading2: {
      color: "black",
      font: "15px",
    },
    grandTotal: {
      font: `normal  ${theme.spacing(1.4)}px Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: "16px",
      fontWeight: 600,
    },
    divider: {
      border: "1px dashed rgba(178, 178, 178, 0.5)",
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, -1.5, 0, -1.5),
      },
    },
    divider2: {
      border: "1px solid var(----border-color)",
      marginBottom: theme.spacing(1),
    },
    divider3: {
      border: "1px solid rgba(178, 178, 178, 0.5)",
      marginBottom: theme.spacing(1),
    },
    externalDiv: {
      padding: theme.spacing(1, 1.2),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0),
      },
    },
    grandHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      lineHeight: "19px",
      color: "var(--green-color)",
      [theme.breakpoints.down("xs")]: {
        color: "var(--main-opacity)",
        fontSize: "12px",
      },
    },
    productsubWeight: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "16px",
      color: "var(--main-opacity)",
      [theme.breakpoints.down("xs")]: {
        color: "var(--light-gray)",
      },
    },
    checkOutBtn: {
      borderRadius: 2,
      font: `normal 700 ${theme.spacing(1.6)}px Work Sans`,
      textTransform: "capitalize",
      // padding: theme.spacing(1.5, 0),
      // marginTop: theme.spacing(1.5),
      width: "57%",
    },
    backButton: {
      width: "40%",
    },
    btnContainer: {
      width: "100%",
      margin: "5px 0px",
      display: "flex",
      justifyContent: "space-between",
    },
    skeltonView: {
      padding: theme.spacing(16),
    },
    secondDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "1px solid var(--border-color)",
      borderBottom: "1px solid var(--border-color)",
      padding: theme.spacing(1.5),
      left: "0",
      width: "100%",
      bottom: 0,
      zIndex: 9,
      position: "fixed",
      backgroundColor: "white"
    },
    list: {
      width: 250,
    },
    filterModalHeading: {},
    modal: {},
    drawer: {
      "& .MuiDrawer-paperAnchorBottom": {
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
      },
    },
  })
);

interface Props {
  paymentMode: "cod" | "netbanking" | "paytm" | "upi" | "card" | undefined;
  proceedToPay: boolean;
  handleBack: Function;
  selectedAmount: number;
  donationAmount: number;
  btnText?: string;
  setPaymentMode: Function;
  totalAmount: number;
  onSubmit: Function;
}

const PaymentSummary: React.FC<Props> = ({
  proceedToPay,
  handleBack,
  selectedAmount,
  donationAmount,
  paymentMode,
  btnText = "Place Order",
  setPaymentMode,
  onSubmit,
  totalAmount,
}: Props) => {
  const classes = useStyles();
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);

  const handleChange = (event: any) => {
    setShowPaymentSummary(true);
  };
  const handleClose = (event: any) => {
    setShowPaymentSummary(false);
  };
  return (
    <>
      <Hidden xsDown>
        <div className={classes.paymentDiv}>
          <div className={classes.paymentDetails}>
            <Typography className={classes.paymentHeading}>
              Payment Details
            </Typography>
            <Divider className={classes.divider2} />

            <div className={classes.externalDiv}>
              <div className={classes.reuseDiv}>
                <Typography className={classes.reuseHeading}>
                  Bag total (1 item)
                </Typography>
                {/* <Typography className={classes.view}>₹ {eCardSummary?.giftCard?.amount || 0}</Typography> */}
                <Typography className={classes.view}>
                  ₹ {Utils.CommonFunctions.addCommaToAmount(selectedAmount) || 0}
                </Typography>
              </div>
              {/* <Divider className={classes.divider} />
          <div className={classes.reuseDiv}>
            <Typography className={classes.reuseHeading}>
              Product discount
            </Typography>
            <Typography className={classes.view}>₹ 350</Typography>
          </div>
          <div className={classes.reuseDiv}>
            <div>
              <Typography className={classes.reuseHeading}>
                Coupon Discount
              </Typography>
              <Typography className={classes.productWeight}>
                Promo -(BB12DIWLI21)
              </Typography>
            </div>
            <Typography className={classes.grandTotal}>₹ 50</Typography>
          </div> */}
              <Divider className={classes.divider} />
              {donationAmount ? <>
                <div className={classes.reuseDiv}>
                  <div>
                    <Typography className={classes.reuseHeading}>
                      Donate
                    </Typography>
                    <Typography className={classes.productsubWeight}>
                      Feeding India Foundation
                    </Typography>
                  </div>
                  <Typography className={classes.grandTotal}>
                    ₹ {Utils.CommonFunctions.addCommaToAmount(donationAmount)}
                  </Typography>

                </div>
                <Divider className={classes.divider} />
              </> : null
              }

              <div className={classes.reuseDiv}>
                <Typography className={classes.reuseHeading}>
                  Sub Total
                </Typography>
                <Typography className={classes.view}>
                  ₹ {Utils.CommonFunctions.addCommaToAmount(totalAmount)}
                </Typography>
              </div>
            </div>
            <Divider className={classes.divider3} />
            <div className={classes.grandTotalDiv}>
              <Typography className={classes.grandHeading}>
                Grand total
              </Typography>
              <Typography className={classes.view}>₹ {totalAmount}</Typography>
            </div>
            <div className={classes.btnContainer}>
              <div className={classes.backButton}>
                <CustomButton
                  type="button"
                  color="primary"
                  fullWidth
                  variant="outlined"
                  text={"BACK"}
                  onClick={handleBack}
                // disabled={!proceedToPay}
                />
              </div>
              <div className={classes.checkOutBtn}>
                <CustomButton
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                  text={btnText}
                  onClick={onSubmit}
                  disabled={proceedToPay}
                />
              </div>
            </div>
          </div>
        </div>
      </Hidden>
      <Hidden smUp>
        <>
          <div>
            <Drawer
              disableEnforceFocus
              anchor="bottom"
              open={showPaymentSummary}
              onClose={(e: any) => handleClose(e)}
              className={classes.drawer}
            >

              <div className={classes.paymentDetails}>
                <Typography className={classes.paymentHeading}>
                  Payment Details
                </Typography>
                <div className={classes.externalDiv}>
                  <div className={classes.reuseDiv}>
                    <Typography className={classes.reuseHeading}>
                      Bag total (1 item)
                    </Typography>
                    {/* <Typography className={classes.view}>₹ {eCardSummary?.giftCard?.amount || 0}</Typography> */}
                    <Typography className={classes.view}>
                      ₹ {Utils.CommonFunctions.addCommaToAmount(selectedAmount) || 0}
                    </Typography>
                  </div>

                  {/* 
         
          <div className={classes.reuseDiv}>
            <div>
              <Typography className={classes.reuseHeading}>
                Coupon Discount
              </Typography>
              <Typography className={classes.productWeight}>
                Promo -(BB12DIWLI21)
              </Typography>
            </div>
            <Typography className={classes.grandTotal}>₹ 50</Typography>
          </div> */}
                  <Divider className={classes.divider} />
                  {donationAmount ? <>
                    <div className={classes.reuseDiv}>
                      <div>
                        <Typography className={classes.reuseHeading}>
                          Donate
                        </Typography>
                        <Typography className={classes.productsubWeight}>
                          Feeding India Foundation
                        </Typography>
                      </div>
                      <Typography className={classes.grandTotal}>
                        ₹ {Utils.CommonFunctions.addCommaToAmount(donationAmount)}
                      </Typography>

                    </div>
                    <Divider className={classes.divider} />
                  </>
                    : null
                  }

                  <div className={classes.reuseDiv}>
                    <Typography className={classes.reuseHeading}>
                      Sub Total
                    </Typography>
                    <Typography className={classes.view}>
                      ₹ {Utils.CommonFunctions.addCommaToAmount(totalAmount)}
                    </Typography>
                  </div>
                </div>
                <Divider className={classes.divider3} />
                <div className={classes.grandSecondDiv}>
                  <Typography className={classes.grandHeading2}>
                    Grand total
                  </Typography>
                  <Typography className={classes.view}>
                    ₹ {Utils.CommonFunctions.addCommaToAmount(totalAmount)}
                  </Typography>
                </div>
              </div>
            </Drawer>
          </div>

          <div className={classes.secondDiv}>
            <div className={classes.grandTotalDiv}>
              <Typography className={classes.view2}>₹ {Utils.CommonFunctions.addCommaToAmount(totalAmount)}</Typography>
              <Typography
                className={classes.grandHeading}
                onClick={(e: any) => handleChange(e)}
              >
                View Details
              </Typography>
            </div>
            <div className={classes.checkOutBtn}>
              <CustomButton
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                text={btnText}
                onClick={onSubmit}
                disabled={proceedToPay}
              />
            </div>
          </div>
        </>
      </Hidden>
    </>
  );
};

export default PaymentSummary;
