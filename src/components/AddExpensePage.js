import React from "react";
import { connect } from "react-redux";
import { startAddExpense } from "../actions/expenses";

import ExpenseForm from "./ExpenseForm";

export class AddExpensePage extends React.Component {
  // exported for testing
  onSubmit = (expense) => {
    // props.dispatch(addExpense(expense));
    this.props.startAddExpense(expense);
    this.props.history.push("/"); // sends back to dashboard onSubmit w/o page refresh (Browser Routing)
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense)),
});
//implicitly return an object
// added to make this component easy to test (mapDisptchTOProps & props.onSubmit...) it merges the props from import component into this compoonent

// onSubmit called when we submit valid data! We will get expense object w/ all propertires
// description, amount, note, and createdAt
// called in props so that ExpenseForm can be reused in other Components
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
// lets component use props too and access to store
