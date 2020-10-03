// Object Destructuring (Uncomment and run file in webpack to see differences!)
// console.log('destructuring');

// const person = {
//     name: 'CJ',
//     age: '23',
//     location: {
//         city: 'Norcross',
//         temp: 89
//     }
// }

// const { name: firstName = 'Anonymous', age } = person; // ES6 'Object Destructuring feature that lets us take apart 
//                               //object propeties intotheir own variables in one line!

// console.log(`${firstName} is ${age}.`)

// const {temp: temperature , city} = person.location; // destructuring works on nested objects!
//                                                     // temp: is renaming syntax to change property name

// if (city && temperature) {
//     console.log(`it's ${temperature} in ${city}.`)
// }
 

// const book = {
//     title: 'ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher : {
//         name: 'Penguin'
//     }
// };

// const { name: publisherName = 'Self-Published' } = book.publisher

// if (publisherName) {
// console.log(`${publisherName}`) // Penguin, if no name use default 'self published'
// }


// Array Destructuring

const address = [ '1299 South Juniper Street', 'Norcross', 'Georgia', '30093']

//destructure array by pulling itmes off the array
const [ , city, state = 'Florida' ] = address;
// in objects we uses brackets,not braces
// new variable names are configured by array position number!
// leave unnamed spaces to exclude an array item
// there is no renaming syntax

console.log(`You are in ${city} ${state}. `)

//Challenge

const item = [ 'Coffee (hot)', , '$2.50',  ]

const [ itemName, smallPrice, mediumPrice, largePrice] = item

console.log(`A medium ${itemName} costs ${mediumPrice}`)