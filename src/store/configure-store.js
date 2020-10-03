import { createStore, combineReducers } from "redux";
import expensesReducer from "../reducers/expenses-reducer";
import filtersReducer from "../reducers/filters-reducer";

export default () => {
  const store = createStore(
    combineReducers({
      // combineReducers cobines the reducers made above and store has 2
      // properties managed by seperate things
      expenses: expensesReducer,
      filters: filtersReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // line added to be able to use redux developer tools! 
    // ^^^ https://github.com/zalmoxisus/redux-devtools-extension
  );

  return store;
};

// Store creation
// const store = createStore(
//   combineReducers({
//     // combineReducers cobines the reducers made above and store has 2
//     // properties manaed by seperate things
//     expenses: expensesReducer,
//     filters: filtersReducer,
//   })
// );
