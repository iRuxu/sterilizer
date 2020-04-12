import _typeof from "./lib/_typeof.js";

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

export { Sterilizer, sterilizer };
