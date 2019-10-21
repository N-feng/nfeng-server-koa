const tool = {
  sendSuccess: (ctx, data = {}, msg = '') => {
    ctx.response.type = 'json'
    const body = { data, code: 200, msg }
    ctx.response.body = body
  }
}

module.exports = tool