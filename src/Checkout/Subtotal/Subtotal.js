import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { SportsBasketball } from '@material-ui/icons'
import { useStateValue } from './StateProvider'
import { getBasketTotal } from '../../reudcer'
import { useHistory } from 'react-router-dom'

function Subtotal() {

    const history = useHistory();
    const [{basket} , dispatch] = useStateValue();

    let value = getBasketTotal(basket);
    return (
        <div className='subtotal'>
            
           
                        <p>
                            {/* Subtotal ({basket.length} items); */}
                            Subtotal ({basket.length} items):
                            {/* <strong>{`${value}`}</strong> */}
                            <strong> $ {value}</strong>
                        </p> 
                            <small className="subtotal__gift">
                                <input type="checkbox" name="" id="" />This Order contains a gift
                            </small>
                        
                               
            
              
          

            <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
