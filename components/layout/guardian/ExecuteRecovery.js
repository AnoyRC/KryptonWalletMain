"use client";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Button, List, ListItem, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import RecoveryRequests from "../main/dashboard/requests/RecoveryRequests";
import { useSelector } from "react-redux";
import useGuardian from "@/hooks/useGuardian";
import useReadContract from "@/hooks/useReadContract";
import { useSearchParams } from "next/navigation";
import Krypton from "@/lib/contracts/Krypton";
import { useAccount, useContractEvent } from "wagmi";
import toast from "react-hot-toast";

export default function ExecuteRecovery({
  RecoveryRequestsData,
  setActiveStep,
  setIsExecuting,
}) {
  const [selected, setSelected] = useState([]);
  const [threshold, setThreshold] = useState(0);

  const isGuardian = useSelector((state) => state.wallet.isGuardian);
  const {
    isGuardian: checkGuardian,
    isOwner,
    getThreshold,
  } = useReadContract();
  const [proposedOwner, setProposedOwner] = useState("");
  const [recoveryOwner, setRecoveryOwner] = useState("");
  const { supportRecovery } = useGuardian();
  const isWalletOwner = useSelector((state) => state.wallet.isOwner);
  const isGuardianWallet = useSelector((state) => state.wallet.isGuardian);
  const searchParams = useSearchParams();
  const is2FA = useSelector((state) => state.wallet.is2FA);
  const { address } = useAccount();
  const { executeRecoveryUnsigned } = useGuardian();

  const setSelectedItem = (address) => {
    if (selected.includes(address)) {
      setSelected(selected.filter((item) => item !== address));
    } else {
      setSelected([...selected, address]);
    }
  };

  useContractEvent({
    address: searchParams.get("wallet").split(":")[1],
    abi: Krypton.abi,
    eventName: "ThresholdUpdated",
    listener(log) {
      handleThreshold();
    },
    chainId: Number(searchParams.get("wallet").split(":")[0]),
  });

  useEffect(() => {
    handleThreshold();
  }, []);

  const handleThreshold = async () => {
    const threshold = await getThreshold();
    setThreshold(threshold);
  };

  return (
    <>
      {RecoveryRequestsData.filter(
        (data) => data.from === address.toString().toLowerCase()
      ).length === 0 && (
        <>
          <h6 className="font-uni text-lg font-bold">Proposed Owner</h6>
          <Input
            size="lg"
            placeholder="new-owner-address"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={proposedOwner}
            onChange={(e) => setProposedOwner(e.target.value)}
            disabled={!isGuardian}
          />

          <Button
            className="-mt-2 bg-black/80"
            disabled={!isGuardian}
            onClick={async () => {
              if (!proposedOwner) {
                toast.error("Please fill all the fields");
              }

              const isProposedOwner = await isOwner(proposedOwner);

              const isNewGuardian = await checkGuardian(proposedOwner);

              if (isProposedOwner || isNewGuardian) {
                toast.error(
                  "Cannot transfer ownership to an owner or guardian"
                );
              }

              await supportRecovery(proposedOwner);
            }}
          >
            Support Recovery
          </Button>
        </>
      )}

      <div className="flex items-center justify-between -my-1 -mb-3 px-2">
        <h6 className="font-uni text-lg font-bold">Select Requests</h6>
        <p>
          {selected.length} out of {Number(threshold)} selected
        </p>
      </div>

      <List className="p-0">
        {RecoveryRequestsData.map((data, index) => (
          <ListItem
            key={index}
            className="flex items-center w-full p-2 justify-between gap-2 relative"
            onClick={() => setSelectedItem(data.from)}
            selected={selected.includes(data.from)}
            style={{
              backgroundColor: selected.includes(data.from)
                ? "rgba(0, 255, 255, 0.1)"
                : "transparent",
              borderRadius: "0.5rem",
              border: selected.includes(data.from)
                ? "1px solid rgba(0, 255, 255, 1)"
                : "",
            }}
          >
            {selected.includes(data.from) && (
              <div className="absolute top-0 right-0 w-7 h-7 rounded-bl-xl bg-[#00ffff] grid place-items-center z-10">
                <CheckIcon className="h-4 w-4 ml-0.5 mb-0.5 text-black" />
              </div>
            )}

            <RecoveryRequests
              key={index}
              name={null}
              address={data.from}
              proposedOwner={data.requests.proposedOwner}
            />
          </ListItem>
        ))}
      </List>

      <Input
        size="lg"
        placeholder="new-owner-address"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        value={recoveryOwner}
        onChange={(e) => setRecoveryOwner(e.target.value)}
        disabled={!isGuardian}
      />

      <Button
        className="-mt-2 mx-2 bg-black/80"
        size="lg"
        onClick={async () => {
          if (!is2FA) {
            if (selected.length < Number(threshold)) {
              toast.error("Please select the required number of guardians");
              return;
            }

            if (!recoveryOwner || recoveryOwner === "") {
              toast.error("Please enter the new owner address");
              return;
            }

            setIsExecuting(true);

            setActiveStep(1);

            setTimeout(() => {
              setActiveStep(2);
            }, 1000);

            const ifIsOwner = await isOwner(recoveryOwner);

            if (ifIsOwner) {
              toast.error("Cannot transfer ownership to an owner");
              return;
            }

            await executeRecoveryUnsigned(recoveryOwner, selected);

            setIsExecuting(false);
            setActiveStep(0);
          }
        }}
        disabled={!isGuardian || selected.length < Number(threshold)}
      >
        Execute Recovery
      </Button>
    </>
  );
}
