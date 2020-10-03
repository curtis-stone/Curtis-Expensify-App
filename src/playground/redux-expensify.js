import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// combineReducers allows us to create multiple functions on how redux changes

const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
}) => {
  return {
    type: "ADD_EXPENSE",
    expense: {
      id: uuid(), // npm uuid
      description,
      note,
      amount,
      createdAt,
    },
  };
};

// REMOVE EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// EDIT EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

// FILTER TEXT
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});

// SORT BY AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
});

// SORT BY DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE",
});

// SET START DATE
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate,
});

// SET END DATE
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate,
});

// Expenses Reducer
const expensesReducerDefaultState = [];

// defined state on a constant to make code more readable

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      //    return state.concat(...action) // concat used instead of push so original array is not changed
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => {
        // filter used to not change the original array
        return id !== action.id; // returns true of item's id foes not equal action's id
      });
    case "EDIT_EXPENSE":
      // go through evey expense in array and find match bby using .map, when match is found we
      // directly change the match with the action.id
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

// Filters Reducer
const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};
// defined state on a constant to make code more readable

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text,
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate,
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};
// timestamps
// January 1st 1970 (unix epoch)

// GET VISIBLE EXPENSES
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch; // if any are not true the will not be visible
  }).sort((a, b) => {
    if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
    }
    else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
    }
  });
};

// Store creation
const store = createStore(
  combineReducers({
    // combineReducers cobines the reducers made above and store has 2
    // properties manaed by seperate things
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 800, createdAt: -1000 })
);

const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 300, createdAt: -1000 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(
//   editExpense(expenseTwo.expense.id, { description: "Tea", amount: 500 })
// );

// store.dispatch(setTextFilter("E"));
// store.dispatch(setTextFilter());
// store.dispatch(sortByDate());
store.dispatch(sortByAmount());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

const demoState = {
  expenses: [
    {
      id: "asd123",
      description: "rent",
      note: "this was the final payment for that address",
      amount: 54500, // in pennies to ake math easier
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "date", // date or amount
    startDate: undefined,
    endDate: undefined,
  },
};

const user = {
  name: "jen",
  age: 22,
};

// console.log({
//     age:27,
//     ...user, // use yarn to add babeljs's 'transform-object-rest-spread' plugin to use the spread
//             // operator in objects & name it in babelrc file in plugins
//     location: "Norcross",

// })
