import React from 'react'
import Image from 'next/image'
import { removeProduct, setProductOrder } from '../lib/updateCart'
import Dropdown from './Dropdown'
import CurrencyFormat from 'react-currency-format';

function CheckoutProduct({ id, title, price, image, quantity, order }) {
  const remove = removeProduct();
  const setOrder = setProductOrder();

  return (
    <div className='border-b pb-6'>
      <div className='flex items-center space-x-2'>
        <input type="checkbox" checked={order} onChange={() => setOrder(id)} 
        className='h-4 w-4 border border-gray-300 bg-white accent-[#007185]
        focus:outline-none transition duration-200 ml-4 cursor-pointer'/>

        <Image src={image} alt='' height={200} width={200} objectFit='contain' />

        <div>
          <p>
            {title}
          </p>
          <div className='flex items-center space-x-4'>
            <Dropdown id={id} quantity={quantity} />
            <p className='pl-3 text-xs border-l border-[#d9dddd] text-[#258baf]
          hover:underline hover:cursor-pointer' onClick={() => remove(id)}>
              Delete
            </p>
          </div>
        </div>

      </div>
      <div className='relative'>
        <CurrencyFormat value={price} thousandSeparator={true} displayType={'text'} decimalScale={2} fixedDecimalScale={true}
          prefix={'$'} renderText={value => <div className='font-bold text-[16px] absolute -top-[200px] right-0 '>{value}</div>} />
      </div>
    </div>
  )
}

export default CheckoutProduct