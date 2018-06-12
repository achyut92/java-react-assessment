const conf = {
    host: 'ds155730.mlab.com',
    port: '55730',
    user: '',
    password: '',
    db: 'restaurant-app',
}
module.exports = {
    url: 'mongodb://' + conf.user + ':' + conf.password + '@' + conf.host + ':' + conf.port + '/' + conf.db
}