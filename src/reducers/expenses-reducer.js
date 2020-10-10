
// Expenses Reducer
const expensesReducerDefaultState = [];

// defined state on a constant to make code more readable

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      //    return state.concat(...action) // concat used instead of push so original array is not changed
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => {
        // filter used to not change the original array
        return id !== action.id; // returns true of item's id foes not equal action's id
      });
    case "EDIT_EXPENSE":
      // go through evey expense in array and find match bby using .map, when match is found we
      // directly change the match with the action.id
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
      case "SET_EXPENSES":
        return action.expenses; // action object already has expneses on it
    default:
      return state;
  }
};

export default expensesReducer;