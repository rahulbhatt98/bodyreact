import regex from './regex';

const validateEmail = (email: string) => {
  if (!email) {
    return 'please enter email';
  } else {
    return regex.emailRegex.test(email) ? '' : 'please enter valid email';
  }
};

const Validators = {
  validateEmail: validateEmail,
};

export default Validators;
