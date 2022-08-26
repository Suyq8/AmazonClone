const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email, address, state, country, zipcode } = req.body;

  const transformedItems = items.map(item => ({
    quantity: item.quantity,
    price_data: {
      currency: 'usd',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    }
  }));

  const session = await stripe.checkout.sessions.create({
    shipping_options: [{ shipping_rate: 'shr_1LZ4jYECXYl0vudY910Rh9Fw' },],
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
      address,
      state,
      country,
      zipcode
    }
  });

  res.status(200).json({ id: session.id });
}