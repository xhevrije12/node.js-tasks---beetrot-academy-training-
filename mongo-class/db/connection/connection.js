const mongose = require('mongose');

const connectDb = mongose.connect('mongodb://localhost:27017'/)
console.log('connected to mongodb');
}).catch(err) => {
    console.error('failed to connect', err)

}

const.user = ''

module.exports = connectDb;