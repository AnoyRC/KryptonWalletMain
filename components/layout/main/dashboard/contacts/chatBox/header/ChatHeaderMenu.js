'use client';

import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';

const ChatHeaderMenu = () => {
  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <Button variant="text" className="p-3 rounded-full">
          <EllipsisHorizontalIcon className="w-5 h-5" />
        </Button>
      </MenuHandler>

      <MenuList>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ChatHeaderMenu;
