import Sterilizer from "./src/sterilizer";
import Validator from "./src/validator";

function sterilizer(str) {
    return new Sterilizer(str);
}

function validator(val, opt) {
    return new Validator(val, opt);
}

export { Sterilizer, sterilizer, Validator, validator };
