import React from 'react'
import Product from './Product'

function ProductFeed({ products }) {
  return (
    <div className='grid grid-flow-row-dense -mt-56 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {products.slice(0,4).map((({id, title, price, description, category, image, rating}) =>
      <Product key={id} id={id} title={title} price={price} rating={rating}
        description={description} category={category} image={image} />))}

      <img className='md:col-span-full' src='./panels/9.jpg' alt=''/>

      {products.slice(5,products.length).map((({id, title, price, description, category, image, rating}) =>
      <Product key={id} id={id} title={title} price={price} rating={rating}
        description={description} category={category} image={image} />))}
    </div>

  )
}

export default ProductFeed