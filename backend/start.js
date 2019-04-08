// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const app = require('./src/app');
app.set('port', process.env.PORT || 9003);
const server = app.listen(app.get('port'), () => {
    console.log(`Express listening → PORT ${server.address().port}`);
});