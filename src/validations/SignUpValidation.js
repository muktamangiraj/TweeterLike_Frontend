const validator = require("validator");
const isEmpty = require("is-empty");


//For User validation

const SignUpValidation = data =>{
    let errors = {};

    if (validator.isEmpty(data.Name)) {
        errors.Name = "Name is required";
    }

    if (validator.isEmpty(data.Email)) {
        errors.Email = "Email is required";
    }else if (! validator.isEmail(data.Email)) {
        errors.Email = "Email is invalid";
    }

    if(validator.isEmpty(data.Password)){
        errors.Password = "Password is required"
    }

    if(validator.isEmpty(data.ConfirmPassword)){
        errors.ConfirmPassword = "ConfirmPassword is required"
    }

    return { errors, isValid: isEmpty(errors) };

}
module.exports = SignUpValidation;
