"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

export default function OnBoardContainer({ children }) {
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center gap-[20px]">
        <h1 className="text-5xl text-black font-fhtotal font-bold">Krypton</h1>
        <Card className="w-[30rem] p-4">{children}</Card>
      </div>
    </>
  );
}
