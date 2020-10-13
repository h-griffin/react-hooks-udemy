
- useState
    - replaces current state (NOT merge)
    - `onChange={event => {inputState[1]({ title: event.target.value})}}`
    - ^^ state title&amount, only change title, state no longer has amount
    - closure : react reuses event obj: second keystroke invalid

```
<input 
    type="text" 
    id="title" 
    value={inputState[0].title} 
    onChange={event => {
        const newTitle = event.target.value;
        inputState[1]( (prevInputState) => ({
            title: newTitle, 
            amount: prevInputState.amount 
        }))
    }}/>
```

- array destructuring

```const [ inputState, setInputState ] = useState( {title: '', amount: ''} );```
```
<input 
    type="text" 
    id="title" 
    value={inputState.title} 
    onChange={event => {
        const newTitle = event.target.value;
        setInputState( (prevInputState) => ({
            title: newTitle, 
            amount: prevInputState.amount 
        }))
    }}/>
```

- seperated
```
    const [ enteredTitle, setEnteredTitle ] = useState('');
    const [ enteredAmount, setEnteredAmount ] = useState('');
```
```
<input 
    type="text" 
    id="title" 
    value={enteredTitle} 
    onChange={event => {
        setEnteredTitle(event.target.value)
    }}/>
```