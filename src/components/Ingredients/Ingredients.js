import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
    const [ userIngredients, setUserIngredients] = useState([]);

    const addIngredientHandler = ingredient => {
        fetch()

        setUserIngredients(prevIngredients => [
            ...prevIngredients, 
            {id: Math.random().toString(), ...ingredient }
        ] );
    };

    const removeIngredientHandler = ingredientId => {
        // check if ingredient is th eone i want to delete
        setUserIngredients(prevIngredients => prevIngredients.filter((ingredient) => ingredient.id !== ingredientId) );
    }

    return (
        <div className="App">
        <IngredientForm onAddIngredient={addIngredientHandler}/>

        <section>
            <Search />
            <IngredientList 
                ingredients={userIngredients}
                onRemoveItem={removeIngredientHandler}
                />
        </section>
        </div>
    );
}

export default Ingredients;
