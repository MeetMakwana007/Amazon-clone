const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const { request, response } = require("express");
const stripe = require('stripe')('sk_test_51JDl1sSHxJWwnrplZWIqafSICTvMKimVI6A4WU4OZcVpzwplVuDmoHHGApI5s8fa5p8KAmHZ08Pl9Z4Z4fHHanyY00uOnQ2Siw')

const app = express()

app.use(cors({origin:true}))

app.use(express.json())



app.get('/',(request,response)=> response.status(200).send('hello world'))



app.post('/payment/create',async (req,res)=>{
    const total = req.query.total;

    console.log('Paymet req: ',total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd'
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})


exports.api = functions.https.onRequest(app)




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
