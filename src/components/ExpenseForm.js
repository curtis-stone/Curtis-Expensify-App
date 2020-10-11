import React from "react";
import moment from "moment";
// moment is the standard for dates

import { SingleDatePicker } from "react-dates";

// airbnb's date picker. google for doc. https://github.com/airbnb/react-dates w/ css

// const now = moment();
// console.log(now.format("MMMM Do, YYYY: h:mm:ss a"));

class ExpenseForm extends React.Component {
  //constructor used to get props already passed in if they're available (edit expense page)
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      // must convert cents to dollars and then set it as a string to get the right value
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      errorState: "",
    };
  }

  // local component state. // we will only listen to changes in state in
  // this component and when the add expense button is pressed will we send
  // the changes to redux and change app state

  onDescriptionChange = (e) => {
    const description = e.target.value; // put input value in a variable
    this.setState(() => ({ description })); // implicitly return an object w/ description as property
  };
  // sets input text to the description value in this component's state

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    // regular expression from regex101.com
    // regex101.com to create regular expressions!
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      // reg express for numbers only and 2 spaces after decimal!
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState({ createdAt });
    }
  };
  onFocusChange = ({ focused }) =>
    this.setState(() => ({ calendarFocused: focused }));

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      // Sets error state equal to 'Please provide description and amount.'
      this.setState(() => ({
        errorState: "Please provide a description and an amount.",
      }));
      console.log(this.state.errorState);
    } else {
      // clears the error so expense can be submitted
      this.setState(() => ({ errorState: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        // converts amount string to number, base 10
        // * 100 takes value from being in cents and converts it to dollars
        note: this.state.note,
        createdAt: this.state.createdAt.valueOf(),
        // takes moment object and makes it a regulat number
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.errorState !== "" && (
          <p className="form__error">{this.state.errorState}</p>
        )}
        <input
          type="text"
          placeholder="Description"
          autoFocus
          className="text-input"
          value={this.state.description} // creates a read only input
          onChange={this.onDescriptionChange} // fixes read only problem
        />
        <input
          className="text-input"
          type="text"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt} // momentPropTypes.momentObj or null
          onDateChange={this.onDateChange} // PropTypes.func.isRequired
          focused={this.state.calendarFocused} // PropTypes.bool
          onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
          id="your_unique_id" // PropTypes.string.isRequired,
          numberOfMonths={1}
          isOutsideRange={() => false} // makes every day in past/future avilable to us
        />
        <textarea
          className="text-area"
          placeholder="Add a note for your expense (optional)"
          value={this.state.note}
          onChange={this.onNoteChange}
        ></textarea>
        <div >
          <button className="button">Save Expense</button>
        </div>
      </form>
    );
  }
}

export default ExpenseForm;
