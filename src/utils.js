console.log('utils.js is running!');

export const square = (x) => x * x; // names export
const add = (a, b) => a + b;
// 2 types of exports: default exports & named exports

export default (a, b) => a - b;

export { add }; // named exports