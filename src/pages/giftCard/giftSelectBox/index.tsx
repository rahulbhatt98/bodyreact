import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
  Stepper,
  Step,
  Button,
  StepLabel,
  StepConnector,
  withStyles,
} from "@material-ui/core";
import { useState ,useEffect, useRef} from "react";
import React from "react";
import Address from "../../address";
import Summary from "../sendGiftCard/summary";
import BreadCrumb from "../../../components/breadCrumb";
import SelectBox from "./selectBox";
import SelectProduct from "./selectProduct";
import Message from "./message";
import { StepIconProps } from "@material-ui/core/StepIcon";
import FixedBottomPanel from "./fixedBottomPanel";

// const GreenRadio = withStyles({
//   root: {
//     color: "var(--main-opacity)",
//     "&$checked": {
//       color: "var(--main-opacity)",
//     },
//     height: "20px",
//     width: "20px",
//   },
//   checked: {},
// })((props: any) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    shoppingBagsRoot: {
      padding: theme.spacing(0, 2),
      backgroundColor: "var(--white)",
    },
    maxWidthDiv: {
      margin: theme.spacing(0, "auto"),
      maxWidth: "var(--max-width)",
    },
    shoppingDiv: {
      padding: theme.spacing(2.5, 0),
    },
    stepperDiv: {
      borderTop: "1px solid var(--text-color)",
      borderBottom: "1px solid var(--text-color)",
      padding: theme.spacing(1.5, 0),
    },
    stepper: {
      padding: 0,
      [theme.breakpoints.down("xs")]: {
        "& .MuiTypography-body2": {
          fontSize: "13px",
          height: "45px",
        },
        "& .MuiStepConnector-line": {
          marginTop: "25px",
        },
      },
    },
    stepLabel: {
      "&.MuiStepLabel-alternativeLabel": {
        flexDirection: "column-reverse",
      },
      "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
        margin: 0,
      },
    },
    productWeight: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )}px Work Sans`,
      color: "var(--light-gray)",
      marginTop: "6px",
    },

    amount: {
      textAlign: "right",
    },
    quantity: {
      margin: theme.spacing(0, 1),
    },
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
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
      marginBottom: theme.spacing(2),
      fontWeight: 700,
    },
    reuseDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing(2),
    },
    reuseHeading: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--secondary-black)",
      display: "flex",
      alignItems: "center",
    },
    discountIcon: {
      color: "var(--main-opacity)",
      marginLeft: 0.5,
    },
    view: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--main-opacity)",
    },
    grandTotalDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    grandTotal: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      color: "var(--secondary-black)",
    },
    btnDiv: {
      width: "15%",
      float: "right",
      [theme.breakpoints.down("xs")]: {
        width: "40%",
      },
    },
    saveBagBtn: {
      borderRadius: 4,
      font: `normal 600 ${theme.spacing(1.4)}px Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(1.5, 0),
      flexBasis: "47%",
    },
    checkOutBtn: {
      borderRadius: 2,
      font: `normal 700 ${theme.spacing(1.6)}px Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(1.5, 0),
      marginTop: theme.spacing(1.5),
      width: "100%",
    },
    breadcrumb: {
      font: `normal 500 ${theme.spacing(1.4)}px Work Sans`,
      marginTop: "25px",
    },
    noItemsCard: {
      textAlign: "center",
      padding: "30px",
      marginBottom: "15px",
    },
    noItemContent: {
      display: "flex",
      alignItems: "center",
      marginTop: "20px",
      marginBottom: "15px",
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      lineHeight: "18px",
      letterSpacing: "0.02em",
      color: "var(--black)",
    },
    subHeading: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: "var(--light-gray)",
      marginLeft: theme.spacing(1),
    },
    btnContainer: {
      //   display: "flex",
      justifyContent: "space-between",
    },
    imgDiv: {
      width: "100%",
      height: "auto",
    },
    giftBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50%",
      [theme.breakpoints.down("sm")]: {
        height: "200px",
      },
      [theme.breakpoints.down("xs")]: {
        height: "180px",
      },
    },
    imgBox: {
      position: "absolute",
      width: "20%",
      height: "auto",
      [theme.breakpoints.down(1500)]: {
        width: "27%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "40%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "85%",
      },
    },
    range: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.2
      )}px Work Sans`,
      lineHeight: "38px",
      color: "var(--white)",
      position: "relative",
    },
    rangeAmount: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "16px",
      color: "var(--white)",
      position: "relative",
    },
    radioButton: {
      transition: "none",
      "&:hover": { backgroundColor: "white" },
      width: "14px",
      height: "14px",
    },
    optionTitle: {
      font: `normal  ${theme.spacing(1.6)}px Work Sans`,
      fontWeight: 600,
      lineHeight: "19px",
      letterSpacing: "-0.333333px",
      color: "var(--black300)",
      margin: theme.spacing(0, 1),
    },

    option: {
      display: "flex",
    },
    optionContainer: {
      background: "var(--white)",
      border: " 1px solid var(--border-color)",
      boxSizing: "border-box",
      borderRadius: "4px",
      padding: theme.spacing(2),
      display: "flex",
      height: "75px",
      alignItems: "center",
      justifyContent: "space-between",
    },
    externalDiv: {
      margin: theme.spacing(2, 0),
    },
    button: {
      background: "var(--main-opacity) !important",
      border: "1px solid var(--main-opacity) !important",
      boxSizing: "border-box",
      borderRadius: "4px",
      color: "var(--white)",
      font: `normal  ${theme.spacing(1.4)}px Work Sans`,
      fontWeight: 600,
      lineHeight: "16px",
      padding: theme.spacing(1.2),
      margin: theme.spacing(1, 0),
      width: "96%",
    },
  })
);

