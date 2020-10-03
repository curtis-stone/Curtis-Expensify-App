const isAdult = (x) => {
    return x >= 18
    // if(x >= 18) {
    //     return 'is an adult'
    // }
    // else {
    //     'is not an adult!'
    // };
};

const canDrink = (x) => {
    return x >= 21
    // if(x >= 21) {
    //     return 'they can drink'
    // } 
    // else {
    //     'they cannot drink!'
    // };
};
export default (x) => x >= 65
export { canDrink, isAdult }