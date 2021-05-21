const validator = require("validator");
const isEmpty = require("is-empty");


//For User validation

const SignUpValidation = data =>{
    let errors = {};

    if (validator.isEmpty(data.Name)) {
        errors.Name = "Name is required";
    }

    if(validator.isEmpty(data.About)){
        errors.About = "Field is empty!"
    }

    return { errors, isValid: isEmpty(errors) };

}
module.exports = SignUpValidation;
