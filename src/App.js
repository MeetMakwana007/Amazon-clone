import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Header from './Header/Header';
import Home from './Home/Home';
import Checkout from "./Checkout/Checkout";
import Login from "./Login/Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./Checkout/Subtotal/StateProvider";
import Payment from "./Payment/Checkout/Payment";
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Orders from "./Orders/Orders";


const promise = loadStripe('pk_test_51JDl1sSHxJWwnrpl2DhrD1BDqXpXVR29fQh2Mv02KyGVfVWgnlP7ry1rTxdmx8pxOxAIEPhqTrnZNZ8VG2ycZY5E00LAK3cJqj');
console.log(promise);

function App() {

  const [{},dispatch] = useStateValue();

  useEffect(() => {   
    

    auth.onAuthStateChanged(authUser => {
      console.log(authUser);
      
      if(authUser){
        //user is logged in

        dispatch({
          type:'SET_USER',
          user: authUser
        })
      }else{
        //user is loged out
        dispatch({
          type: 'SET_USER'
          , user: null
        })
      }
    })
  }, [])
  return (
    <Router>
    <div className="app">
     
   
      <Switch>
        
      <Route path="/login">
       <Login />
      </Route>

      <Route path="/orders">
      <Header/>
       <Orders />
      </Route>

        <Route path="/checkout">
          <Header/>
          <Checkout />
          
        </Route>

        <Route path="/payment">
          <Header/>

          <Elements stripe={promise}>       
             <Payment />
             </Elements>
        </Route>

        <Route  path='/'>
          <Header/>
          <Home />
        </Route>
      </Switch>
      
    </div>
    </Router>
  );
}

export default App;
