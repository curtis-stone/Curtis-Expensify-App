import selectExpensesTotal from '../../selectors/expenes-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const response = selectExpensesTotal([]);
    expect(response).toBe(0);
});

test('should correctly add up a single expense', () => {
    const response = selectExpensesTotal([expenses[0]]);
    expect(response).toBe(195);
});

test('should correctly add up a multiple expenses', () => {
    const response = selectExpensesTotal(expenses); // entire expenses array
    expect(response).toBe(119195);
});