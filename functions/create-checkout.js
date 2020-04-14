const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const inventory = require('./data/products.json');

exports.handler = async (event) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    success_url: `${process.env.URL}/success.html`,
    cancel_url: process.env.URL,
    line_items: [
        {
          name: 'T-shirt',
          description: 'Comfortable cotton t-shirt',
          amount: 1500,
          currency: 'usd',
          quantity: 2,
        },
      ],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};