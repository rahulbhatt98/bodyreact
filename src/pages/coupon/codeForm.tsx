import React, { useEffect } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/common/inputField";
import CustomButton from "../../components/common/button";
import { useDispatch, useSelector } from "react-redux";
import { validateCoupon } from "./action";
import { useHistory } from "react-router";
import { ReducersModal } from "../../models";
import events from "../../utils/event/constant";
import { screenViewed } from "../../utils/event/action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      background: "var(--medium-creame-color)",
      border: "1px solid var(--text-color)",
      boxSizing: "border-box",
      borderRadius: "4px",
      padding: theme.spacing(0, 2, 2, 2),
    },

    title: {
      font: "normal 600 16px Work Sans",
      color: "var(--secondary-black)",
      marginTop: "18px",
    },
    inputWidth: {
      width: "100%",
      height: "50px",
      [theme.breakpoints.down("xs")]: {
        "& .MuiGrid-spacing-xs-2 > .MuiGrid-item": {
          padding: theme.spacing(0),
        },
      },
    },

    btn: {
      marginTop: theme.spacing(1.2),
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing(0),
        "& .MuiButton-root": {
          marginTop: theme.spacing(0),
        }
      },
    },

    gridContainer: {
      marginTop: "10px",

    },
  })
);

function CodeForm() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()

  const cart = useSelector((state: ReducersModal) => {
    return state.shoppingBagReducer;
  });

  const initialValues = {
    couponCode: "",
  };
  const codeSchema = Yup.object().shape({
    couponCode: Yup.string()
      .required("Please enter code number")
  });
  useEffect(() => {
    screenViewed({
      ScreenName: events.SCREEN_COUPON,
      CTGenerated: "WEB",
    });
  }, []);
  return (
    <div className={classes.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={codeSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true)
          dispatch(validateCoupon({
            ...values,
            cartId: cart._id,
          }, history))
        }}
      >
        {({ values, errors, touched, isSubmitting, validateForm }) => {
          return (
            <Form autoComplete="off">

              <Grid container className={classes.gridContainer} spacing={1}>
                <Grid item xs={12} md={10}>
                  <InputField
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={"Enter Coupon Code"}
                    placeHolder={"Enter Coupon Code here"}
                    id="couponCode"
                    name="couponCode"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values.couponCode}
                    isRequired={false}
                  />
                </Grid>
                <Grid item xs={12} md={2} className={classes.btn}>
                  <CustomButton
                    fullWidth
                    text={"apply"}
                    type={"submit"}
                    variant="contained"
                    disabled={errors?.couponCode ? true : false}
                  />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
export default CodeForm;
