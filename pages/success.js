import React from 'react'
import Header from '../components/Header'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { addressAtom, countryAtom, stateAtom, zipAtom } from '../recoil/cartAtom';
import { useRecoilValue } from 'recoil';
import { getSession } from 'next-auth/react'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import database from '../firebase';

function success({ shippingAddress }) {
  const router = useRouter();

  return (
    <div className=''>
      <Header />

      <main>
        <div className='bg-[#eaeded] rounded-md p-5 my-5 mx-40'>
          <div className='bg-white rounded-md p-5'>
            <div className='flex place-content-between'>
              <div className='flex-col flex'>
                <div className='text-[#078467] flex items-center space-x-2 pb-3'>
                  <CheckCircleIcon className='h-6 w-6' />
                  <p className='text-lg font-bold'>Order placed, thanks!</p>
                </div>
                <div className='text-[14px]'>
                  <p>
                    Confirmation will be sent to your email.
                  </p>

                  <div className='font-bold py-2 flex whitespace-pre'>
                    {'Ship to: '}
                    <div className='font-normal'>
                      <p>{shippingAddress[0].address}</p>
                      <p>{shippingAddress[0].state}, {shippingAddress[0].country} {shippingAddress[0].zipcode}</p>
                    </div>
                  </div>

                  <button className='mt-5 text-[#007185] hover:underline hover:cursor-pointer' onClick={() => router.push('orders')}>
                    Go to your orders
                  </button>
                </div>
              </div>

              <img src='/panels/Checkout1.png' />
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}

export default success

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  if (!session) {
    return {
      props: {},
    };
  }

  const q = query(collection(database, 'users', session.user.email, 'orders'), orderBy('timestamp', 'desc'), limit(1));
  const stripeOrders = await getDocs(q);

  const shippingAddress = await Promise.all(stripeOrders.docs.map(async (order) => ({
    address: order.data().address,
    state: order.data().state,
    country: order.data().country,
    zipcode: order.data().zipcode,
  })))

  return {
    props: {
      shippingAddress
    }
  }
}