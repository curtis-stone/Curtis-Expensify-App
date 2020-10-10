const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Something went wrong!");
  }, 5000);
});

console.log('before')

promise.then((data) => {
  console.log('1', data);
}).catch((error) => {
    console.log('error : ', error)
});

// promise.then((data) => {
//     console.log('2', data);
//   });

// .then lets us register a callback if/when the promise resolves
// data = the information passed from resolved
// .catch(()=>{}) gives us access to error (1st arg) and lets us do something with it

console.log('after')

// PROMISE SYNTAX ALTERNATIVES

// .then() can take 2 arguments/functions and use w/ catch
// promise.then((data) => {
//     console.log('2', data);
// }, (error) => {
//     console.log('error: ', error)
//   });
  // 2 arguments, 2nd is the catch handler! (more confusing though)

  // PROMISE CHAINING
  const promiseTwo = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Curtis',
        age: 23
      });
    }, 5000);
  });

  promiseTwo.then((data) => {
    console.log('1', data);

    return 'some data';
  }).then((string) => {
    console.log('does this work?', string) // string is the data passed down from 1st then call
  }).catch((error) => {
      console.log('error : ', error)
  });

  // PASSING A NEW PROMISE IN A PROMISE CHAIN AS DATA VALUE
  const promiseThree = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Curtis',
        age: 23
      });
    }, 5000);
  });

  promiseThree.then((data) => {
    console.log('1', data);

    return new Promise((resolve, reject) => { // returns a new promise here
      setTimeout(() => {
        resolve('This is my other promise');
      }, 5000);
    });;
  }).then((string) => {
    console.log('does this work?', string) // string is the data passed down from 1st then call
  }).catch((error) => {
      console.log('error : ', error)
  });
