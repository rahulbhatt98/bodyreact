import React from "react";

import {
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@material-ui/core";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    formLabel: {
      fontSize: "1rem",
      lineHeight: "1.81",
      color: "rgba(99, 118, 150, 0.5)",
      marginBottom: "0",
      [theme.breakpoints.down("xs")]: {
        font: `normal  ${theme.spacing(
          1.3
        )}px Work Sans Medium !important`,
      }

    },
    cardLabel: {
      position: "absolute",
      top: "9px",
      fontSize: "1rem",
      lineHeight: "1.81",
      color: "rgba(99, 118, 150, 0.5)",
      marginBottom: "0",
      paddingLeft: "8px",
      [theme.breakpoints.down("md")]: {
        paddingLeft: "unset",
      },
    },
    formControl: {
      // margin: theme.spacing(2),
      width: "100%",
      [theme.breakpoints.down("md")]: {
        margin: "16px 0",
      },
      "& .MuiFormLabel-root .Mui-Focused": {
        color: "rgba(99, 118, 150, 0.5) !important",
      },
    },
    required: {
      color: "red",
    },
    walletOption: {
      flexDirection: "row",
    },
    labelClass: {
      // color: "rgba(99, 118, 150, 0.5) !important",
      fontSize: "14px",
      lineHeight: 1.5,
      color: "var(--secondary-black)",
      height: theme.spacing(2),
      fontWeight: 500,
      [theme.breakpoints.down("xs")]: {
        font: `normal  ${theme.spacing(
          1.4
        )}px Work Sans SemiBold !important`,
      }

    },
  })
);
interface Props {
  history?: any;
  data?: any;
  label?: any;
  value?: any;
  onSelect?: any;
  isSaveCard?: any;
  isCustomClass?: any;
  isDisabled?: any;
  isRequired?: any;
}
export default function CustomRadioGroup({
  history,
  data,
  label,
  value,
  onSelect,
  isSaveCard,
  isCustomClass = false,
  isDisabled = false,
  isRequired = false,
}: // isDisabled = false,
  Props) {
  const classes = styles();

  return (
    <FormControl
      component="fieldset"
      className={classes.formControl}
      disabled={isDisabled}
    >
      <FormLabel className={isSaveCard ? classes.cardLabel : classes.formLabel}>
        <span className={classes.labelClass}>{label}</span>
        {isRequired ? <span className={classes.required}>*</span> : ""}
      </FormLabel>
      <RadioGroup
        name={label}
        value={value}
        onChange={(event: any) => onSelect(event)}
        className={`${isCustomClass ? classes.walletOption : ""}`}
      >
        {data}
      </RadioGroup>
    </FormControl>
  );
}
