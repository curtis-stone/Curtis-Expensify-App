import React from "react";
import { Link } from "react-router-dom";

const ExpenseListItem = ({ description, amount, createdAt, id }) => ( // already not connected to store so default can be used in testing
  // destructuring used to seperate the properties passed from props.expenses in
  // mapSateToProps in the Expense List Component that this file is contained inside
  // of it's map function
  <div>
    <Link to={`/edit/${id}`}> 
      <h3>{description}</h3>
    </Link>
    <p>
      {" "}
      {amount} - {createdAt}
    </p>
  </div>
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
