module.exports = function(app) {
  app.use('/api/leads', require('./leads'))
}