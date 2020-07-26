// require.context
const req = require.context('./svg', false, /\.svg$/)
// ['qq.svg', 'wechat.svg']
req.keys().map(req)