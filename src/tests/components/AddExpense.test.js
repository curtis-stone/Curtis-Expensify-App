import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage'
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper; 

beforeEach(() => { // use this before each test: see doc. https://jestjs.io/docs/en/api#beforeeachfn-timeout
    startAddExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history = {history} />)
}) // best to use beforeEach if we have multiple tests w/ same information needed

test('should render add expense page correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should handle onSubmit correctly', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1])
})