const GLOB_STRATEGY = require('./GLOB_STRATEGY')

function getBodyVal(ctx, key) {
  const fn = ctx.request.method === 'GET' ? ctx.validateQuery : ctx.validateBody;
  const Validator = fn(key);
  return Validator.vals[Validator.key];
}

function validator( ctx ) {

  ctx.check = (rules) => {
    for (var key in rules) {
      for (var el in rules[key]) {
        if (getBodyVal(ctx, key)) {

        } else {
          throw {
            code: 200,
            msg: `${key} required`
          }
        }
        console.log(getBodyVal(ctx, key))
        console.log(GLOB_STRATEGY[rules[key][el].validator])
      }
    }
  }

  for (var key in GLOB_STRATEGY) {
    ctx[key] = function (fieldName) {
  //     console.log(fieldName)
      // console.log(ctx.validateData())
      // GLOB_STRATEGY[el]
      console.log(this)
      const val = getBodyVal(ctx, fieldName);

      // console.log(val)
      if (!GLOB_STRATEGY[key](val)) {
        // console.log(key)
      }

      // switch (GLOB_STRATEGY[key]) {
      //   case 'isNonEmpty':
      //     throw `${fieldName} required`
      //     break;
      // }
    }
  }

  // console.log(ctx.validateQuery())

  // ctx.isNonEmpty = function (fieldName) {
    // console.log(this.validateQuery(fieldName))
    // console.log(getBodyVal(ctx, fieldName))
  // }

  // ctx.isNonEmptys = function (fieldNameArr) {
  //   for (let key in fieldNameArr) {
  //     console.log(ctx.validateBody())
  //     return GLOB_STRATEGY.isNonEmpty(key)
  //   }
  // }
  //
  // ctx.checkBody = function (fieldName) {
  //   console.log(ctx.validateBody(fieldName))
  // }
  //
  // ctx.checkQuery = function (fieldName) {
  //   return new Promise((resolve) => {
  //     resolve(ctx.validateQuery(fieldName).vals[fieldName])
  //   })
  // }
}

module.exports = function (options) {
  return async function ( ctx, next ) {
    validator(ctx);
    await next()
  }
}
