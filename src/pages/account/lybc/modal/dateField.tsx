import {
  Grid,
  createStyles,
  makeStyles,
  Theme,
  // withStyles,
  // Typography,
  // Radio,
} from "@material-ui/core";
// import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Utils from "../../../../utils";
import CustomCalender from "../../../../components/common/calendar";
// import { date } from "yup/lib/locale";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2.5, 0),
    },
  })
);

const DateField = () => {
  const classes = useStyles();

  const DeliverySchema = Yup.object().shape({
    date: Yup.string().required("Please enter date"),
    fromDate: Yup.string().required("Please enter date"),
  });

  
  let maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);
  const initialDate = new Date();
  const futureDate = new Date(initialDate.getTime() + 10 * 60000);

  return (
    <>
      <div className={classes.root}>
        <Formik
          initialValues={{
            fromDate: futureDate,
            date: initialDate,
          }}
          validationSchema={DeliverySchema}
          onSubmit={(values, { setSubmitting }) => {}}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldTouched,
            setFieldValue,
          }) => {
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <CustomCalender
                      isRequired={""}
                      minDate={new Date()}
                      maxDate={maxDate}
                      id={"date"}
                      name={"date"}
                      value={values.date || new Date()}
                      formLabel={"To Date"}
                      placeholder={"Date"}
                      icon={<img src={Utils.images.DATE_ICON} alt="date" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <CustomCalender
                      isRequired={""}
                      minDate={new Date()}
                      maxDate={maxDate}
                      id={"fromDate"}
                      name={"fromDate"}
                      value={values.date || new Date()}
                      formLabel={"From Date"}
                      placeholder={"Date"}
                      icon={<img src={Utils.images.DATE_ICON} alt="date" />}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default DateField;
