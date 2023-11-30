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
  return <Chip value="Celo" color="lime" className="w-fit" />;
}

export function BaseChip() {
  return <Chip value="Base" color="blue" className="w-fit" />;
}

export function ScrollChip() {
  return <Chip value="Scroll" color="blue-gray" className="w-fit" />;
}

export function UnsupportedChip() {
  return <Chip value="Unsupported" color="gray" className="w-fit" />;
}

export function ChipsInId({ chain }) {
  return (
    <>
      {chain === "137" && <PolygonChip />}
      {chain === "80001" && <MumbaiChip />}
      {chain !== "137" && chain !== "80001" && <UnsupportedChip />}
    </>
  );
}
