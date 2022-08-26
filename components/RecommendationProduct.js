import React, { useState } from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/outline';
import CurrencyFormat from 'react-currency-format';
import { addProduct } from '../lib/updateCart'

function RecommendationProduct({ id, title, price, image, rating }) {
  const [rate] = useState(Math.round(rating.rate));
  const [left] = useState(5 - rate);
  const add = addProduct();

  return (
    <div className='flex items-center bg-white z-20 mt-3'>
      <img src={image} alt='' width={100} height={100} />

      <div className='ml-3'>
        <p className='my-0.5 text-[#2f8897] line-clamp-1 hover:cursor-pointer hover:underline'>{title}</p>

        <div className='flex items-center hover:cursor-pointer'>
          {Array(rate).fill().map((_, i) => (
            <StarIcon key={i} className='h-3 fill-[#ffa41c] stroke-[#e3893b]' />
          ))}
          {Array(left).fill().map((_, i) => (
            <StarIcon key={i} className='h-3 stroke-[#e3893b]' />
          ))}
          <p className='text-[#2f8897] ml-1 text-xs'>{rating.count}</p>
        </div>

        <CurrencyFormat value={price} thousandSeparator={true} displayType={'text'} decimalScale={2} fixedDecimalScale={true}
          prefix={'$'} renderText={value => <div className='text-[#d15d35] hover:cursor-pointer'>{value}</div>} />

        <button className='button rounded-md w-[90px]' onClick={() => add({ id, title, price, image })}>
          Add to Cart
        </button>
      </div>

    </div>
  )
}

export default RecommendationProduct