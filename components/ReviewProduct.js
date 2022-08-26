import React from 'react'
import Image from 'next/image'
import { removeProduct } from '../lib/updateCart'
import Dropdown from './Dropdown'
import CurrencyFormat from 'react-currency-format';

function ReviewProduct({ id, title, price, image, quantity, order }) {
  const remove = removeProduct();

  return (
    <div className='border-b pb-6'>
      <div className='flex items-center space-x-2'>
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

export default ReviewProduct