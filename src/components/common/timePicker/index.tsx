// import React, { useState } from "react";
import { makeStyles, createStyles, Theme, FormLabel, Typography } from "@material-ui/core";
import { KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useField, useFormikContext } from "formik";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputformControl: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    formLabel: {
      fontSize: "14px",
      lineHeight: 1.5,
      color: "var(--secondary-black)",
      height: theme.spacing(2),
    },
    required: {
      color: '#f44336',
      fontSize: '15px'
    },
    error:{
      color: '#f44336',
      fontFamily: 'Work Sans',
      fontSize: '13px'
    },
    picker: {
      marginTop: 7,
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        border: "1px solid var(--border-color)",
      },
      "& .MuiInputBase-root ": {
        font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
          1.4
        )}px Work Sans`,
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: 0,
      },
    },
  })
);

const SimpleTimePicker = ({ ...props }: any) => {
  const classes = useStyles();
  // const [selectedDate, handleDateChange] = useState<any>(new Date());
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <div className={classes.inputformControl}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormLabel className={classes.formLabel}>
          {props.formLabel}<span className={classes.required}>{props.isRequired ? '*' : ''}</span>
        </FormLabel>

        <KeyboardTimePicker
          minDate={props.minDate}
          inputVariant="outlined"
          id={props.id}
          placeholder={props?.placeHolder ?? ''}
          ampm={true}
          {...field}
          value={props?.value ?? new Date()}
          onChange={(date) => {
            setFieldValue(field.name, date);
            if (date) {
              var futureDate = new Date(new Date().getTime() + (10 * 60000));
              if (props?.value && date.getMinutes() < futureDate.getMinutes() && date.getHours() <= futureDate.getHours() && date.getDate() === futureDate.getDate()) {
                if (props?.setError)
                  props.setError(`Date cannot be less than ${futureDate.getHours()}:${futureDate.getMinutes()}`)
              }
              else
                props.setError('')
            }
          }}
          format="hh:mm"
          className={classes.picker}
          {...props}
        />
        {props?.error && <Typography className={classes.error}>{props.error}</Typography>}
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default SimpleTimePicker;