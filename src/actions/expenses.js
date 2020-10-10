import uuid from "uuid";
import database from '../firebase/firebase'

// components calls action generator
// action generator returns a function (capable b/c of module (redux-thunk))
// component dispatches function (?)
// function runs (has the ability to dispatch other actions and do whatever it wants)

// ADD EXPENSE
export const addExpense = (expense) => {
  return {
    type: "ADD_EXPENSE",
    expense
  };
};

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    // return a function for firebase and can do this b/c of redux-thunk
    // (dispatch) gives us access to dispatch
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;

    const expense = { description, note, amount, createdAt }

    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
    }) // return in front is for testing files only

  };
};

// REMOVE EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// EDIT EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});
