import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import ProductFeed from '../components/ProductFeed'
import { useRecoilState } from 'recoil'
import { productAtom } from '../recoil/cartAtom'
import { useEffect } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

const Home: NextPage = ({ products }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [_, setProduct] = useRecoilState(productAtom);
  useEffect(() => {
    setProduct(products);
  }, []);

  return (
    <div className='bg-[#eaeded] h-screen'>
      <Head>
        <title>Amazon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className='max-w-screen-2xl mx-auto bg-[#eaeded]'>
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await fetch('https://fakestoreapi.com/products')
    .then(res => res.json());

  return {
    props: {
      products,
    },
  }
}