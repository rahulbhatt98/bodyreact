const regex = {
    passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9!_@./#&+-\d]{8,}$/,
    // onlyNumberRegex: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*._\b)$/,
    onlyNumberRegex: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    emailRegex:  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    mobileOrEmail: /^(?:\d{10}|\w+.+\w+@\w+\.\w{2,63})$/,
    fullName:/^[a-zA-Z]*(?: [a-zA-Z]+)*$/,
    fullNameWithSpaces:/^[a-zA-Z]*[ ]*[a-zA-Z ]*$/,
    vpaRegex:/^.+@.+$/
    // fullName:/^[a-zA-Z]*(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$/
}

export default regex