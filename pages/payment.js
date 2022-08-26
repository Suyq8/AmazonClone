import React, { useState } from 'react'
import Image from 'next/image'
import { addressAtom, cartStateAtom, countryAtom, displayAtom, stateAtom, zipAtom } from '../recoil/cartAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LockClosedIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';
import countries from '../lib/utils';
import ReviewProduct from '../components/ReviewProduct';
import { selectItem, totalPrice } from '../recoil/cartSelector';
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js'
import { useSession } from "next-auth/react"
import Alert from '../components/Alert';
import * as ReactDOM from 'react-dom';
const stripePromise = loadStripe(process.env.stripe_public_key);

function payment() {
  const items = useRecoilValue(cartStateAtom);
  const router = useRouter();
  const { data: session } = useSession();
  const [address, setAddress] = useRecoilState(addressAtom);
  const [stateName, setStateName] = useRecoilState(stateAtom);
  const [country, setCountry] = useRecoilState(countryAtom);
  const [zipcode, setZipcode] = useRecoilState(zipAtom);
  const selectItems = useRecoilValue(selectItem);
  const totalCost = useRecoilValue(totalPrice);
  const [display, setDisplay] = useRecoilState(displayAtom);
  const [text, setText] = useState("");

  const createCheckoutSeesion = async () => {
    if (address === "") {
      setDisplay(true);
      setText('Address');
      return;
    }
    if (stateName === "") {
      setDisplay(true);
      setText('State');
      return;
    }
    if (country === "") {
      setDisplay(true);
      setText('Country');
      return;
    }
    if (zipcode === "") {
      setDisplay(true);
      setText('Zip Code');
      return;
    }

    const stripe = await stripePromise;

    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items: items,
      email: session.user.email,
      address: address,
      state: stateName,
      country: country,
      zipcode: zipcode
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    });

    if (result.error) {
      alert(result.error.message);
    }
  }

  return (
    <div>
      <Alert />
      <div className='flex items-center bg-gradient-to-b from-white to-gray-100 place-content-between'>
        <div className='pt-4 pl-2 pb-2'>
          <Image src="/panels/amazon.png" onClick={() => router.push('/')}
            width={103} height={31} objectFit='contain' className='cursor-pointer ' />
        </div>

        <p className='text-[24px] font-medium' onClick={() => router.push('/checkout')}>
          Checkout (<span className='hover:cursor-pointer text-[#007185]'>{selectItems} {selectItems === 1 ? 'item' : 'items'}</span>)
        </p>

        <LockClosedIcon className='h-6 w-5 text-[#999999] mr-24' />
      </div>

      <div className='flex justify-center items-start'>
        <div className='w-[720px]'>
          {/*shipping address*/}
          <div className='border-b border-gray-200'>
            <p className='text-[18px] font-semibold py-3'>Shipping address</p>
            <div className="element group">
              <input
                className="input peer"
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="address" className='label'>Address</label>
            </div>
            <div className="element group">
              <input
                className="input peer"
                id="state"
                type="text"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="state" className='label'>State</label>
            </div>
            <div className="element group">
              <select
                className="input peer"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option></option>
                {countries.map((item, i) => (
                  <option key={i} value={item.abbreviation}>{item.country}</option>
                ))}
              </select>
              <label htmlFor="country" className={country ? 'label_select2' : 'label_select1'}>Country</label>
            </div>
            <div className="element group">
              <input
                className="input peer"
                id="zip"
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="zip" className='label'>ZIP Code</label>
            </div>
          </div>

          {/*items*/}
          <div>
            <p className='text-[18px] font-semibold py-3'>Review items and shipping</p>
            <div className='p-3 border border-gray-200 rounded-md'>
              {items.map((item, i) => (
                <ReviewProduct
                  key={i}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                  order={item.order} />
              ))}
            </div>
          </div>
        </div>

        <div className='my-3 ml-5 bg-white px-5 py-4 grid grid-cols-1 place-content-center w-[290px] border border-gray-200 rounded-md'>
          <button className='button rounded-lg' onClick={createCheckoutSeesion}>
            Place your order
          </button>
          <p className='text-[11px] text-[#565959] pt-1 pb-3 text-center border-b border-gray-200'>
            By placing your order, you agree to Amazon's <span className='text'>privacy notice</span> and <span className='text'>conditions of use</span>.
          </p>

          <p className='text-[18px] font-semibold py-2'>Order Summary</p>
          <div className='text-xs flex place-content-between my-1'>
            <p>Items:</p>
            <CurrencyFormat value={totalCost} thousandSeparator={true} displayType={'text'} decimalScale={2} fixedDecimalScale={true}
              prefix={'$'} renderText={value => <span>{value}</span>} />
          </div>

          <div className='text-xs flex place-content-between my-1 pb-1 border-b border-gray-200'>
            <p>Shipping & handling:</p>
            <CurrencyFormat value={10} thousandSeparator={true} displayType={'text'} decimalScale={2} fixedDecimalScale={true}
              prefix={'$'} renderText={value => <span>{value}</span>} />
          </div>

          <div className='text-[18px] font-semibold flex place-content-between my-1 text-[#B12704]'>
            <p>Order total:</p>
            <CurrencyFormat value={totalCost + 10} thousandSeparator={true} displayType={'text'} decimalScale={2} fixedDecimalScale={true}
              prefix={'$'} renderText={value => <span>{value}</span>} />
          </div>
        </div>
      </div>

      {display 
      ? <Alert text={text}/>
      : <></>}
    </div>
  )
}

export default payment