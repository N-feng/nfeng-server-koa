function isNativeStringType(type) {
    return type === 'string'
        || type === 'url'
        || type === 'hex'
        || type === 'email'
        || type === 'pattern'
}

function isEmptyValue(value, type) {
    if (value === undefined || value === null) {
        return true
    }
    if (type === 'array' && Array.isArray(value) && !value.length) {
        return true
    }
    if (isNativeStringType(type) && typeof value === 'string' && !value) {
        return true
    }
    return false
}

function required(rule, value, callback) {
    let errors = ''
    const type = Array.isArray(value) ? 'array' : typeof value
    if (rule.required && isEmptyValue(value, type || rule.type)) {
        errors = rule.message
    }
    callback(errors)
}

function pattern(rule, value, callback) {
    if (!isEmptyValue(value, 'string') && rule.pattern) {
        let errors = ''
        if (rule.pattern instanceof RegExp) {
            // if a RegExp instance is passed, reset `lastIndex` in case its `global`
            // flag is accidentally set to `true`, which in a validation scenario
            // is not necessary and the result might be misleading
            rule.pattern.lastIndex = 0
            if (!rule.pattern.test(value)) {
                errors = rule.message
            }
        } else if (typeof rule.pattern === 'string') {
            const _pattern = new RegExp(rule.pattern)
            if (!_pattern.test(value)) {
                errors = rule.message
            }
        }
        callback(errors)
    }
}

module.exports = {
    required,
    pattern,
}
