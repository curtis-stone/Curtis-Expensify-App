import moment from 'moment';

// Filters Reducer
const filtersReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: moment().startOf('month'), // sets moment to beginning of month
    endDate: moment().endOf('month'), // // sets moment to end of month (see moment js doc.)
  };
  // defined state on a constant to make code more readable
  
  const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
      case "SET_TEXT_FILTER":
        return {
          ...state,
          text: action.text,
        };
      case "SORT_BY_AMOUNT":
        return {
          ...state,
          sortBy: "amount",
        };
      case "SORT_BY_DATE":
        return {
          ...state,
          sortBy: "date",
        };
      case "SET_START_DATE":
        return {
          ...state,
          startDate: action.startDate,
        };
      case "SET_END_DATE":
        return {
          ...state,
          endDate: action.endDate,
        };
      default:
        return state;
    }
  };
  // timestamps
  // January 1st 1970 (unix epoch)

  export default filtersReducer;