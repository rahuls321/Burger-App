import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


// const INGREDIENT_PRICES = {
//   salad: 2.5,
//   cheese: 5.4, 
//   meat: 9.3,
//   bacon: 5.7
// };

class BurgerBuilder extends Component {
  
  // constructor(props){
  //   super(props);
  //   this.state = {...};
  // }
  

  state = {
    // ingredients: 0
    // totalPrice : 20,
    // purchasable: false, 
    purchasing: false,
    // loading: false, 
    // error: false
  }

  componentDidMount () {
    console.log(this.props);
    this.props.onInitIngredients()
  }

  updatePurchasable (ingredients) {
      const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
          return sum+el;
        }, 0);
      // this.setState({purchasable: sum > 0});
      return sum > 0;
  }

  // addIngredientHandler = (type) => {
  //     const oldCount = this.state.ingredients[type];
  //     const updatedCount = oldCount + 1;
  //     const updatedIngredients = {
  //       ...this.state.ingredients
  //     };
  //     updatedIngredients[type] = updatedCount;
  //     const priceAddition = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice + priceAddition;
  //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //     this.updatePurchasable(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //     const oldCount = this.state.ingredients[type];
  //     if(oldCount <= 0){
  //       return;
  //     }
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredients = {
  //       ...this.state.ingredients
  //     };
  //     updatedIngredients[type] = updatedCount;
  //     const priceDeduction = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice - priceDeduction;
  //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //     this.updatePurchasable(updatedIngredients);
  // }

  purchaseHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({purchasing: true})
    }
    else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    // alert("You can continue!");
   
    // const queryParams = [];
    // for(let i in this.props.ings){
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString
    // });
    this.props.history.push('/checkout');
  }

  
  render(){
    const disabledInfo = {
      ...this.props.ings
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    } 
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded! </p> : <Spinner />;

    if(this.props.ings){
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BurgerControls 
              ingredientAdded = {this.props.onIngredientAdded}
              ingredientRemoved = {this.props.onIngredientRemoved}
              disabled={disabledInfo}
              purchasable={this.updatePurchasable(this.props.ings)}
              ordered={this.purchaseHandler}
              isAuth={this.props.isAuthenticated}
              price = {this.props.price} />
        </Aux>
      );
      orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            price = {this.props.price}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}/>
    }
    // if( this.state.loading ){
    //   orderSummary = <Spinner />;
    // }
    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
          {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)) ,
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));