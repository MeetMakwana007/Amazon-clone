import React, { useEffect } from 'react'
import CheckoutProduct from '../../Checkout/CheckoutProduct';
import { useStateValue } from '../../Checkout/Subtotal/StateProvider'
import './Payment.css'
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { getBasketTotal } from '../../reudcer'
import axios from './axios'
import { db } from '../../firebase';


function Payment() {

    const [{basket,user},dispatch] = useStateValue();
    const history = useHistory()
    const [error,setError] = useState(null);
    const [disabled,setDisabled] = useState(true);

    const [clientSecret,setClientSecret] = useState(true);
    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing] = useState(""); 

    useEffect(()=>{
        //generate special stripe secret for charge customer
        const getClientSecret = async() =>{
            const response = await axios({
                method: 'post',
                url: `/payment/create?total=${getBasketTotal(basket) * 100}`
            });

            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    },[basket])

    console.log(clientSecret);
    const stripe = useStripe();
    const elements = useElements();

    let value = getBasketTotal(basket);

    const handleSubmit = async event =>{
            event.preventDefault();
            setProcessing(true);

            const payload = await stripe.confirmCardPayment(clientSecret,{
                payment_method:{
                    card: elements.getElement(CardElement)
                }
            }).then(({paymentIntent}) =>{
                    //paymentIntent = payment Confirmation
                console.log(paymentIntent);

                    db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                        basket: basket,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created
                    })
                
                setSucceeded(true);
                setError(null);
                setProcessing(false)

                dispatch({
                    type: 'EMPTY_BASKET'
                })

                history.replace('/orders')

            })

    }

    const handleChange = event =>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className="payment__container">
                <h1>
                    Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
                </h1>


                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                <div className="payment__section">
                <div className="payment__title">
                    <h3>Review items and Delivery</h3>
                </div>

                <div className="payment__items">
                    {basket.map(item=>(
                    <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}/>
                ))}

                </div>
                </div>
                <div className="payment__section">
                        <div className="payment__title">
                            <h3>Payment Method</h3>
                        </div>
                            
                        <div className="payment__details">
                        <form onSubmit={handleSubmit} action="">
                                <CardElement onChange={handleChange}/> 
                            <div className="payment__priceContainer">
                                <h3> Order Total : $ {value} </h3>
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                </button>
                            </div>
                        {error && <div>{error}</div>}

                        </form>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
