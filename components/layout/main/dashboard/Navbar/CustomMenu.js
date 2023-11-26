"use client";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Card,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Spline from "@splinetool/react-spline";

export default function CustomMenu({ title, menuItems, sceneLink }) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-3 text-base font-normal capitalize tracking-normal font-uni"
        >
          {title}{" "}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="hidden w-[26rem] grid-cols-7 gap-3 overflow-visible lg:grid">
        <Card
          shadow={false}
          className="col-span-3 flex h-full w-full items-center justify-center rounded-2xl p-4 bg-transparent"
        >
          <div className="w-full h-full">
            <Spline scene={sceneLink} />
          </div>
        </Card>
        <ul className="col-span-4 flex w-full flex-col gap-1">
          {menuItems.map(({ title, description }) => (
            <a href="#" key={title}>
              <MenuItem>
                <h2 className="font-uni text-lg font-bold">{title}</h2>

                <h3 className="font-uni text-md ">{description}</h3>
              </MenuItem>
            </a>
          ))}
        </ul>
      </MenuList>
    </Menu>
  );
}
