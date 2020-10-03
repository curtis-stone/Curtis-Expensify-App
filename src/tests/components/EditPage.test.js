import React from "react";
import { shallow } from "enzyme";
import { EditPage } from "../../components/EditPage";
import expenses from "../fixtures/expenses";

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditPage
      editExpense={editExpense}
      removeExpense={removeExpense}
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
  expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});

// REMOVE EXPENSE
test("should handle removeExpense correctly", () => {
  wrapper.find("button").simulate('click');
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(removeExpense).toHaveBeenLastCalledWith({ 
      id: expenses[0].id
    });
});
