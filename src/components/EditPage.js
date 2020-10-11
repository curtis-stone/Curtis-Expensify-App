import React from "react";
import { connect } from "react-redux";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

import ExpenseForm from "./ExpenseForm";

export class EditPage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push("/");
  };
  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
          <button className="button button--secondary" onClick={this.onRemove}>
            {" "}
            Remove Expense{" "}
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(editExpense(id, expense)),
  startRemoveExpense: (expense) => dispatch(startRemoveExpense(expense)), // see enzyme docs for props syntax
}); // for tests

const mapStateToProps = (state, props) => {
  // props used in argument to get the matching id like above ^
  return {
    expense: state.expenses.find(
      (expense) => expense.id === props.match.params.id
    ),
    // find ARRAY method used to search through an array and look for a single item. Returns bool
    // returns true if expense id matches match.params.id and object is returned
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
// undefined in place of mapStateToProps now for testing purposes
