"use client";

import { Chip } from "@material-tailwind/react";

export function PolygonChip() {
  return <Chip value="Polygon" color="deep-purple" className="w-fit" />;
}

export function PolygonZKChip() {
  return <Chip value="Polygon ZK" color="purple" className="w-fit" />;
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

export function ChipsInId({ chain }) {
  return (
    <>
      {chain === "1" && <PolygonChip />}
      {chain === "2" && <PolygonZKChip />}
      {chain === "3" && <ArbitrumChip />}
      {chain === "4" && <CeloChip />}
      {chain === "5" && <BaseChip />}
      {chain === "6" && <ScrollChip />}
    </>
  );
}
