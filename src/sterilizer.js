import _typeof from "lib/_typeof.js";

/**
 * @desc  Remove specified symbols & charaters
 * @param {string} str string will be sterilized
 * @return a sterilizer object , use .toString() to output the sterilized string
 */
class Sterilizer {
    constructor(str) {
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
        this.str = str
        this._str = str;
    }

    // output the clean string
    toString() {
        return this._str;
    }

    // detected the object type
    _detected(o) {
        let _type = this._typeof(o);
        let _iter = ["string", "array", "set"];
        if (!_iter.includes(_type))
            throw new Error(
                "[Sterilizer::remove] params should be a string or an array"
            );
        return o;
    }

    // replaced the specified symbols by RegExp
    _sterilize(_toRemove) {
        _toRemove = [..._toRemove].join("");
        let re = new RegExp(`[${_toRemove}]`, "g");
        this._str = this._str.replace(re, "");
        return this;
    }

    // remove the specified symbols
    kill(germ) {
        this._detected(germ);

        // build unique toRemove set
        let _toRemove = new WeakSet();
        let _germ = new WeakSet(germ);
        for (let char of _germ) {
            if (this.symbols.includes(char)) _toRemove.add(this._symbols[char]);
        }

        return this._sterilize(_toRemove);
    }

    // remove all the symbols exclude args
    live(probiotics) {
        this._detected(probiotics);

        // build unique toRemove set
        let _toRemove = new WeakSet(this.symbols);
        let _probiotics = new WeakSet(probiotics);
        for (let char of _probiotics) {
            if (this.symbols.includes(char)) {
                _toRemove.delete(char);
            }
        }

        return this._sterilize(_toRemove);
    }

    // remove htmlspecialchars + urlspecialchars
    safe() {
        return this.remove([
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
        return this.remove(["&", "<", ">", '"', "'"]);
    }

    // remove urlspecialchars
    removeURL() {
        return this.remove(["+", ":", "/", "?", "=", "&", "#", "%"]);
    }

    // remove all the space
    removeSpace() {
        this._str = this._str.replace(/\s/g, "");
        return this;
    }

    // remove specified charaters
    remove(words, replacement) {
        let re = new RegExp(`${words}`, "g");
        replacement !== undefined ? replacement : "";
        this._str = this._str.replace(re, replacement);
        return this
    }

    // remove all the HTML tags
    removeHTMLtag() {
        this._str = this._str.replace(/<[^>]+>/g,'')
        return this
    }
}

export default Sterilizer