import moment from 'moment';

// most complex function
// GET VISIBLE EXPENSES
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
      const createdAtMoment = moment(expense.createdAt)
      // puts the expenses's createdAt timestamp in a variable to we can pass it into our 
      // startDateMatch Filter!
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true; 
      // see moment js query section in docs to see all valid arguments for isSameOrBefore()
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day'): true
      // we'll never filter out an expense if there is no start or end date so second option in 
      // ternary operator will be true
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
  
      return startDateMatch && endDateMatch && textMatch; // if any are not true the will not be visible
    }).sort((a, b) => {
      if (sortBy === 'date') {
          return a.createdAt < b.createdAt ? 1 : -1;
      }
      else if (sortBy === 'amount') {
          return a.amount < b.amount ? 1 : -1;
      }
    });
  };
  
  export default getVisibleExpenses;