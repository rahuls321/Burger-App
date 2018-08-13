import * as actiontypes from '../actions/actionTypes';
import { updatedObject } from '../utility';


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
};

const authStart = () => {
    return {
        type: actiontypes.AUTH_START
    };
};

const authSuccess = (state, action) => {
    return updatedObject(state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updatedObject(state, {token: null, userId: null});
}

const reducer = ( state=initialState, action )=> {
    switch(action.type){
        case actiontypes.AUTH_START: return authStart(state, action)
        case actiontypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actiontypes.AUTH_FAIL: return authFail(state, action)
        case actiontypes.AUTH_LOGOUT: return authLogout(state, action)        
        default: 
            return state;
    }
};

export default reducer;