const useStylesStepIcon = makeStyles((theme: Theme) =>
  createStyles({
    stepIcon: {
      // width: 8,
      // height: 8,
      display: "flex",
      placeItems: "center",
      padding: "4px",
      borderRadius: "50%",
      backgroundColor: "var(--stepper-color)",
      zIndex: 20,
    },
    secondStep: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      backgroundColor: "#d6ce4b",
      marginTop: theme.spacing(0.1),
    },
    activeRoot: {
      backgroundColor: "#d6ce4b",
      width: "5px",
      height: "5px",
      borderRadius: "50%",
    },
  })
);

function StepIcon(props: StepIconProps) {
  const classes = useStylesStepIcon();
  const { active, completed } = props;
  return (
    <>
      {completed || active ? (
        <div className={classes.stepIcon}>
          <div className={classes.activeRoot} />
        </div>
      ) : (
        <div className={classes.secondStep}></div>
      )}
    </>
  );
}

const Connector = withStyles({
  alternativeLabel: {
    top: 26,
    left: "calc(-47%)",
    right: "calc(52%)",
  },
  active: {
    "& $line": {
      borderColor: "var(--stepper-color)",
    },
  },
  completed: {
    "& $line": {
      borderColor: "var(--stepper-color)",
    },
  },
  line: {
    borderColor: "var(--light-green)",
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

const GiftSelectBox: React.FC<any> = (props: any) => {
  const [activeStep, setActiveStep] = React.useState(0);
  // const [deliveryStatus, setDeliveryStatus] = useState("bundled");
  const [selectedType, setSelectedType] = useState("free");
  const [details, setDetails] = useState<any>({});
  const formRef: any = useRef();


  const [checkoutAddressId, setCheckoutAddressId] = useState<string | null>(
    null
  );
  // const [selectedAddress, setSelectedAddress] = React.useState("homeAddress");
  const classes = useStyles();
  const setCheckoutData = (id: string | null) => {
    setCheckoutAddressId(id);
  };

  useEffect(() => {
    //@ts-ignore
   zE('webWidget', 'updateSettings', {
     webWidget: {
       offset: {
         horizontal: "0px",
         vertical: "70px",
       },
     }
   });
   return ()=> {
     //@ts-ignore
     zE('webWidget', 'updateSettings', {
       webWidget: {
         offset: {
           horizontal: "0px",
           vertical: "0px",
         },
       }
     });
   }
 }, []);

  const handleNext = () => {
    if (
      ((activeStep === 1
        //  && selectedAddress
         ) || activeStep !== 1) &&
      activeStep < 4
    )
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const reuseAmount = (heading: string, amount: string) => {
  //   return (
  //     <div className={classes.reuseDiv}>
  //       <Typography className={classes.reuseHeading}>{heading}</Typography>
  //       <Typography className={classes.reuseHeading}>{amount}</Typography>
  //     </div>
  //   );
  // };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <SelectBox
            setSelectedType={setSelectedType}
            selectedType={selectedType}
          />
          // <SelectBoxSkeleton/>
        );
        break;
      case 1:
        return <SelectProduct flag={selectedType} />;
        break;
      case 2:
        return (
          <Message
            details={details}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setDetails={setDetails}
            formRef={formRef}
          />
        );
        break;
      case 3:
        return (
          <Address
          section="gift"
          addressTitle={"Delivery Option"}
            checkoutAddressId={checkoutAddressId ? checkoutAddressId : null}
            setCheckoutAddressId={setCheckoutData}
          />
        );
        break;
      case 4:
        return (
          <Summary
            donationAmount={0}
            setDonationAmount={() => {}}
            details={{}}
            deliveryDetails={{}}
            selectedAmount={null}
            selectedDesign={() => {}}
          />
        );
        break;
      default:
        return <SelectBox />;
        break;
    }
  };
  const getPageName = () => {
    if (activeStep === 0) return "Select Box";
    else if (activeStep === 1) return "Select Product";
    else if (activeStep === 2) return "Message";
    else if (activeStep === 3) return "Delivery";
    else if (activeStep === 4) return "Payment";
  };

  const handleBack = () => {
      if(activeStep === 1){
        setActiveStep((prevActiveStep: any) => prevActiveStep - 1);      }
  }

  return (
    <div className={classes.shoppingBagsRoot}>
      <div className={classes.maxWidthDiv}>
        <Grid container >
          <Grid item xs={12} md={12}>
            <div className={classes.breadcrumb}>
              <BreadCrumb
                breadcrumb={[
                  { title: "Home", action: "/" },
                  { title: getPageName(), action: "/gift-select-box" },
                ]}
              />
            </div>
          </Grid>

          <Grid item xs={12} md={12}>
            <div className={classes.shoppingDiv}>
              <div className={classes.stepperDiv}>
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  className={classes.stepper}
                  connector={<Connector />}
                >
                  {[
                    "Select Box",
                    "Select Product",
                    "Message",
                    "Delivery",
                    "Payment",
                    
                  ].map((item, index) => (
                    <Step key={index}>
                      <StepLabel
                        StepIconComponent={StepIcon}
                        className={classes.stepLabel}
                      >
                        {item}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>

              

              <div>{getStepContent(activeStep)}</div>
              <FixedBottomPanel activeStep={activeStep} setActiveStep={setActiveStep}  />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default GiftSelectBox;
