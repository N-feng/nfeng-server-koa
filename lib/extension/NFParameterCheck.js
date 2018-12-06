module.exports = (ctx) => {

    // 自动根据GET POST做参数检查
    ctx.nf_validateData = ctx.request.method == 'GET' ? ctx.validateQuery : ctx.validateBody;

    ctx.nf_validate = {

        // 校验是否存在
        exist (p) {
            return ctx.nf_validateData(p).required(`参数：${p} - 未定义`);
        },

        // 是否是字符串
        isString (str) {
            return this.exist(str).isString(`参数：${str} - 必须是字符串`);
        },

        // 是否是字符串
        isStrings (strs) {
            for (let k in strs) {
                this.isString(strs[k])
            }
        },

        // 字符串去除两边空格
        trim (str) {
            return this.isString().trim()
        },

        // 邮箱是否合法
        isEmail (str) {
            return this.isString(str).isEmail(`参数：${str} - 必须是邮箱`)
        },

        // 字符串长度
        stringLength (str, min, max) {
            return this.isString(str).isLength(min, max, `参数：${str} - 长度必须 >= ${min} && <= ${max}`)
        },

        // 字符串比较
        stringEqurl (str, eqStr) {
            return this.isString(str).eq(eqStr, `参数：${str} - 长度等于 ${eqStr}`)
        },

        // 字符串转整数
        stringToInt (str) {
            return this.isString(str).toInt(`参数：${str} - 不能转化成整数`)
        },

        // 转数组
        toArr (p) {
            return this.exist(p).toArray()
        },

        // 判断是否是数组
        isArray (p) {
            return this.exist(p).isArray(`参数：${p} - 必须是数组`)
        },

        // 判断诗句时报包含在指定数组中
        isIn (p, arr, def) {
            return this[def ? 'default' : 'exist'](p, def).isIn(arr, `参数：${p} - 必须是${JSON.stringify(arr)}中的数据`)
        },

        // 判断不报包含在指定数组中
        isNotIn (p, arr) {
            return this.exist(p).isNotIn(arr, `参数：${str} - 必须不能是${JSON.stringify(arr)}中的数据`)
        },

        // 默认数据
        defaultData (p, d) {
            return ctx.yb_validateData(p).defaultTo(d)
        },

        // 拦截然后自定义处理返回数据
        tap (p, func) {
            return ctx.yb_validateData(p).tap(func)
        },

        // 转换成整数
        toInt (p, def = 0) {
            return this.defaultData(p, def).toInt()
        },

        // 转换成bool
        toBoolean(p, is = false) {
            return ctx.yb_validateData(p).defaultTo(is).toBoolean()
        }

    };

};



/// ====================== 方法简介 =========================
/*
* val()                 // 获取值
* required([tip])       // 这个值必须存在，不存在会抛出错误 tip:错误信息
* optional()            // 当值是undefined的时候直接返回不会再执行下一步
*
*
* eq(otherVal::Number, [tip])       // 是否相等 ===
* gt(otherVal::Number, [tip])       // val > otherVal
* gte(otherVal::Number, [tip])      // val >= otherVal
* lt(otherVal::Number, [tip])       // val < otherVal
* lte(otherVal::Number, [tip])      // val <= otherVal
*
*
* isOptional()          // 如果有值返回false 没有值返回 true
* isEmail()             // 是否是Email
* isIn(array, [tip])    // 值是否在后面数组中
* isNotIn(array, [tip]) // 值不能是后面数组中的数据
* isString([tip])       // 值是否是字符串
* isArray([tip])        // 值是否是数组 url上的值全部是相同的参数也是数组
* isLength(min:Int, max:Int, [tip]) // min <= val <= max
* isInt([tip])                      // 必须是整数
* isFiniteNumber([tip])             // 必须是有效的数 但是不能是 Infinity
* match(regexp::RegExp, [tip])      // 正则匹配，但是必须是字符串
* notMatch(regexp::RegExp, [tip])   // 与上面相反
* check(result, [tip])              // 校验返回结果的值，可以写一个异步方法
* checkNot(result, [tip])
* checkPred(fn, [tip])              // 传入一个函数进行校验数据（拦截校验）
* checkPredNot(fn, [tip])
* isAlpha([tip])                    // 确保值只包含a-z(大小写不敏感)
* isAlphanumeric([tip])             // 确保值只包含a-z或者0-9(大小写不敏感)
* isNumeric([tip])                  // 确保val是一个只包含0-9的字符串。
* isAscii([tip])                    // 确保是ascii
* isBase64([tip])                   // 确保是base64
* isHexColor([tip])                 // 确保是颜色 #333333, #333, 333333, 333
* isUuid([version::String], [tip])  // 确保val是一个有效的uuid字符串。 version can be one of 'v3', 'v4', 'v5', 'all'. default is 'all'
* isJson([tip])                     // 确保是json字符串
*
* defaultTo(defaultVal) // 设置默认值
* tap(func)             // 自定义拦截处理数据(对值处理，不会抛出错误)
* set(newVal)           // 强制将值转换成指定数据（与tap功能相等）
* toArray()             // 数据转换成数组
* toInt([tip])          // Uses parseInt(val, 10)
* toInts([tip])         // 将数组中的数据全部转换成int类型
* uniq()                // 删除数组重复项  必须保证是数组
* toBoolean()
* toDecimal([tip])      // 解析成小数
* toFloat([tip])        // Number.parseFloat(val)
* toFiniteFloat([tip])  // ctx.validateBody('num').toFloat().isFiniteNumber() 的快捷方式
* toString()            // 转化成字符串 如果是false 会转化成''
* trim()                // 去除字符串左右两边的空格
* fromJson([tip])       // 解析成json对象
* encodeBase64([tip])   // 将val字符串转换为base64编码的字符串 , 空字符串编码为空字符串
* decodeBase64([tip])   // 将val字符串从base64解码为字符串。空字符串解码为空字符串。
* clamp(min::Number, max::Number) // 定义val被限制为的数值范围。如果val超出此范围，则val将被更新到范围的最小值或最大值。
									                   如果val < min，则val被设置为min，如果val > max，那么val将被设置为max。
																			注意:您必须首先确保val是一个数字。
* */
