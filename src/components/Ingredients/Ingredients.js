import React, { useReducer, useState, useEffect, useCallback, useRef } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

//outside so it is not rerenderes
const ingredientReducer = (currentIngredients, action) => {
    switch (action.type){
        case 'SET':
            return action.ingredients;
        case 'ADD':
            return [...currentIngredients, action.ingredient];
        case 'DELETE':
            return currentIngredients.filter(ing => ing.id !== action.id);
        default: 
            throw new Error('[ingredientReducer] should not get here');
    }
}

const httpReducer = (curHttpState, action) => {
    switch(action.type){
        case 'SEND':
            return {loading: true, error: null};
        case 'RESPONSE':
            return {...curHttpState, loading: false};
        case 'ERROR':
            return {loading: false, error: action.errorMessage};
        case 'CLEAR':
            return{...curHttpState, error: null};
        default: 
            throw new Error('[httpReducer] should not get here');
    }
}

function Ingredients() {
    // const [isLoading, setIsLoading ] = useState(false);
    // const [error, setError] = useState();
    // const [ userIngredients, setUserIngredients] = useState([]);
    const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
    const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null});

    useEffect(() => {
        console.log('rendering ingredients', userIngredients);
    }, [userIngredients]) //run only if user ingredient changed

    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        // setUserIngredients(filteredIngredients);
        dispatch({type: 'SET', ingredients: filteredIngredients})
      }, []);

    const addIngredientHandler = ingredient => {
        // setIsLoading(true);
        dispatchHttp({type:'SEND'});
        fetch('https://react-hooks-udemy-a2f00.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify( {ingredient} ), //firebase genrates id
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            // setIsLoading(false);
            dispatchHttp({type: 'RESPONSE'});
            return response.json(); //promise
        }).then(responseData => {
            // setUserIngredients(prevIngredients => [
            //     ...prevIngredients, 
            //     {id: responseData.name, ...ingredient }
            // ]);
            dispatch({type: 'ADD', ingredient: {id: responseData.name, ...ingredient }})
        })
    };

    const removeIngredientHandler = ingredientId => {
        // setIsLoading(true);
        dispatchHttp({type: 'SEND'});
        fetch(`https://react-hooks-udemy-a2f00.firebaseio.com/ingredients/${ingredientId}.json`, {
            method: 'DELETE',
        }).then(response => {
            // setIsLoading(false);
            dispatchHttp({type: 'RESPONSE'});
            // check if ingredient is th eone i want to delete
            // setUserIngredients(prevIngredients => prevIngredients.filter((ingredient) => ingredient.id !== ingredientId) );
            dispatch({type:'DELETE', id: ingredientId})
        }).catch(error => {
            // setError('something went wrong!')
            dispatchHttp({type: 'ERROR', errorMessage: '[removeIngredientHandler] something went wrong'});
        })
    };

    const clearError = () => {
        // setError(null);
        // setIsLoading(false);
        dispatchHttp({type: 'CLEAR'});
    }

    return (
        <div className="App">
            {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
        <IngredientForm 
            onAddIngredient={addIngredientHandler}
            loading={httpState.loading}
        />

        <section>
            <Search onLoadIngredients={ filteredIngredientsHandler }/>
            <IngredientList 
                ingredients={userIngredients}
                onRemoveItem={removeIngredientHandler}
                />
        </section>
        </div>
    );
}

export default Ingredients;
