// mocked version of moment library!

const moment = require.requireActual('moment');
// grab original version of moment 

export default (timestamp = 0) => {
    return moment(timestamp);
}
// sets moment to be 0
