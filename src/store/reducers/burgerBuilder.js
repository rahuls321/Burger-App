import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 20,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 2.5,
    cheese: 5.4, 
    meat: 9.3,
    bacon: 5.7
  };

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updatedObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updatedObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updatedObject(state, updatedSt);
}

const setIngredients = (state, action) => {
    return updatedObject(state, {
        ingredients:{
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 20,
        error: false
    });
}

const fetchIngredientFailed = (state, action) => {
    return updatedObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
    switch( action.type ){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientFailed(state, action);
        default: return state;
    }
};
 
export default reducer;