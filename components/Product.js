import React, { useState } from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/outline';
import CurrencyFormat from 'react-currency-format';
import { addProduct } from '../lib/updateCart'

function Product({ id, title, price, description, category, image, rating }) {
  const [rate] = useState(Math.round(rating.rate));
  const [left] = useState(5 - rate);
  const add = addProduct();

  return (
    <div className='flex flex-col bg-white p-10 relative m-5 hover:cursor-pointer z-20'>
      <p className='absolute text-xs italic top-2 right-2 text-gray-500'>{category}</p>
      <Image src={image} alt='' height={200} width={200} objectFit='contain' />
      <p className='my-2 text-black'>{title}</p>

      <div className='flex items-center'>
        {Array(rate).fill().map((_, i) => (
          <StarIcon key={i} className='h-3 fill-[#ffa41c] stroke-[#e3893b]' />
        ))}
        {Array(left).fill().map((_, i) => (
          <StarIcon key={i} className='h-3 stroke-[#e3893b]' />
        ))}
        <p className='text-gray-500 ml-1 text-xs'>{rating.count}</p>
      </div>

      <p className='text-xs my-2 line-clamp-2'>{description}</p>

      <CurrencyFormat value={price} thousandSeparator={true} displayType={'text'} decimalScale={2} fixedDecimalScale={true}
        prefix={'$'} renderText={value => <div className='mb-3'>{value}</div>} />

      <button className='button rounded-sm' onClick={() => add({ id, title, price, image })}>
        Add to Cart
      </button>
    </div>
  )
}

export default Product