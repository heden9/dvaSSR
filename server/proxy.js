const axios = require('axios')

const baseUrl = ''

module.exports = function (req, res, next) {
  const path = req.path
  const user = req.session.user
  const needAccessToken = req.query.needAccessToken

  if (needAccessToken && user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  axios(`${baseUrl}${path}`, {

  })
}
