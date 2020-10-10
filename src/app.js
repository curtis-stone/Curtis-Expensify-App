import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "normalize.css/normalize.css"; // this css reset browser css base and allows styles to work in cross-browser settings!
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import AppRouter from "./routers/AppRouter";
import './firebase/firebase'


//Redux imports
import configureStore from "./store/configure-store";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";

const store = configureStore();

// store.dispatch(addExpense({ description: "water bill", amount: 4500 }));
// store.dispatch(addExpense({ description: "gas bill", createdAt: 1000 }));
// store.dispatch(addExpense({ description: "rent", amount: 4500 }));
// store.dispatch(setTextFilter("water"));

// setTimeout(() => {
//     store.dispatch(setTextFilter("bill"));
// }, 3000)

// const state = store.getState();
// ^ gives us access to the current filters and expenses on state to call with getVisibleExpenses in its arguments
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// taken out so it can be done with application interaction instead of hard coding
// console.log(visibleExpenses);

const jsx = (
  <Provider store={store}> 
  <AppRouter />
  </Provider>
);

// Provider component must have a prop that points to your redux store

ReactDOM.render(jsx, document.getElementById("app"));
// yarn add moment@2.18.1 react-dates@12.7.0 react-addons-shallow-compare@15.6.0
// react-addons-shallow-compare@15.6.0 = a utility used by react-dates so it IS needed, 
// react-dates is not updated to not require this dependency