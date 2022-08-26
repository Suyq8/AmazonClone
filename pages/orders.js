import React from 'react'
import Header from '../components/Header'
import { useSession, getSession } from 'next-auth/react'
import database from '../firebase';
import { orderBy, query, getDocs, collection } from 'firebase/firestore';
import moment from 'moment';
import Order from '../components/Order';

function Orders({ orders }) {
  const { data: session } = useSession();
  const numOrder = orders.length;

  return (
    <div>
      <Header />

      <main className='w-[920px] mx-auto'>
        <p className='text-[28px] py-4'>Your Orders</p>

        {session ? (
          <p className='font-bold text-sm mb-3'>{numOrder} {numOrder === 1 ? 'Order' : 'Orders'}</p>
        ) : (
          <p>Please sign in to see your orders</p>
        )}

        <div>
          {orders?.map(({ id, price, priceShipping, items, timestamp, images, address, state, country, zipcode }) => (
            <Order key={id} id={id} price={price} priceShipping={priceShipping}
              items={items} timestamp={timestamp} images={images} address={address}
              state={state} country={country} zipcode={zipcode} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Orders

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  if (!session) {
    return {
      props: {},
    };
  }

  const q = query(collection(database, 'users', session.user.email, 'orders'), orderBy('timestamp', 'desc'));
  const stripeOrders = await getDocs(q);

  const orders = await Promise.all(stripeOrders.docs.map(async (order) => ({
    id: order.id,
    price: order.data().price,
    priceShipping: order.data().price_shipping,
    images: order.data().images,
    timestamp: moment(order.data().timestamp.toDate()).unix(),//new Date(order.data().timestamp.toDate()).toUTCString()
    address: order.data().address,
    state: order.data().state,
    country: order.data().country,
    zipcode: order.data().zipcode,
    items: (
      await stripe.checkout.sessions.listLineItems(order.id, { limit: 100 })
    ).data,
  })))

  return {
    props: {
      orders
    }
  }
}