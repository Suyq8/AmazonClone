import React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { setProductQty } from '../lib/updateCart'

function Item({ id, qty }) {
  const setQty = setProductQty();

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${active && "bg-[#edfdff] ring-1 ring-[#a7ced5]"
            } group flex rounded-xs items-center w-full pl-1 py-1 tracking-wide cursor-pointer`}
          onClick={() => setQty(id, qty)}
        >
          <p className="text-sm font-normal text-black">{qty ? qty : '0 (Delete)'}</p>
        </button>
      )}
    </Menu.Item>
  )
}

function Dropdown({ id, quantity }) {
  return (
    <Menu as="div" className='relative text-black inline-block'>
      <div className='relative flex items-center'>
        <Menu.Button className='flex items-center bg-[#f0f2f2] cursor-pointer rounded-md 
                    px-1 hover:bg-[#e3e6e6] transition shadow-md border border-[#d9dbdb]
                    focus:ring-2 focus:bg-[#edfdff] focus:border-[#3e909e] focus:ring-[#c7f2f9]'>
          <p className="text-[13px] pl-2 py-1.5 whitespace-pre">Qty:  {quantity}</p>
          <ChevronDownIcon className='w-5 h-5 mx-1' />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 top-0 w-[87px] origin-top-right
        bg-white divide-y rounded-md shadow-lg ring-1ring-black ring-opacity-5
        focus:outline-none z-10">
          <div className="px-1 py-1">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((qty, i) => (
              <Item key={i} id={id} qty={qty} />
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown