import {
  createStyles,
  Theme,
  makeStyles,
  Typography,
  Slider,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Hidden,
} from "@material-ui/core";
import Utils from "../../../utils";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // margin: theme.spacing(2.5, 0),
      padding: theme.spacing(2.5, 0.5),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0),
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Recoleta Alt`,
      lineHeight: "33px",
      letterSpacing: "0.02em",
      color: "var(--secondary-black)",
      margin: theme.spacing(1.2, 0),
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
    subHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.2
      )}px Work Sans`,
      lineHeight: "38px",
      letterSpacing: "0.02em",
      color: "#40857E",
      margin: theme.spacing(1.2, 0),
      [theme.breakpoints.down("xs")]:{
        textAlign: "center",
      }
    },
    slider: {
      background: "#D6CC5F",
      color: "#D6CC5F",
      borderRadius: theme.spacing(1),
      height: "6px",
      padding: theme.spacing(0, 0),
      "& .MuiSlider-mark": {
        background: "#C5BA3E",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        marginTop: "-1px",
      },
      "& .MuiSlider-thumb.MuiSlider-active": {
        background: "#c5ba3e",
        border: "5.5px solid var(--main-opacity)",
        boxSizing: "border-box",
      },
      "& .MuiSlider-thumb": {
        background: "#c5ba3e",
        border: "5.5px solid var(--main-opacity)",
        boxSizing: "border-box",
        width: "16px",
        height: "16px",
      },
      "& .MuiSlider-markLabel": {
        display: "none",
      },
    },
    title: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.3
      )}px Work Sans`,
      color: "var(--light-gray)",
    },
    outerDiv: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(1, 0),
    },
    divider: {
      border: "1px solid #F2F2F2",
      margin: theme.spacing(2.5, 0),
    },
    Subheading: {
      font: `normal ${theme.spacing(1.5)}px Work Sans`,
      fontWeight: 600,
      lineHeight: "18px",
      color: "var(--secondary-black)",
      margin: theme.spacing(1),
     
    },
    subText:{
      font: `normal ${theme.spacing(1.2)}px Work Sans`,
      fontWeight: 400,
      color: "var(--secondary-black)",
      margin: theme.spacing(0.5, 0),
      textAlign: "center"
    },
    summary: {
      font: `normal ${theme.spacing(1.6)}px Work Sans`,
      lineHeight: "26px",
      color: "var(--light-gray)",
    },
    noMargin: {
      marginTop: "-2px",
    },
    skeletonView: {
      padding: theme.spacing(4),
    },
    skeletonView2: {
      padding: theme.spacing(8),
    },
  })
);

// function numFormatter(num: any) {
//   if (num > 999 && num < 1000000) {
//     return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
//   } else if (num >= 1000000) {
//     return (num / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
//   } else if (num < 900) {
//     return num; // if value < 1000, nothing to do
//   }
// }
interface Props {
  selectedDesign: any;
  setSelectedAmount: Function;
  selectedAmount: any;
  setDonationAmount: Function;
}
const EnterValue: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [allowOpenAmount, setAllowOpenAmount] = useState("1");
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [stepValue, setStepValue] = useState(0);
  const [followersMarks, setMarks] = useState<any>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let allowOpenAmountVal =
      _.find(props.selectedDesign.customAttributes, {
        attribute_code: "allow_open_amount",
      })?.value || "1";
    let minAmount =
      allowOpenAmountVal === "1"
        ? _.find(props.selectedDesign.customAttributes, {
          attribute_code: "open_amount_min",
        })?.value
        : allowOpenAmountVal === "0"
          ? props?.selectedDesign?.giftcard_amounts?.[0]
          : 0;
    let maxAmount =
      allowOpenAmountVal === "1"
        ? _.find(props.selectedDesign.customAttributes, {
          attribute_code: "open_amount_max",
        })?.value
        : allowOpenAmountVal === "0"
          ? props?.selectedDesign?.giftcard_amounts?.[
          props?.selectedDesign?.giftcard_amounts?.length - 1
          ]
          : 0;

    setAllowOpenAmount(allowOpenAmountVal);
    if (allowOpenAmountVal === "1") {
      let stepVal =
        _.find(props.selectedDesign.customAttributes, {
          attribute_code: "gift_amount_interval",
        })?.value || "0";
      if (stepVal) setStepValue(Number(stepVal));
      setMinAmount(minAmount);
      setMaxAmount(maxAmount);
      props.setSelectedAmount(props.selectedAmount || Number(minAmount));
      setValue(props.selectedAmount || minAmount);
    } else if (allowOpenAmountVal === "0") {
      let giftCardAmounts =
        _.find(props.selectedDesign.customAttributes, {
          attribute_code: "giftcard_amounts",
        })?.value?.split(",") || [];
      const marks = giftCardAmounts.map((amount: any) => {
        const obj = {
          value: Number(amount),
          label: Number(amount),
        };
        return obj;
      });
      setMinAmount(marks[0]?.label);
      setMaxAmount(marks[marks.length - 1]?.label);
      setValue(marks[0]?.label);
      props.setSelectedAmount(marks[0]?.label ? Number(marks[0]?.label) : 0);
      setMarks(marks);
    }
  }, []);

  const handleChange = (event: any, changedValue: any) => {
    setValue(changedValue);
    props.setSelectedAmount(Number(changedValue));
    props.setDonationAmount(0);
  };
  let termsAndConditions =
    _.find(props.selectedDesign.customAttributes, {
      attribute_code: "gift_card_terms_conditions",
    })?.value || "";


  return (
    <>
      <div className={classes.root}>
        <Typography className={classes.heading}>
          Enter Value of your E-Gift Card
        </Typography>
        <div>

          <Typography className={classes.subHeading}>₹ {Utils.CommonFunctions.addCommaToAmount(value)}</Typography>
          <Hidden smUp>
          <Typography className={classes.subText}>Total Amount</Typography>

            </Hidden>
        </div>

        <div>
          {allowOpenAmount === "1" ? (
            <Slider
              value={value}
              min={minAmount ? Number(minAmount) : 0}
              step={stepValue || 10}
              max={maxAmount ? Number(maxAmount) : 0}
              className={classes.slider}
              // valueLabelFormat={numFormatter}
              marks
              // ={followersMarks}
              // scale={scale}
              onChange={handleChange}
              valueLabelDisplay="off"
              aria-labelledby="non-linear-slider"
            />
          ) : (
            // <Box sx={{ width: '100%' }}>
            <Slider
              aria-label="Restricted values"
              value={value}
              min={minAmount}
              step={null}
              max={maxAmount}
              className={classes.slider}
              marks={followersMarks}
              onChange={handleChange}
              valueLabelDisplay="off"
            />
          )}
        </div>

        <div
          className={
            allowOpenAmount === "0"
              ? clsx(classes.outerDiv, classes.noMargin)
              : classes.outerDiv
          }
        >
          <Typography className={classes.title}>
            Min. amount ₹{Utils.CommonFunctions.addCommaToAmount(minAmount) || 0}
          </Typography>
          <Typography className={classes.title}>
            Max. amount ₹{Utils.CommonFunctions.addCommaToAmount(maxAmount) || 0}
          </Typography>
        </div>
        <Divider className={classes.divider} />

        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<img src={Utils.images.DOWN_ARROW} alt="icon" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <img src={Utils.images.DOCS} alt="docs" />
              <Typography className={classes.Subheading}>
                Terms and conditions
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                className={classes.summary}
                dangerouslySetInnerHTML={{ __html: termsAndConditions }}
              ></div>
            </AccordionDetails>
          </Accordion>
        </div>
        <Divider className={classes.divider} />
      </div>
    </>
  );
};
export default EnterValue;
