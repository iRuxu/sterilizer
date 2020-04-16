'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 
 * @param {any} o any object to be detected
 * @return {string} the type string
 */
function _typeof(o){
    var s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

/**
 * @desc  Remove specified symbols & charaters
 * @param {string} str string will be sterilized
 * @param {boolean} chain whether use chain
 * @return {str} the clean string
 * @return {object} a sterilizer object , when chain is enabled use .toString() to output the sterilized string
 */
class Sterilizer {
    constructor(str,chain) {

        if(_typeof(str)!=='string'){
            throw new Error(
                "[Sterilizer::init] params should be string"
            );
        }

        this._symbols = {
            "`": "`",
            "~": "~",
            "!": "!",
            "@": "@",
            "#": "#",
            $: "\\$",
            "%": "%",
            "^": "\\^",
            "&": "&",
            "*": "\\*",
            "-": "\\-",
            _: "_",
            "=": "=",
            "+": "+",
            "(": "\\(",
            ")": "\\)",
            "[": "\\[",
            "]": "\\]",
            "{": "\\{",
            "}": "\\}",
            "|": "\\|",
            "\\": "\\\\",
            "/": "/",
            "?": "\\?",
            ":": ":",
            ";": ";",
            "'": "'",
            '"': '"',
            ">": ">",
            "<": "<",
            ",": ",",
            ".": "\\.",
        };
        this.symbols = Object.keys(this._symbols);
        this.regs = Object.values(this._symbols);
        this.str = str;
        this._str = str;
        this._chain = chain;
    }

    // output the clean string
    toString() {
        return this._str;
    }

    // detected the object type
    _detected(o) {
        let _type = _typeof(o);
        let _iter = ["string", "array", "set"];
        if (!_iter.includes(_type))
            throw new Error(
                "[Sterilizer::remove] params should be string|array|set"
            );
        return o;
    }

    // replaced the specified symbols by RegExp
    _sterilize(_toRemove) {
        _toRemove = [..._toRemove].join("");
        let re = new RegExp(`[${_toRemove}]`, "gm");
        this._str = this._str.replace(re, "");
        return this._chain ? this : this.toString()
    }

    // remove the specified symbols
    kill(germ) {
        let _toRemove = null;

        // build unique toRemove set
        if (germ == undefined) {
            _toRemove = new Set(this.regs);
        } else {
            this._detected(germ);
            _toRemove = new Set();
            let _germ = new Set(germ);
            for (let char of _germ) {
                if (this.symbols.includes(char))
                    _toRemove.add(this._symbols[char]);
            }
        }

        return this._sterilize(_toRemove);
    }

    // remove all the symbols exclude args
    live(probiotics) {
        this._detected(probiotics);

        // build unique toRemove set
        let _toRemove = new Set(this.regs);
        for (let char of probiotics) {
            if (this.symbols.includes(char)) {
                _toRemove.delete(this._symbols[char]);
            }
        }

        return this._sterilize(_toRemove);
    }

    // remove htmlspecialchars + urlspecialchars
    safe() {
        return this.kill([
            "&",
            "<",
            ">",
            '"',
            "'",
            "+",
            ":",
            "/",
            "?",
            "=",
            "#",
            "%",
        ]);
    }

    // remove htmlspecialchars
    removeHSC() {
        return this.kill(["&", "<", ">", '"', "'"]);
    }

    // remove urlspecialchars
    removeURL() {
        return this.kill(["+", ":", "/", "?", "=", "&", "#", "%"]);
    }

    // remove all the space
    removeSpace() {
        this._str = this._str.replace(/\s/gm, "");
        return this._chain ? this : this.toString()
    }

    // remove specified charaters
    remove(words, replacement) {
        let re = new RegExp(`${words}`, "gm");
        replacement = replacement !== undefined ? replacement : "";
        this._str = this._str.replace(re, replacement);
        return this._chain ? this : this.toString()
    }

    // remove all the HTML tags
    removeHTMLtag() {
        this._str = this._str.replace(/<[^>]+>/gm, "");
        return this._chain ? this : this.toString()
    }
}

function sterilizer(str,chain=false) {
    return new Sterilizer(str,chain);
}

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
    }

    check() {
        try {
            // if it sets optional && invalid value
            if (this.opt.isOptional == true) {
                if (this.isOptional()) {
                    return true;
                }
            }

            // check all the conditions are right
            for (let rule in this.opt) {
                if (rule == "isOptional") continue;
                if (!this[rule](this.opt[rule])) {
                    return false;
                }
            }

            return true;
        } catch (e) {
            console.error(e);
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
        let length = this.val.length;
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
        return status ? /^[A-Z]+$/i.test(this.val) : true;
    }

    isAlphanumeric(status) {
        return status ? /^[A-Z0-9]+$/i.test(this.val) : true;
    }

    isNumeric(status) {
        return status ? /^[0-9]+$/.test(this.val) : true;
    }

    isInt(status) {
        return status ? /^(?:[-+]?(?:0|[1-9][0-9]*))$/.test(this.val) : true;
    }

    isFloat(status) {
        return status ? /^[-+]?[0-9]*\.?[0-9]+$/.test(this.val) : true;
    }

    max(maxValue) {
        return this.val <= maxValue;
    }

    min(minValue) {
        return this.val >= minValue;
    }

    // Chinese Characters
    isChinese(status) {
        return status ? /^[\u4e00-\u9fa5]+$/.test(this.val) : true;
    }

    // Chinese Identity Card (should be verfied the validity again)
    isIdentityCard(status) {
        return status
            ? /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
                this.val
            )
            : true;
    }

    // Chinese Mobile Phone Number
    isMobilePhone(status) {
        return status ? /^1[3456789]\d{9}$/.test(this.val) : true;
    }

    // Only English domain
    isEmail(status) {
        return status
            ? /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(this.val)
            : true;
    }

    // not empty allowed
    notEmpty(status){
        return status
            ? !/\s/gm.test(this.val)
            : true;
    }
}

function validator(val, opt) {
    const ins = new Validator(val, opt);
    return ins.check();
}

exports.Sterilizer = Sterilizer;
exports.Validator = Validator;
exports.sterilizer = sterilizer;
exports.validator = validator;
