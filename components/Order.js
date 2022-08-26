import React from 'react'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format';

function Order({ id, price, priceShipping, items, timestamp, images, address, state, country, zipcode }) {
  return (
    <div className='relative border rounded-md my-5'>
      <div className='flex items-center py-[14px] px-[18px] text-[#565959] bg-[#eaeded] space-x-16'>
        <div>
          <p className='text-[12px]'>ORDER PLACED</p>
          <p className='text-[14px]'>{moment.unix(timestamp).format('MMM DD, YYYY')}</p>
        </div>

        <div>
          <p className='text-[12px]'>TOTAL</p>
          <p className='text-[14px]'><CurrencyFormat value={price} thousandSeparator={true} displayType={'text'} decimalScale={2} fixedDecimalScale={true}
            prefix={'$'} /></p>
        </div>

        <div className='w-[350px]'>
          <p className='text-[12px]'>SHIP TO</p>
          <p className='text-[14px] text-[#007185] line-clamp-1'>
            {address}, {state}, {country} {zipcode}
          </p>
        </div>

        <div className='absolute right-[18px]'>
          <p className='text-[12px] truncate w-[200px]'>ORDER # {id}</p>
          <p className='text-[14px] text-[#007185]'>{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </div>
      </div>

      <div className='py-[14px] px-[18px]'>
        <div className='flex space-x-6 overflow-auto'>
          {images.map((image, i) => (
            <img key={i} src={image} className='h-20 object-contain' />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order