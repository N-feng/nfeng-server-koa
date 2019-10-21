const validators = require('./validators')

function getType(rule) {
  if (rule.type === undefined && (rule.pattern instanceof RegExp)) {
    rule.type = 'pattern'
  }
  if (typeof (rule.validator) !== 'function' && (rule.type && !Object.prototype.hasOwnProperty.call(validators, rule.type))) {
    console.warn(utils.format('Unknown rules type %s', rule.type))
    rule.type = ''
  }
  return rule.type || 'string'
}

function getValidationMethod(rule) {
  if (typeof rule.validator === 'function') {
    return rule.validator
  }
  if (Object.keys(rule).includes('required')) {
    return validators.required
  }
  return validators[getType(rule)] || false
}

function validate(rules, value, callback) {
  rules.forEach((rule) => {
    const validator = getValidationMethod(rule)

    if (validator) {
      validator(rule, value, callback)
    }
  })
}

function getModel(ctx, fieldName) {
  const fn = ctx.request.method === 'GET' ? ctx.validateQuery : ctx.validateBody
  return fn(fieldName).vals
}

function isString(ctx, fieldName) {
  const rules = [{ required: true, message: 'Please check your ' + fieldName }]
  const model = getModel(ctx, fieldName)
  validate(rules, model[fieldName], (errors) => {
    if (errors) {
      throw { code: 200, msg: errors }
    }
  })
}

const validator = {
  isStrings: (ctx, arr) => {
    arr.forEach(item => isString(ctx, item))
  }
}

module.exports = validator