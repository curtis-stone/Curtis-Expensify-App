import { addExpense, removeExpense, editExpense } from "../../actions/expenses";

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc",
  });
});
// toEqual() for objects & array testing/ comparisons for expect
// toBe() for num's, strings, and boleans for expect

test("Should setup edit expense action object", () => {
  const action = editExpense("testID", { note: "test note" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "testID",
    updates: {
      note: "test note",
    },
  });
});

test("Should setup addExpense action object w/ provided values", () => {
  const expenseData = {
    description: "Rent",
    amount: 114500,
    createdAt: 1000,
    note: "This was last month's rent",
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String), // id are random so we have to use .any()(see Jest doc)
    },
  });
});

test("Should setup addExpense object w/ default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
    },
  });
});
