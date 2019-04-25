const validators = require('./validators')

function getType(rule) {
    if (rule.type === undefined && (rule.pattern instanceof RegExp)) {
        rule.type = 'pattern';
    }
    if (typeof (rule.validator) !== 'function' && (rule.type && !Object.prototype.hasOwnProperty.call(validators, rule.type))) {
        console.warn(utils.format('Unknown rules type %s', rule.type));
        rule.type = '';
    }
    return rule.type || 'string';
}

function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
        return rule.validator;
    }
    const keys = Object.keys(rule);
    const messageIndex = keys.indexOf('message');
    if (messageIndex !== -1) {
        keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === 'required') {
        return validators.required;
    }
    return validators[getType(rule)] || false;
}

function validate(model, rules, callback) {
    const objKeys = Object.keys(model);
    let value;
    objKeys.forEach((key) => {
        value = model[key];
    });
    rules.forEach((rule) => {
        const validator = getValidationMethod(rule);

        if (validator) {
            validator(rule, value, callback);
        }
    });
}

function KoaValidator (ctx) {
    ctx.getModel = (fileName) => {
        const fn = ctx.request.method === 'GET' ? ctx.validateQuery : ctx.validateBody;
        let obj = {}
        obj[fileName] = fn(fileName).vals[fileName]
        return obj;
    }
    ctx.isString = (str) => {
        const model = ctx.getModel(str);
        const rules =  [{ required: true, message: 'Please check your ' + str }];
        validate(model, rules, (errors) => {
            if (errors) {
                throw {
                    code: 200,
                    msg: errors
                }
            }
        })
    }
    ctx.isStrings = (arr) => {
        for(let i in arr) {
            ctx.isString(arr[i]);
        }
    }
}

module.exports = function (options) {
    return async function (ctx, next) {
        KoaValidator(ctx);
        await next();
    }
}