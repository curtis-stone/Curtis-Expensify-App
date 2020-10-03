import filtersReducer from '../../reducers/filters-reducer';
import moment from 'moment';

// use @@INIT to test the default values (see redux tools in dev-server)

test('should setup default filter values', ()=> {
    const state = filtersReducer(undefined, {
        type:'@@INIT' 
        // 1st argumnt is current state, so we pass undefined to test the default value of state from filtersReducer
        // 2nd arg is our action object equal to @@INIT to test defaults
    });
    expect(state).toEqual({
        text: "",
        sortBy: "date",
        startDate: moment().startOf('month'), // sets moment to beginning of month
        endDate: moment().endOf('month'),
    });
}) // true

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {
        type: 'SORT_BY_AMOUNT'
    })
    expect(state.sortBy).toBe('amount')
})

test('should sort by date', () => {
    const currentState = {
        text: "",
        sortBy: "amount",
        startDate: undefined, // sets moment to beginning of month
        endDate: undefined,
    }
    const action = { type: 'SORT_BY_DATE' }
    const state = filtersReducer(currentState, action)
    expect(state.sortBy).toBe('date')
})

test('should set text filter', () => {
    const action = {type: 'SET_TEXT_FILTER', text: 'this is my filter'}
    const state = filtersReducer(undefined, action)
    expect(state.text).toBe('this is my filter')
})

test('should set startDate filter', () => {
    const action = {type: 'SET_START_DATE', startDate: moment().startOf('day')}
    const state = filtersReducer(undefined, action)
    expect(state.startDate).toEqual(moment().startOf('day'))
})

test('should set endDate filter', () => {
    const action = {type: 'SET_END_DATE', endDate: moment().endOf('hour')}
    const state = filtersReducer(undefined, action)
    expect(state.endDate).toEqual(moment().endOf('hour'))
})