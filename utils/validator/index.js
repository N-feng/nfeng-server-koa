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

function getVals(ctx, arr) {
  const fn = ctx.request.method === 'GET' ? ctx.validateQuery : ctx.validateBody
  arr.forEach(item => fn(item))
  return ctx.vals
}

function isRequired(ctx, arr) {
  const vals = getVals(ctx, arr)
  arr.forEach((item) => {
    const rules = [{ required: true, message: 'Please check your ' + item }]
    validate(rules, vals[item], (errors) => {
      if (errors) {
        throw { code: 200, msg: errors }
      }
    })
  })
}

const validator = {
  getVals,
  isRequired
}

module.exports = validator