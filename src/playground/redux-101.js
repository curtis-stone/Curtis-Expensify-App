import { createStore } from "redux";

// Action Generators = functions that return action objects
const incrementCount = ({ incrementBy = 1} = {}) => { // destructuring used to simplify incrementBy
  return {
    type: 'INCREMENT',
    incrementBy
  }
};

const decrementCount = ( { decrementBy = 1 } = {}) => {
  return {
    type: 'DECREMENT',
    decrementBy
  }
};

const setCount = ( { count } ) => {
  return {
    type: 'SET',
    count
  }
}

const resetCount = () => ({
  type: 'RESET'
})

// The REDUCER
// can have multiple reducers
// 1. They are pure functions (relies solely on input/arguments and not outside variables)
// 2. Never change state or action
// REDUCER is below!

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      // const incrementBy =
      //   typeof action.incrementBy === "number" ? action.incrementBy : 1;
      // if action.increment by is a number, use that number. Else, use 1
      // const removed becuas eit is defined in the action generator function!
      return {
        count: state.count + action.incrementBy, // used action. to access incrementBy in the function above
        // increments 1 by default or whatever number is defined in incrementBy in the dynamic action
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy,
      };
    case "SET":
      return {
        count: action.count,
      };
    case "RESET":
      return {
        count: 0
      };

    default:
      return state;
  }
}

// call the reducer in createStore function
const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
}); // .subscribe watches for changes in store's state!

// Actions to change the data store. 2nd argument in createStore!

// Actions -> an object that gets sent to the store
// increment, decrement, reset: CONVENTION IS TO BE IN UPPERCASE AND _ TO SEPERATE WORDS

//Increment
// regular action
// store.dispatch({
//   type: "INCREMENT",
// });

// unsubscribe(); // const from above .. store.subrcribe...

// dynamic action
// store.dispatch({
//   type: "INCREMENT",
//   incrementBy: 5,
// });

store.dispatch(incrementCount({ incrementBy: 5 }))
store.dispatch(decrementCount({decrementBy: 10}))
store.dispatch(setCount({count: 500}))
store.dispatch(resetCount())

// store.dispatch({
//   type: "RESET",
// });

// store.dispatch({
//   type: "DECREMENT",
// });

// // dynamic action
// store.dispatch({
//   type: "DECREMENT",
//   decrementBy: 7,
// });

// store.dispatch({
//   type: "SET",
//   count: 101,
// });

// store.dispatch(incrementCount({incrementBy: 20})) // Action generator function