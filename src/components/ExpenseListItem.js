import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListItem = (
  { description, amount, createdAt, id } // already not connected to store so default can be used in testing
) => (
  // destructuring used to seperate the properties passed from props.expenses in
  // mapSateToProps in the Expense List Component that this file is contained inside
  // of it's map function
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title"> {moment(createdAt).format("MMMM Do, YYYY")}</span>
    </div>
    <h3 className="list-item__data">{numeral(amount / 100).format("$0,0.00")} </h3>
  </Link>
);
// onClick calls remove action from actions.expense
// props are put in desctructured object (dispatch and id) b/c they're
// needed for remove button to work

// template string for LINK
// const mapStateToProps = (state) => {
//   return {
//     expense: state.expense,
//   };
// };

export default ExpenseListItem;

// code has been refactored and some calls to state and mapState/ reduxx store are no longer needed
