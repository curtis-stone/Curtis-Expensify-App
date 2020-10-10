import React from "react";
import { shallow } from "enzyme";
import { EditPage } from "../../components/EditPage";
import expenses from "../fixtures/expenses";

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditPage
    startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[0]}
    />
  );
});

// EDIT PAGE SNAPSHOT
test("should render edit page correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

// EDIT EXPENSE
test("should handle editExpense correctly", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});

// REMOVE EXPENSE
test("should handle removeExpense correctly", () => {
  wrapper.find("button").simulate('click');
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ 
      id: expenses[0].id
    });
});
