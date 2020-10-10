// react-test-renderer: 
// render components in regular js code an assert things about what got rendered
// install w/ yarn add react-test-renderer@16.0.0

// yarn add enzyme@3.0.0 enzyme-adapter-16@1.0.0 (for react version we're using) 
// raf@3.3.2 (polyfill for a browser feature called 'request animation frame)

import React from 'react';
import { shallow } from 'enzyme'
import {Header} from '../../components/Header'
// Enzyme doc's: https://enzymejs.github.io/enzyme/
// import toJSON from 'enzyme-to-json'; (imported in jest.config.json file to automatically run)
// yarn add enzyme-to-json@3.0.1 https://github.com/adriantoine/enzyme-to-json 

test('should render header correctly', () => {
   const wrapper = shallow(<Header startLogout={() => {}}/>)
   expect(wrapper).toMatchSnapshot();
// example: expect(wrapper.find('h1').text()).toBe('Expensify')
});

test('Should call startLogout on button click', () => {
   const startLogout = jest.fn(); // test spy

   const wrapper = shallow(<Header startLogout={startLogout} />) 
   wrapper.find('button').simulate('click');
   expect(startLogout).toHaveBeenCalled();
});