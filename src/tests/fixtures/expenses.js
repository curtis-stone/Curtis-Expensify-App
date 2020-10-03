import moment from 'moment'

// expenses array
export default [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0
},
{
    id: '2',
    description: 'Rent',
    note: '',
    amount: 114500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
},
{
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
}];
// test data for this file. an array of expenses objects to be used in test cases!