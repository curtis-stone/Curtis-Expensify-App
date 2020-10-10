import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';

DotEnv.config({ path: ".env.test" }); // for firebase test database 

Enzyme.configure({
    adapter: new Adapter()
})



// set up testing environment file to actually use Enzyme for v16 of React
// made by airbnb https://enzymejs.github.io/enzyme/
// then set up a jest config file to specify this file will run https://jestjs.io/docs/en/configuration
// setupFiles[] --> jest.config.json in app root