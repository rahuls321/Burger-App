import * as actionTypes from './actions';


const initialState = {
    ingredients: {
        salad: 1,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 20
};

const INGREDIENT_PRICES = {
    salad: 2.5,
    cheese: 5.4, 
    meat: 9.3,
    bacon: 5.7
  };

const reducer = (state = initialState, action) => {
    switch( action.type ){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
};
 
export default reducer;