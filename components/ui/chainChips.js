"use client";

import { Chip } from "@material-tailwind/react";

export function PolygonChip() {
  return <Chip value="Polygon" color="deep-purple" className="w-fit" />;
}

export function MumbaiChip() {
  return <Chip value="Mumbai" color="purple" className="w-fit" />;
}

export function ArbitrumChip() {
  return <Chip value="Arbitrum" color="light-blue" className="w-fit" />;
}

export function CeloChip() {
  return <Chip value="Alfajores" color="lime" className="w-fit" />;
}

export function BaseChip() {
  return <Chip value="Base Goerli" color="blue" className="w-fit" />;
}

export function ScrollChip() {
  return <Chip value="Scroll Sepolia" color="blue-gray" className="w-fit" />;
}

export function UnsupportedChip() {
  return <Chip value="Unsupported" color="gray" className="w-fit" />;
}

export function ChipsInId({ chain }) {
  return (
    <>
      {chain === "137" && <PolygonChip />}
      {chain === "80001" && <MumbaiChip />}
      {chain === "84531" && <BaseChip />}
      {chain === "44787" && <CeloChip />}
      {chain === "534351" && <ScrollChip />}
      {chain !== "137" &&
        chain !== "80001" &&
        chain !== "84531" &&
        chain !== "44787" &&
        chain !== "534351" && <UnsupportedChip />}
    </>
  );
}
