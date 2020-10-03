import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from '../selectors/expenses'

export const ExpenseList = (props) => ( // exported for testing w/o store connection
  <div>
    {props.expenses.length === 0 ? (
      <p>No Expenses</p>
    ) : (
      props.expenses.map((expense) => {
        // expenses prop from mapStateToProps, passes down its values to the
        // ExpenseListItem component!
        return <ExpenseListItem key = {expense.id} {...expense} />; // spread operator to get all properties off
        // the expense object
        // don't forget the key prop (should get an error saying this in console)
      })
    )};
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
    // whatever is returned from our selector function in selector's folder will show on screen
    // primarily for filter implementation
  };
};
// this function grabs the state and can return the properties from the state objects
// and make them available in another component's props

export default connect(mapStateToProps)(ExpenseList);
// connect is a react-redux library function that takes a function to grab data from state
// and connect it to another Component. in this case, it makes the data available in props
// for tge Expense List statless functional component!\
// connect is reactive and changes data as state data changes
// export for actual applicaton w/ store connection