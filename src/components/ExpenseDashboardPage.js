import React from "react";

import ExpenseListFilters from "./ExpenseListFilters";

import ExpenseList from "./ExpenseList";

const ExpenseDashboardPage = (props) => (
  <div>
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
