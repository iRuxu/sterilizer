# Introduction
+ ***Sterilizer***   
Remove specified symbols  
移除指定符号字符
+ ***Validator***   
Validate input value with sequelize similar interface   
简单的中文前端校验器，使用和Sequelize基本相同的接口名称，方便前后端代码Review

# Usage
## Install
```shell
npm install sterilizer
```

## Import
```javascript
import { sterilizer, validator } from 'sterilizer'
```

## Sterilizer
### example
```javascript
sterilizer('abc~!@###-$').kill('-#').toString()
// => bc~!@$
```
### method
+ `kill(symbols)` remove the specified symbols 
+ `live(symbols)` remove all the symbols exclude args 
+ `safe()` remove htmlspecialchars + urlspecialchars 
+ `removeHSC` remove htmlspecialchars 
+ `removeURL()` remove urlspecialchars 
+ `removeSpace()` remove all the space
+ `remove(words[,replacement])` remove specified words or replace it by replacement
+ `removeHTMLtag()` remove all the HTML tags
+ `toString()` output the clean string


## Validator
### example
```javascript
validator('abc123~!',{
    isOptional:true,
    isNumeric: true
})
// => false
```
### options
```javascript
{
    isOptional : true,        // 可选的,匹配'',null,undefined
    len: [2,10]或5或'5',      // 仅允许指定长度或在指定区间的值

    is: /^[a-z]+$/i,          // 匹配这个 RegExp
    not: /^[a-z]+$/i,         // 不匹配 RegExp

    isAlpha: true,            // 只允许字母
    isAlphanumeric: true,     // 将仅允许使用字母数字,因此 '_abc' 将失败

    isNumeric: true,          // 只允许数字
    isInt: true,              // 检查有效的整数
    isFloat: true,            // 检查有效的浮点数
    max: 23,                  // 仅允许值 <= 23
    min: 23,                  // 仅允许值 >= 23

    isIn: ['foo', 'bar'],     // 检查值是其中之一
    notIn: ['foo', 'bar'],    // 检查值不是这些之一

    isEmail: true,            // 限英文域名但支持中文用户名
    isChinese: true,          // 限简体中文字符
    isIdentityCard: true,     // 限大陆身份证(需2次校验有效性)
    isMobilePhone: true,      // 限中国大陆手机号
}
```