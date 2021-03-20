![Testing](https://github.com/iRuxu/sterilizer/workflows/Testing/badge.svg?branch=master)

# Introduction

-   **_Sterilizer_**  
    Remove specified symbols  
    移除指定符号字符
-   **_Validator_**  
    Validate input value with sequelize similar interface  
    简单的中文前端校验器，使用和 Sequelize 基本相同的接口名称，方便前后端代码保持一致

# Usage

## Install

```
npm install sterilizer
```

## Import

ES6

```javascript
import { sterilizer, validator } from "sterilizer/index.js";
```

Node.js

```javascript
const { sterilizer, validator } = require("sterilizer");
```

## Sterilizer

### interface

`sterilizer(str:string,chain:boolean).<method>(symbols:string)+.toString()?`

### example

```javascript
sterilizer("abc~!@###-$").kill().toString(); //移除所有符号字符
// => abc
sterilizer("abc~!@###-$").kill("-#").toString(); //移除指定符号
// => abc~!@$
sterilizer("abc~!@###-$").live("@").toString(); //移除除指定符号外的所有符号字符
// => abc@
sterilizer("abc~!@###-$", true).kill("-#").remove("a").toString(); //链式调用
// => bc~!@$
```

### method

#### chain
-   `kill(symbols)` remove the specified symbols
-   `live(symbols)` remove all the symbols exclude args
-   `safe()` remove htmlspecialchars + urlspecialchars
-   `removeHSC()` remove htmlspecialchars
-   `removeURL()` remove urlspecialchars
-   `removeSpace()` remove all the space
-   `remove(words[,replacement])` remove specified words or replace it by replacement
-   `removeHTMLtag()` remove all the HTML tags

#### output
-   `toString()` output the result

#### other
+ `has([symbol])` return boolean

## Validator

### interface

`validator(str:string,options:object)`

### example

```javascript
validator("abc123~!", {
    isOptional: true,
    isNumeric: true,
});
// => false
validator(null, {
    isOptional: true,
});
// => true
```

### options

```javascript
{
    isOptional : true,        // 可选的,匹配'',null,undefined
    len: [2,10]或5或'5',      // 仅允许指定长度或在指定区间的值
    notEmpty:true,            // 不允许出现空字符串

    is: /^[a-z]+$/i,          // 匹配这个 RegExp
    not: /^[a-z]+$/i,         // 不匹配 RegExp

    isAlpha: true,            // 只允许字母
    isAlphanumeric: true,     // 将仅允许使用字母数字,因此 '_abc' 将失败

    isNumeric: true,          // 只允许数字
    isInt: true,              // 检查有效的整数
    isFloat: true,            // 检查有效的浮点数,可以为整数
    max: 23,                  // 仅允许值 <= 23
    min: 23,                  // 仅允许值 >= 23

    isIn: ['foo', 'bar'],     // 检查值是其中之一
    notIn: ['foo', 'bar'],    // 检查值不是这些之一

    //中文
    isEmail: true,            // 限英文域名但支持中文用户名
    isChinese: true,          // 限简体中文字符
    isIdentityCard: true,     // 限大陆身份证(需二次校验有效性)
    isMobilePhone: true,      // 限中国大陆手机号(需验证码校验有效性)
}
```
