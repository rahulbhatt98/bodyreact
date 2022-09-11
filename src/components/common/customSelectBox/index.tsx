import { makeStyles } from "@material-ui/core/styles";
import {
  createStyles,
  Theme,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )}px Work Sans`,
      lineHeight: "15px",
      color: "var(--secondary-black)",
      opacity: "0.9",
      letterSpacing: "0.02em",
      textTransform: "capitalize",
      margin: theme.spacing(2, 0, 1, 0),
    },
    selectBox: {
      border: "1px solid var(--border-color)",
      background: "#ffffff",
      "& .MuiSelect-selectMenu": {
        minHeight: "2.5em",
        display: "flex",
        alignItems: "center",
        paddingLeft: "12px",
      },
      "& .MuiInput-underline:after": {
        borderBottom: "none !important",
      },
      "& .MuiInput-underline:before": {
        borderBottom: "none !important",
      },
    },
  })
);

export default function CustomSelectBox(props: any) {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState(null);

  const fieldValue = (e: any) => {
    const value = e.target.value;
    setSelectedValue(value);
  };
  const options = props.option || [];
  // options.push({ value: 'Select', label: 'Select' })
  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        {props.label}
      </Typography>
      <FormControl fullWidth>
        <Select
          label={props.Label}
          id={props.id}
          name={props.label}
          className={classes.selectBox}
          // as={"select"}
          value={props?.value || "select"}
          placeHolder={props?.placeholder}
          onChange={fieldValue}
          defaultValue={props?.defaultValue }
          {...props}
        >
          {options?.map((item: any) => (
            // <MenuItem key={item.key} value={item.key}>
            //   {item.label !== "" ? item.label : "Select"}
            // </MenuItem>
            <MenuItem disabled={item?.key === "select" ? true : false} value={item?.key} key={item.key}>{item?.label}</MenuItem>

          ))}
        </Select>
      </FormControl>
    </div>
  );
}