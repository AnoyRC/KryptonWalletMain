'use client';

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Card,
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import Image from 'next/image';
import { useState } from 'react';

export default function CustomMenu({ title, menuItems, image }) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-3 text-base font-normal capitalize tracking-normal font-uni outline-none"
        >
          {title}{' '}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              openMenu ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="hidden w-fit grid-cols-8 gap-4 overflow-visible lg:grid">
        <Card
          shadow={false}
          className="col-span-4 flex h-full w-full rounded-2xl p-4 outline-none max-w-xs space-y-10 bg-[rgb(255,248,248)]"
        >
          <div className=" space-y-2">
            <p className="font-uni text-lg font-bold">Your Account</p>
            <p className="font-uni text-md">
              Check what you've spent, chat securely, and handle guardian
              requests effortlessly.
            </p>
          </div>

          <Image
            src={'/images/main/dashboard/navbar/' + image + '.png'}
            width={200}
            height={200}
            className="aspect-square mx-auto"
          />
        </Card>

        <ul className="col-span-4 flex max-w-xs flex-col gap-1 outline-none">
          {menuItems.map(({ title, description }) => (
            <a href="#" key={title}>
              <MenuItem>
                <p className="font-uni text-lg font-bold">{title}</p>

                <p className="font-uni text-md">{description}</p>
              </MenuItem>
            </a>
          ))}
        </ul>
      </MenuList>
    </Menu>
  );
}
