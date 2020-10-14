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
  return (dispatch, getState) => {
    // return a function for firebase and can do this b/c of redux-thunk
    // (dispatch, getState) gives us access to dispatch and current state
    const uid = getState().auth.uid; // gets uid from authorization
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;

    const expense = { description, note, amount, createdAt }

    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
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

export const startRemoveExpense = ({ id } = {}) => {
 if (confirm('Are you sure you want to remove?')) {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }));
    });
  };
} else { return }
};

// EDIT EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

export const startEditExpense = (id = {}, updates = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates));
    });
  };
};

// SET EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

// FETCHES EXPENSES DATA FROM FIREBASE!!! >:^D
export const startSetExpenses = () => {
  return (dispatch, getState) => {   // (dispatch) gives access to dispatch();
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => { 
      // ^ gets all info from firebase database w/ 'expenses' ref and does something with it (once)
      const expenses = [];

      snapshot.forEach((childSnapshot) => {
            expenses.push({
                id: childSnapshot.key, // .key method to get access to firebase's random id
                ...childSnapshot.val() // spread out whatever comes back from childsnapshot
            });
          }); // after forEach, now have access to the built up expenses array

          dispatch(setExpenses(expenses)); // expenses = array of expenses above
        }); // .forEach() creates child snapshots for each 
      };
    };