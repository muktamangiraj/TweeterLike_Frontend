const validator = require("validator");
const isEmpty = require("is-empty");

//For User validation

const ForgotPasswordValidation = data =>{
    let errors = {};

    if (validator.isEmpty(data.Email)) {
        errors.Email = "Email is required";
    }else if (! validator.isEmail(data.Email)) {
        errors.Email = "Email is not invalid";
    }
    return { errors, isValid: isEmpty(errors) };

}
module.exports = ForgotPasswordValidation;
