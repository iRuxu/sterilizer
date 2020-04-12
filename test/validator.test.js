import { validator } from "../src/validator.js";

describe("sterilizer testing", () => {
    test("isOptional", () => {
        expect(validator(null, {
            isOptional: true,
        })).toEqual(true);
        expect(validator(undefined, {
            isOptional: true,
        })).toEqual(true);
        expect(validator("", {
            isOptional: true,
        })).toEqual(true);
        expect(validator("abc", {
            isOptional: true,
            isAlpha: true,
        })).toEqual(true);
        expect(validator("abc", {
            isOptional: true,
            isNumeric: true,
        })).toEqual(false);
    });

    test("is", () => {
        expect(validator("a..b", {
            is: /^a.*b$/,
        })).toEqual(true);
        expect(validator("a..c", {
            is: /^a.*b$/,
        })).toEqual(false);
    });

    test("not", () => {
        expect(validator("a..c", {
            not: /^a.*b$/,
        })).toEqual(true);
        expect(validator("a..b", {
            not: /^a.*b$/,
        })).toEqual(false);
    });

    test("len", () => {
        expect(validator("abc", {
            len: 3,
        })).toEqual(true);
        expect(validator("abc", {
            len: '3',
        })).toEqual(true);
        expect(validator("abc", {
            len: [1,5],
        })).toEqual(true);
        expect(validator("abc", {
            len: 2,
        })).toEqual(false);
    });

    test("isIn", () => {
        expect(validator("abc", {
            isIn: ['abc','xyz'],
        })).toEqual(true);
        expect(validator("abc", {
            isIn: [123,456],
        })).toEqual(false);
    });

    test("notIn", () => {
        expect(validator("abc", {
            notIn: [123,456],
        })).toEqual(true);
        expect(validator("abc", {
            notIn: ['abc','xyz'],
        })).toEqual(false);
    });

    test("isAlpha", () => {
        expect(validator("abc", {
            isAlpha: true,
        })).toEqual(true);
        expect(validator(123, {
            isAlpha: true,
        })).toEqual(false);
    });
    
    test("isAlphanumeric", () => {
        expect(validator("abc123", {
            isAlphanumeric: true,
        })).toEqual(true);
        expect(validator('abc', {
            isAlphanumeric: true,
        })).toEqual(true);
        expect(validator('123', {
            isAlphanumeric: true,
        })).toEqual(true);
        expect(validator('abc_123', {
            isAlphanumeric: true,
        })).toEqual(false);
    });

    test("isNumeric", () => {
        expect(validator("123", {
            isNumeric: true,
        })).toEqual(true);
        expect(validator("abc", {
            isNumeric: true,
        })).toEqual(false);
    });

    test("isInt", () => {
        expect(validator("123", {
            isInt: true,
        })).toEqual(true);
        expect(validator("123.456", {
            isInt: true,
        })).toEqual(false);
    });

    test("isFloat", () => {
        expect(validator("123.456", {
            isFloat: true,
        })).toEqual(true);
        expect(validator("xxx", {
            isFloat: true,
        })).toEqual(false);
    });

    test("max", () => {
        expect(validator("123", {
            max: 456,
        })).toEqual(true);
        expect(validator("123", {
            max: 123,
        })).toEqual(true);
        expect(validator("123", {
            max: 122,
        })).toEqual(false);
    });

    test("min", () => {
        expect(validator("123", {
            min: 100,
        })).toEqual(true);
        expect(validator("123", {
            min: 123,
        })).toEqual(true);
        expect(validator("123", {
            min: 456,
        })).toEqual(false);
    });

    test("isChinese", () => {
        expect(validator("你好", {
            isChinese: true,
        })).toEqual(true);
        expect(validator('abc', {
            isChinese: true,
        })).toEqual(false);
        expect(validator('123', {
            isChinese: true,
        })).toEqual(false);
    });

    test("isIdentityCard", () => {
        expect(validator("15072519771101379X", {
            isIdentityCard: true,
        })).toEqual(true);
        expect(validator('230231197210277076', {
            isIdentityCard: true,
        })).toEqual(true);
        expect(validator('123456', {
            isIdentityCard: true,
        })).toEqual(false);
    });

    test("isMobilePhone", () => {
        expect(validator("13107315566", {
            isMobilePhone: true,
        })).toEqual(true);
        expect(validator('11122223333', {
            isMobilePhone: true,
        })).toEqual(false);
    });

    test("isEmail", () => {
        expect(validator("cn42du@163.com", {
            isEmail: true,
        })).toEqual(true);
        expect(validator("ifat3@sina.com.cn", {
            isEmail: true,
        })).toEqual(true);
        expect(validator("ifat3.it@163.com", {
            isEmail: true,
        })).toEqual(true);
        expect(validator("ifat3_-.@42du.cn", {
            isEmail: true,
        })).toEqual(true);
        expect(validator("ifat3@42du.online", {
            isEmail: true,
        })).toEqual(true);
        expect(validator("测试@google.com", {
            isEmail: true,
        })).toEqual(true);
        expect(validator('xx#123.com', {
            isEmail: true,
        })).toEqual(false);
    });

});
