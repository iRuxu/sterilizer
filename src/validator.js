import _typeof from "lib/_typeof.js";

/**
 * @desc  Validate input value with sequelize similar interface
 * @param {any} val input will be validated
 * @param {object} opt validate option
 * @return {boolean} true or false
 */
class Validator {
    constructor(val, opt) {
        this.val = val;
        this.opt = opt || {};
        this._check(this.val, this.opt);
    }

    _check() {
        try {
            // if it sets optional && invalid value
            if (this.opt.isOptional == true) {
                if (this.isOptional(this.val)) {
                    return true;
                }
            }

            // check all the conditions are right
            for (let rule in opt) {
                if (rule == "isOptional") continue;
                if (!this[rule](opt.this[rule])) {
                    return false;
                }
            }

            return true;
        } catch (e) {
            throw new Error(
                "[Validator::_check] unexpected error,please check your input"
            );
        }
    }

    isOptional() {
        let _invalid = ["", undefined, null];
        return _invalid.includes(this.val) ? true : false;
    }

    is(re) {
        if (!re instanceof RegExp)
            throw new Error("[Validator::is] param should be a RegExp");
        return re.test(this.val);
    }

    not(re) {
        return !this.is(re);
    }

    len(range) {
        let length = str.length;
        if (_typeof(range) == "array") {
            return length >= range[0] && length <= range[1];
        }
        if (_typeof(range) == "string" || _typeof(range) == "number") {
            return length == range;
        }
        throw new Error("[Validator::len] param should be array|string|number");
    }

    isIn(options) {
        if (_typeof(options) != "array") {
            throw new Error("[Validator::isIn] param should be an array");
        }
        return options.includes(this.val) ? true : false;
    }

    notIn(options) {
        return !this.isIn(options);
    }

    isAlpha(status) {
        return status ? /^[A-Z]+$/i.test(this.val) : true
    }

    isAlphanumeric(status){
        return status ? /^[A-Z0-9]+$/i.test(this.val) : true
    }

    isNumeric(status){
        return status ? /^[0-9]+$/.test(this.val) : true
    }

    isInt(status){
        return status ? /^(?:[-+]?(?:0|[1-9][0-9]*))$/.test(this.val) : true
    }

    isFloat(status){
        return status ? /^[-+]?[0-9]*\.?[0-9]+$/.test(this.val) : true
    }

    max(maxValue){
        return this.val <= maxValue
    }

    min(minValue){
        return this.val >= minValue
    }

    // Chinese Characters
    isChinese(status){
        return status ? /^[\u4e00-\u9fa5]$/.test(this.val) : true
    }

    // Chinese Identity Card (should be verfied the validity again)
    isIdentityCard(status){
        return status ? /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.val) : true
    }

    // Chinese Mobile Phone Number
    isMobilePhone(status){
        return status ? /^1[3456789]\d{9}$/.test(this.val) : true
    }

    // Only English domain
    isEmail(){
        return status ? /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.val) : true
    }
}

export default Validator;
