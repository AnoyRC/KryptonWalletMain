"use client";
import { ButtonGroup, Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  addGuardian,
  editGuardianAddress,
  editGuardianName,
  removeGuardian,
  setActiveStep,
} from "@/redux/slice/setupSlice";

function Guardian({ index, name, address }) {
  const dispatch = useDispatch();
  return (
    <>
      <h6 className="font-uni text-lg font-bold">Guardian {index + 1}</h6>
      <Input
        size="lg"
        placeholder="Guardian Name"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        value={name}
        onChange={(e) => {
          dispatch(editGuardianName({ index, name: e.target.value }));
        }}
      />
      <Input
        size="lg"
        placeholder="Wallet Address"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-3"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        value={address}
        onChange={(e) => {
          dispatch(editGuardianAddress({ index, address: e.target.value }));
        }}
      />
    </>
  );
}

export default function Step2() {
  const guardians = useSelector((state) => state.setup.guardians);
  const dispatch = useDispatch();
  return (
    <div className="w-full flex flex-col gap-4">
      {guardians.map((guardian, index) => (
        <Guardian
          index={index}
          key={index}
          name={guardian.name}
          address={guardian.address}
        />
      ))}
      <div className="flex w-full justify-end">
        <ButtonGroup>
          <Button
            onClick={() => {
              dispatch(addGuardian({ name: "", address: "" }));
            }}
            disabled={guardians.length === 3}
          >
            <PlusIcon className="text-white h-5 w-5" />
          </Button>
          <Button
            onClick={() => {
              dispatch(removeGuardian());
            }}
            disabled={guardians.length === 1}
          >
            <MinusIcon className="text-white h-5 w-5" />
          </Button>
        </ButtonGroup>
      </div>

      <div className="flex justify-between">
        <Button
          size="md"
          variant="outlined"
          className="capitalize font-uni font-bold"
          onClick={() => {
            dispatch(setActiveStep(0));
          }}
        >
          Prev
        </Button>

        <Button
          size="md"
          className="capitalize font-uni font-bold"
          onClick={() => {
            dispatch(setActiveStep(2));
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
