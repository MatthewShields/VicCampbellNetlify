const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    console.log(process.env.URL);
  const { image, name, description, amount, quantity, returnURL } = JSON.parse(event.body);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    success_url: `${process.env.URL}/success.html`,
    cancel_url: returnURL,
    line_items: [
        {
          images: [image],
          name: name,
          description: description,
          amount: amount,
          currency: 'usd',
          quantity: quantity,
        },
      ],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: process.env.STRIPE_PUBLISHABLE_KEY,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};
