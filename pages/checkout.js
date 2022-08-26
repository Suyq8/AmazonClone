import React from 'react'
import Header from '../components/Header'
import { signIn, useSession } from "next-auth/react"
import CheckoutProduct from '../components/CheckoutProduct'
import { useRecoilValue } from 'recoil';
import { cartStateAtom, productAtom } from '../recoil/cartAtom'
import { selectItem, totalPrice } from '../recoil/cartSelector';
import CurrencyFormat from 'react-currency-format';
import { sampleSize } from 'lodash';
import RecommendationProduct from '../components/RecommendationProduct';
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useRouter } from 'next/router';
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const { data: session } = useSession();
  const items = useRecoilValue(cartStateAtom);
  const totalCost = useRecoilValue(totalPrice);
  const selectItems = useRecoilValue(selectItem);
  const product = useRecoilValue(productAtom);
  const router = useRouter();

  return (
    <div className='bg-[#eaeded] h-screen'>
      <Header />
      <div className='flex justify-center'>
        <div className='flex items-center py-[10px] pl-[12px] pr-[20px] border-[#d9dddd] border-[1px] my-[20px] bg-white flex-none'>
          <img src='panels/Prime Rewards Visa Card.png' />

          <div className='ml-6 mr-12'>
            <p className='font-bold'>
              {session ? `${session.user.name}, see` : 'See'} if you pre-qualify with no impact to your credit score.
            </p>
            <p className='text-[14px]'>
              Get <span className='text-[#00A8E1] font-bold'>3% back every day at Amazon.com</span> upon approval for the Amazon Rewards Visa Card.
            </p>
          </div>

          <button className='text-[13px] px-[10px] py-[5px] border-[1px] rounded-md border-[#d9dddd] shadow-sm'>
            Learn more
          </button>
        </div>
      </div>

      <main className='flex max-w-screen-2xl'>
        <div className='grow'>
          <div className='flex flex-col bg-white space-y-10 p-5 mx-5 mb-5'>
            <div className='pb-4 border-b flex items-end justify-between'>
              <p className='text-3xl'>
                {items.length === 0 ? 'Your Amazon Cart is empty.' : 'Shppping Cart'}
              </p>
              <p className='text-sm -mb-4 text-[#565959]'>
                Price
              </p>
            </div>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                order={item.order} />
            ))}

            <div className='relative'>
              <p className='absolute bottom-0 right-0 text-[18px]'>
                {totalCost === 0 && items.length !== 0 ?
                  'No items selected' :
                  `Subtotal (${selectItems} ${selectItems === 1 ? 'item' : 'items'}): `}

                {totalCost !== 0 &&
                  <CurrencyFormat value={totalCost} thousandSeparator={true} displayType={'text'} decimalScale={2} fixedDecimalScale={true}
                    prefix={'$'} renderText={value => <span className='font-bold text-[16px]'>{value}</span>} />}
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col mr-5'>
          {
            items.length > 0 && (
              <div className='mb-5 bg-white p-10 grid grid-cols-1 place-content-center'>
                <p className='text-[18px] mb-5 text-center'>
                  {totalCost === 0 && items.length !== 0 ?
                    'No items selected' :
                    `Subtotal (${selectItems} ${selectItems === 1 ? 'item' : 'items'}): `}

                  {totalCost !== 0 &&
                    <CurrencyFormat value={totalCost} thousandSeparator={true} displayType={'text'} decimalScale={2} fixedDecimalScale={true}
                      prefix={'$'} renderText={value => <span className='font-bold text-[16px]'>{value}</span>} />}
                </p>
                <button className='button rounded-lg' onClick={session ? () => router.push('/payment') : signIn}>
                  Proceed to checkout
                </button>
              </div>
            )
          }
          <div className='w-[300px] bg-white p-5 mb-5 rounded-md'>
            <p className='text-sm font-bold'>
              Recommendations for items from across our store
            </p>
            {sampleSize(product, 2).map((item, i) => (
              <RecommendationProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                rating={item.rating} />
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}

export default Checkout