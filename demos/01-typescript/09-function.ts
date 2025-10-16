// function declaration syntax
// SYNTAX 1
// return type is inferred
function add1( x : number | string, y : number | string ) /*: string | number */ {
    // type narrowing
    if ( typeof x === 'number' && typeof y === 'number' ) {
        return x + y;
    }

    if ( typeof x === 'string' && typeof y === 'string' ) {
        return x + ' ' + y;
    }

    throw new Error( 'arguments must both be number / both be strings' );
    // throw "wong argument"; // you can throw non-Error values
}

try {
    add1( 12, 13 );
    add1( "Hello", "World" );
    add1( 12, "Thirteen" );
} catch( error ) {
    // if( error instanceof Error ) {
    //     console.log( error.message );
    // } else {
    //     console.log( error );
    // }

    console.log( (error as Error).message );
}

// SYNTAX 2
// function expression syntax
const add2 : ( a : number, b : number ) => number = function( x, y ) {
    return x + y;
}

// arrow function
const add3 : ( a : number, b : number ) => number = ( x, y ) => {
    return x + y;
};

// for higher-order function - a function that takes a function as an arguments, or returns a function
// foo() -> 12
// foo() -> new Sheet();
// foo() -> [ new Sheet(), new Sheet() ];
// const bar = foo();
// bar();

// baz( 1, 2 )
// baz( [ 1, 2 ], [ 3, 4 ] );
// baz({
//     name: 'John',
//     age: 32
// })
// baz( bar )

type CartItem = {
    name: string,
    quantity: number,
    price: number
};

type Cart = {
    cart: CartItem[]
};

type AjaxCallback = ( cart : Cart ) => void;

const ajax = function( url : string, callback : ( cart : Cart ) => void ) {
    // make a call to the backend url

    const data = {
        cart: [
            { name: 'Pen', quantity: 2, price: 50 },
            { name: 'Pencil', quantity: 10, price: 5 }
        ]
    };

    callback( data );
};

ajax(
    "http://localhost:8080/api/cart",
    function( data : Cart ) {
        console.log( data );
    }
)