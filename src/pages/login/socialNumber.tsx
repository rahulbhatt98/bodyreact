import {
    makeStyles,
    createStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import React from "react"
// import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { showLoader, hideLoader } from "../home/actions"
import request from "../../utils/request"
import { useTranslation } from "react-i18next";
import _ from "lodash"


/**
 * Modals
 */
import { ReducersModal } from "../../models";
/**
 * components
 */
import Otp from "../../components/common/otp"
import InputField from "../../components/common/inputField";
import CustomButton from "../../components/common/button";

// ** icons and images **
import Utils from "../../utils";
import { getAuthToken, isAuthenticated } from "../../utils/session";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loginRoot: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            padding: theme.spacing(0, 2),
            [theme.breakpoints.down("xs")]: {
                minHeight: "100vh",
                padding: theme.spacing(2),
            },
        },
        boxShadowDiv: {
            margin: theme.spacing(6, 0),
            padding: theme.spacing(3, 15),
            boxShadow: "var(--box-shadow-div)",
            display: "flex",
            // width: "35%",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "var(--white)",
            borderRadius: 3,
            [theme.breakpoints.down("xs")]: {
                boxShadow: "none",
                padding: 0,
                backgroundColor: "var( --backgroun-color)",
            },
        },
        heading: {
            color: "var(--black)",
            [theme.breakpoints.down("xs")]: {
                fontSize: 22,
            },
        },
        subheading: {
            color: "var(--black)",
            margin: theme.spacing(0.5, 0, 1.5),
            textAlign: "center",
            [theme.breakpoints.down("xs")]: {
                fontSize: 14,
            },
        },
        btnAndInputDiv: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // width: "100%",
            width: theme.spacing(36),
        },
        prefixContent: {
            width: '20%',
            textAlign: 'center',
            border: 'none',
            borderRight: '1px solid #E2E2E2',
            backgroundColor: 'white',
            font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
                1.4
            )}px Work Sans`,
        },

    })
);

function SocialNumber(props: any) {
    const { t } = useTranslation();
    const header = Utils.CommonFunctions.getApiAuthHeader()
    const authToken = !isAuthenticated() && getAuthToken() ? getAuthToken() : ""

    // const { setFieldValue } = useFormikContext()

    React.useEffect(() => {
        if (loginReducer.socialId === "") {
            history.push(Utils.routes.LOGIN_OTP)
        }
    }, [])

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { otpVia, type, OTP, email, mobileNo, countryCode } = useSelector((state: ReducersModal) => state.otpReducer)
    const loginReducer = useSelector((state: ReducersModal) => state.loginReducer)
    const [OtpData, setOtpData] = React.useState({})

    const LoginSchema = Yup.object().shape({
        login: Yup.string().required('Please enter mobile number').matches(Utils.regex.onlyNumberRegex, { message: "Please enter valid mobile number" }),
    });

    const checkUser = (values: any, resetForm?: Function) => {

        let data: any = { type: "mobile", mobileNo: values.login, countryCode: Utils.constants.countryCode }
        // let data = Utils.regex.emailRegex.test(values.login) ? { type: "email", email: values.login }:{ type: "mobile", mobileNo: values.login, countryCode: Utils.constants.countryCode }

        dispatch(showLoader())

        request.post(Utils.endPoints.CHECK_USER, data, header).then((resp) => {

            dispatch(hideLoader())
            if (resp.data.statusCode !== Utils.statusCode.USER_NOT_EXIST) {
                dispatch({
                    type: "show-alert", payload: {
                        type: "error",
                        message: `This mobile is already linked with ${resp.data.data?.email}`
                    }
                })
            } else {
                dispatch({ type: "check-user", payload: { ...resp.data.data, ...data, responseCode: resp.data.statusCode } });
                dispatch({ type: "login", payload: resp.data.data })
                sendOtp(data)
            }
        }).catch((err) => {
            dispatch(hideLoader())
            if (err?.response?.data?.message)
                dispatch({
                    type: "show-alert", payload: {
                        type: "error",
                        message: err.response.data.message
                    }
                })
        })
    }

    const sendOtp = (values: any) => {
        dispatch(showLoader())

        let OtpSendData = { ...values, otpVia: values.type, type: "signup" }
        request.post(Utils.endPoints.RESEND_OTP, OtpSendData, header).then((resp) => {
            dispatch(hideLoader())
            dispatch({ type: "send-otp", payload: { ...OtpSendData } })
            setOtpData(OtpSendData)

        }).catch((err) => {
            dispatch(hideLoader())
            if (err?.response?.data?.message)
                dispatch({
                    type: "show-alert", payload: {
                        type: "error",
                        message: err.response.data.message
                    }
                })
        })
    }

    const verifyOpt = () => {
        request.post(Utils.endPoints.VERIFY_OTP, { otpVia, type, OTP, email, mobileNo, countryCode, guestToken: authToken }, header).then((resp) => {
            if (resp) {
                dispatch({ type: "verify-otp", payload: { ...OtpData } })
                dispatch({ type: "hide-otp" })
                history.push("/sign-up")
            }
        }).catch((err) => {
            if (err?.response?.data?.message)
                dispatch({
                    type: "show-alert", payload: {
                        type: "error",
                        message: err.response.data.message
                    }
                })
            // setOtpError(err.response.data.message)
        })
    }

    const onClose = () => {
    }

    return (
        <div className={classes.loginRoot}>
            <Otp verifyOpt={verifyOpt} onClose={onClose} />
            <div className={classes.boxShadowDiv}>
                <Typography variant="h3" className={classes.heading}>
                    {"Welcome!"}

                </Typography>
                <Typography variant="h5" className={classes.subheading}>
                    {"Please Enter Your Mobile Number"}

                </Typography>
                <div className={classes.btnAndInputDiv}>
                    <Formik
                        initialValues={{
                            login: "",
                            socialTrial: false
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={(values, { resetForm }) => {
                            checkUser(values, resetForm)
                            // dispatch(onSubmitContactus(values, setSubmitting, history, true));
                        }}

                    >
                        {({ values, errors, touched, isSubmitting }) => {
                            return (
                                <Form>
                                    <InputField
                                        label={t("mobile")}
                                        placeHolder={t("mobile")}
                                        id="name"
                                        name="login"
                                        type="text"
                                        touched={touched}
                                        errors={errors}
                                        value={values.login}
                                        maxLength={10}
                                        isRequired={true}
                                        prefixContent={<input className={classes.prefixContent} disabled defaultValue={'+91'} />}


                                    />
                                    <CustomButton
                                        type="submit"
                                        color="primary"
                                        fullWidth
                                        variant="contained"
                                        disabled={!_.isEmpty(errors) || _.isEmpty(values.login)}
                                        text={t("proceed")}
                                    />

                                </Form>
                            )
                        }
                        }
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default SocialNumber;