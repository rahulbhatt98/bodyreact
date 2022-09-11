import * as Yup from 'yup';
import Utils from '../utils';
//@ts-ignore
import mapValues from 'lodash/mapValues';
//@ts-ignore

/**
 * @description
 * @param t language
 */
const LoginSchema = (t: any) =>
  Yup.object().shape({
    email: Yup.string()
      .trim()
      .email(t('EMAIL_NOT_VALID'))
      .required(t('EMAIL_REQUIRED_PLEASE')),
    password: Yup.string()
      .min(8, t('MUST_GREAT_EIGHT'))
      .required(t('PASSWORD_REQUIRED'))
      .matches(/^\S*$/, t('BLANK_SPACE')),
    // rememberMe: Yup.bool().oneOf([true], "Remember me required"),
    recaptcha: Yup.string().nullable().required(t('CAPTCHA_REQ')),
  });

const EmailOrMobileSchema = () =>
  Yup.lazy((obj: {}) =>
    Yup.object(
      mapValues(obj, (value: any, key: any) => {
        if (key === 'login') {
          let yup = Yup.string().required('Please enter email or mobile number')
          if (!Utils.regex.onlyNumberRegex.test(value)) {
            yup.matches(Utils.regex.emailRegex, { message: "Please enter valid email" })

          } else {
            yup.matches(Utils.regex.onlyNumberRegex, { message: "Please enter valid mobile number" })
          }

          return yup
          // return Yup.string()
          //     .email("EMAIL_NOT_VALID")
          //     .trim()
          //     .required('EMAIL_REQUIRED');
          // .required(t("VALIDATIONS.EMAIL_REQUIRED"));
        }

      })
    )
  );
const Schema = {
  LoginSchema,
  EmailOrMobileSchema,

};

export default Schema;
