import React from 'react'
import Image from 'next/image'
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { totalItem } from '../recoil/cartSelector'

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const totalItems = useRecoilValue(totalItem)

  return (
    <div>
      <div className='bg-[#0F1111] flex items-center flex-grow'>
        <div className='flex items-center flex-grow mt-2 mb-1 pb-0 pt-[1px] pr-1 pl-[6px] ml-1 sm:grow-0'>
          <Image src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" onClick={() => router.push('/')}
            width={113} height={40} objectFit='contain' className='cursor-pointer ' />
        </div>

        {/*Search*/}
        <div className='hidden sm:flex items-center flex-grow p-[10px]'>
          <input type="text" className='rounded-l flex-shrink flex-grow focus:outline-none h-[40px] w-6' />
          <SearchIcon className=' h-[40px] w-[45px] py-[8px] px-[10px] text-[#3a3835] bg-[#febd69] hover:bg-[#f3a847] rounded-r cursor-pointer' />
        </div>

        {/*right*/}
        <div className='text-white flex items-center mx-3 whitespace-nowrap'>
          <div className='link' onClick={session ? signOut : signIn}>
            <p className='text-[12px]'>
              {session ? `Hello, ${session.user.name}` : "Sign In"}
            </p>
            <p className='text-[14px] font-bold'>
              Account & Lists
            </p>
          </div>

          <div className='link' onClick={() => router.push('/orders')}>
            <p className='text-[12px]'>
              Returns
            </p>
            <p className='text-[14px] font-bold'>
              & Orders
            </p>
          </div>

          <div className='flex items-center link relative' onClick={() => router.push('/checkout')}>
            <span className='text-[#ff9244] flex items-center absolute top-[1px] left-[21px] px-[4px] bg-[#0F1111] rounded-full text-[13px]'>{totalItems}</span>
            <ShoppingCartIcon className='h-8' />
            <p className='text-[14px] font-bold hidden md:inline mt-2'>
              Cart
            </p>
          </div>
        </div>
      </div>

      {/*bottom*/}
      <div className='bg-[#232F31] flex items-center text-white text-sm space-x-2 h-[39px]'>
        <div className='link1 flex items-center ml-2'>
          <MenuIcon className='h-[28px] w-[28px]' />
          All
        </div>

        <p className='link1'>Back to School</p>
        <p className='link1'>Off to College</p>
        <p className='link1'>Best Sellers</p>
        <p className='link1'>Today's Deals</p>
        <p className='link1'>Amazon Basics</p>
        <p className='link1'>Prime Video</p>
        <p className='link1'>Books</p>
        <p className='link1'>Pet Supplies</p>
        <p className='link1'>Health & Household</p>
        <p className='link1'>Pharmacy</p>
        <p className='link1'>Buy Again</p>
        <p className='link1'>Livestreams</p>
        <p className='link1'>Kindle Books</p>
      </div>
    </div>
  )
}

export default Header