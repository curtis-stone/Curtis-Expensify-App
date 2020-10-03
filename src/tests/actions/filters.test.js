import { 
    setEndDate, 
    setStartDate, 
    sortByAmount, 
    sortByDate, 
    setTextFilter } from '../../actions/filters'
import moment from 'moment';

test('Should generate set start date action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type:'SET_START_DATE',
        startDate: moment(0)
    });
});

test('Should generate set end action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
})

test('Should set sort by amount object', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})
test('Should set sort by date object', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
})
test('Should set text filter object w/ data provided', () => {
    const textData = {
        text: 'test text data'
    }
    const action = setTextFilter(textData)
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: {
            ...textData
        }
    })
})
test('Should set text filter w/ default', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type:   'SET_TEXT_FILTER',
        text: ''
    })
})