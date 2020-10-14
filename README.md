# react hooks ( React 16.8^ )

## links 
- [understanding closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)


- functional 
    - props in jsx out
    - for presentation
    - one or few purposes

- class
    - props adn state
    - buisness logic goes here
    - orchestrates componetns

- converting these are annoying 
- lifecycle hooks can be hard to use to make sure things are ran at the right time

- react hooks can allow **functional components only**
    - state management
    - life cycle hooks

- hooks
    - js funtions can only be used from inside other func components or other hooks
    - named `useXYZ()` (useState)
    - reuseable & build custom
    - can be stateless logic
    - cannot be nested, must be used at root
    - cannot be in `if` statement

- [useState](notes/useState.md)

- sending HTTP
    - fetch default get
    - db want post
    - pass obj describing data

- use Effect
    - root of function component
    - acts like `componentDidUpdate`
    - default runs after every component render cycle
    - set when to run ^^
    - with `[]` as a second argument it runs once after first render like `componentDidMount`
    - can return something, must be function
    - if [] cleanup goes when **unmounted**

- useCallBack
    - with `[]` as a second argument
    - caches function to survive rerender cycles

