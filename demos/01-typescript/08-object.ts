// Good practice: create a type alias for an object and use the object type
type Person = {
    name: string;
    readonly age: number;
    spouse?: string;
};

let john : Person = {
    name: 'John',
    age: 32,
    spouse: 'Jane'
};

// no spuse property - still ok!
let jane : Person = {
    name: 'Jane',
    age: 28
};

// john.age = 29; // error -> age is readonly