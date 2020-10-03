import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";

import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from "../actions/filters";

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null, // the dates that we are focusing on
  };
  onDatesChange = ({ startDate, endDate }) => {
    // react-dates library calls this function with an object that has a startDate and endDate
    // destructure these from that object: {startDate, endDate}
    // dispatch the actions to get these to change: setStartDate & setEndDate
    // this.props.dispatch(setStartDate(startDate))
    // this.props.dispatch(setEndDate(endDate))
    // sets start and end dates to the date called by in the react-dates library
    // ^ above is commented out for the dispatch testing purposes below!
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused: calendarFocused }));
    //implicitly sets the state calendarFocus value of null to the dates picked
  };
  onTextChange = (e) => {
    // this.props.dispatch(setTextFilter(e.target.value));
    this.props.setTextFilter(e.target.value);
  };

  onSortChange = (e) => {
    // if (e.target.value === "date") {
    //     this.props.dispatch(sortByDate());
    // } else if (e.target.value === "amount") {
    //     this.props.dispatch(sortByAmount());
    // }
    if (e.target.value === "date") {
      this.props.sortByDate();
    } else if (e.target.value === "amount") {
      this.props.sortByAmount();
    }
  };
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={this.onTextChange}
        />
        <select value={this.props.filters.sortBy} onChange={this.onSortChange}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          startDateId="your_unique_start_date_id"
          endDate={this.props.filters.endDate}
          endDateId="your_unique_end_date_id"
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused} // from state above
          onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDates={true}
        />
      </div>
    );
  }
}

// Value sets the value of our inputs
// we have access to dispatch in components connected to the store!
// use dispatch to log key strokes in input and make changes to the 'text' property in filters
// This component is writing to the store and changing redux store!
// "Controlled Inputs"

const mapStateToProps = (state) => {
  // state gains access to entire state and we return
  // whatever we want
  return {
    filters: state.filters, // in this case we return the state.filters as a property value
    // in an object
  };
}; // can be restructured to return implicitly

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
// connects the store witht he return function and desired target component
