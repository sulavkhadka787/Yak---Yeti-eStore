const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/Product");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  // later apply coupon
  // later calculate price

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
