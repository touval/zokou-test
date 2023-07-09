var fs = require('fs-extra');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
module.exports = { session: process.env.SESSION_ID || 'zokk' };
