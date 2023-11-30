"use client";

import { ChipsInId } from "@/components/ui/chainChips";
import { setActiveStep } from "@/redux/slice/setupSlice";
import { CheckIcon } from "@heroicons/react/24/outline";
import {
  Chip,
  CardHeader,
  CardFooter,
  Typography,
  Button,
  Stepper,
  Step,
} from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Step4() {
  const chain = useSelector((state) => state.setup.chain);
  const name = useSelector((state) => state.setup.name);
  const guardians = useSelector((state) => state.setup.guardians);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [steps, setSteps] = useState(0);
  const twoFactorAddress = useSelector((state) => state.setup.twoFactorAddress);
  const selectedTwoFactor = useSelector(
    (state) => state.setup.selectedTwoFactor
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [isError, setIsError] = useState(false);

  const demoProcess = () => {
    setTimeout(() => {
      setSteps(1);
    }, 1000);
    setTimeout(() => {
      setSteps(2);
    }, 3000);
    setTimeout(() => {
      setSteps(3);
    }, 5000);
    setTimeout(() => {
      setIsDeployed(true);
    }, 7000);
  };

  return (
    <div className="w-full flex flex-col gap-4 -mt-5">
      <CardHeader
        variant="gradient"
        color="gray"
        className="-mt-2 mb-4 mx-0 grid h-20 place-items-center"
      >
        <h1 className="font-uni text-white text-3xl font-bold">
          {isDeployed ? "Welcome" : "Review"}
        </h1>
      </CardHeader>

      <div className="flex gap-5">
        <h2 className="text-xl w-[150px]">Chain</h2>
        <ChipsInId chain={chain} />
      </div>

      <div className="flex gap-5">
        <h2 className="text-xl w-[150px]">Name</h2>
        <Chip value={name} className="w-fit" />
      </div>

      <div className="flex gap-5">
        <h2 className="text-xl -mb-2 w-[150px]">Guardians</h2>
        <div className="flex flex-wrap gap-2">
          {guardians.map((guardian, i) => (
            <Chip key={i} value={guardian.name} className="w-fit" />
          ))}
        </div>
      </div>

      <div className="flex gap-5">
        <h2 className="text-xl w-[150px]">2FA</h2>
        <div className="flex gap-2">
          {!twoFactorAddress && <Chip value="disabled" className="w-fit" />}
          {twoFactorAddress && <Chip value="enabled" className="w-fit" />}
          {twoFactorAddress && selectedTwoFactor === 0 && (
            <Chip value="Passkey" className="w-fit" />
          )}
          {twoFactorAddress && selectedTwoFactor === 1 && (
            <Chip value="Polygon ID" className="w-fit" />
          )}
          {twoFactorAddress && selectedTwoFactor === 2 && (
            <Chip value="Anon Aadhar" className="w-fit" />
          )}
        </div>
      </div>

      {!isDeploying && !isDeployed && !isError && (
        <>
          <CardFooter className="flex flex-col gap-4 -mt-2 px-0 pb-0">
            <Typography color="gray">
              Ready to create your first krypton? Click the button below to
              continue.
            </Typography>
          </CardFooter>

          <Button
            size="lg"
            className=""
            onClick={() => {
              setIsDeploying(true);
              demoProcess();
            }}
          >
            Create Krypton
          </Button>
          <Button
            color="gray"
            variant="outlined"
            size="lg"
            className=""
            onClick={() => {
              dispatch(setActiveStep(0));
              router.push("/wallet");
            }}
          >
            Cancel
          </Button>
        </>
      )}

      {isDeploying && !isDeployed && !isError && (
        <div className="mt-5 flex flex-col w-full justify-center items-center gap-4">
          <Stepper activeStep={steps}>
            <Step className="h-4 w-4" />
            <Step className="h-4 w-4" />
            <Step className="h-4 w-4" />
            <Step className="h-4 w-4" />
          </Stepper>

          <div className="font-uni flex items-center gap-2 text-lg">
            {steps === 0 && "Deploying Krypton"}
            {steps === 1 && "Registering to Dataverse OS"}
            {steps === 2 &&
              (twoFactorAddress ? "Setting up 2FA" : "2FA Disabled, Skipping")}
            {steps === 3 && "Krypton Deployed"}
            {steps !== 3 && (
              <Image
                src="/images/onboard/setup/loading.svg"
                width={20}
                height={20}
                alt="loading"
                className="opacity-50 animate-spin"
              />
            )}
            {steps === 3 && (
              <CheckIcon className="text-black w-5 h-5 animate-bounce" />
            )}
          </div>
        </div>
      )}

      {isDeployed && !isError && (
        <div className="mt-5 flex flex-col w-full justify-center items-center gap-4">
          <div className="font-uni flex items-center gap-2 text-lg">
            Krypton Deployed
            <CheckIcon className="text-black w-5 h-5 animate-bounce" />
          </div>

          <Button size="lg" className="w-full">
            Step into your Krypton
          </Button>
        </div>
      )}

      {isError && (
        <div className="mt-5 flex flex-col w-full justify-center items-center gap-4">
          <div className="font-uni flex items-center gap-2 text-lg">
            Error Deploying Krypton
          </div>

          <Button size="lg" className="w-full">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
