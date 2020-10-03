import React from "react";
import { connect } from "react-redux";
import { editExpense, removeExpense } from "../actions/expenses";

import ExpenseForm from "./ExpenseForm";

export class EditPage extends React.Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push("/");
  };
  onRemove = () => {
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onRemove}> Remove </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: (expense) => dispatch(removeExpense(expense)) // see enzyme docs for props syntax
}); // for tests

const mapStateToProps = (state, props) => {
// props used in argument to get the matching id like above ^
return {
  expense: state.expenses.find(
    (expense) => expense.id === props.match.params.id
  )
// find ARRAY method used to search through an array and look for a single item. Returns bool
// returns true if expense id matches match.params.id and object is returned
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
// undefined in place of mapStateToProps now for testing purposes
