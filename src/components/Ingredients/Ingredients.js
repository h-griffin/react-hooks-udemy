import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
    const [ userIngredients, setUserIngredients] = useState([]);

    useEffect(() => {
        console.log('rendering ingredients', userIngredients);
    }, [userIngredients]) //run only if user ingredient changed

    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        setUserIngredients(filteredIngredients);
      }, []);

    const addIngredientHandler = ingredient => {
        fetch('https://react-hooks-udemy-a2f00.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify( {ingredient} ), //firebase genrates id
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json(); //promise
        }).then(responseData => {
            setUserIngredients(prevIngredients => [
                ...prevIngredients, 
                {id: responseData.name, ...ingredient }
            ]);
        })
    };

    const removeIngredientHandler = ingredientId => {
        fetch(`https://react-hooks-udemy-a2f00.firebaseio.com/ingredients/${ingredientId}.json`, {
            method: 'DELETE',
        }).then(response => {
            // check if ingredient is th eone i want to delete
            setUserIngredients(prevIngredients => prevIngredients.filter((ingredient) => ingredient.id !== ingredientId) );
        })
    };

    return (
        <div className="App">
        <IngredientForm onAddIngredient={addIngredientHandler}/>

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
