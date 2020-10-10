import {
  startAddExpense,
  addExpense,
  removeExpense,
  editExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const uid = 'this is test uid';
const defaultAuthState = { auth: { uid } }; // auth object to call w/ createMockStore(defaultAuthState)
const createMockStore = configureMockStore([thunk]); // middleware in arg

// beforeEach(() => {
//   const expensesData = {};
//   database.ref(`users/${uid}/expenses`).set(expensesData);
// });

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc",
  });
});
// toEqual() for objects & array testing/ comparisons for expect
// toBe() for num's, strings, and boleans for expect

test("should remove an expense from firebase correctly", (done) => {
  // done to tell jest it is async
  const store = createMockStore(defaultAuthState); // create mock store w/ auth object and uid
  const id = expenses[2].id; // get id from expenses[2] to reuse its id
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      // calls function on an id
      const actions = store.getActions(); // get actions
      expect(actions[0]).toEqual({
        // only action available should be removeExpense
        type: "REMOVE_EXPENSE",
        id: id,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value"); // get the value once for the ref
    })
    .then((snapshot) => {
      // pass snapshot arg to expect
      expect(snapshot.val()).toBeFalsy; // snapshot should be null (or Falsy) when called on item that doesnt exists (was deleted in this case)
      done(); // calls asnyc test to be finished
    });
});

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

test("Should edit expense in firebase correctly", (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = { amount: 21045 };
  store.dispatch(startEditExpense(id, updates)).then(() => {
    // because the promise was returned in expense.js (startEditExpense), i can add .then call
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "EDIT_EXPENSE",
      id,
      updates,
    });
    return database.ref(`users/${uid}/expenses/${id}`).once("value");
  }).then((snapshot) => {
    expect(snapshot.val().amount).toBe(updates.amount);
    done();
  });
});

test("Should setup addExpense action object w/ provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2],
  });
});

test("should add expense to database and store", (done) => {
  // done lets jest know assertions are asynchronous
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: "mouse",
    amount: 3000,
    note: "this one is better",
    createdAt: 1000,
  }; // for expense information needed when we call startAddExpense!
  // Promise chain to re-enact waiting for firebase database response
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions(); // getActions creates an array of all actions
      expect(actions[0]).toEqual({
        // action[0] should be only action we return from startAddExpense trail
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });
      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
    })
    .then(() => {
      expect(snapshot.val()).toEqual(expenseData); // async for firebase interaction
    });
  done();
});

test("should add expense with defaults to database and store", (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseDefaults = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0,
  }; // for expense information needed when we call startAddExpense!
  // Promise chain to re-enact waiting for firebase database response
  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions(); // getActions creates an array of all actions
      expect(actions[0]).toEqual({
        // action[0] should be only action we return from startAddExpense trail
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseDefaults,
        },
      });
      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
    })
    .then(() => {
      expect(snapshot.val()).toEqual(expenseDefaults); // async for firebase interaction
    });
  done();
});

test("Should set up set expense data action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses: expenses,
  });
});

test("Should fetch the expenses from firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    // grabs dummy firebase database data set up above
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses, // seed data from fixtures file is what should come back
    });
    done();
  });
});

// test("Should setup addExpense object w/ default values", () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       id: expect.any(String),
//       description: "",
//       note: "",
//       amount: 0,
//       createdAt: 0,
//     },
//   });
// }); // take out after redux-firebase integration
