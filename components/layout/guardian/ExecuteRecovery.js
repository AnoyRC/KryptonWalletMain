"use client";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Button, List, ListItem, Input } from "@material-tailwind/react";
import { useState } from "react";
import RecoveryRequests from "../main/dashboard/requests/RecoveryRequests";
import { useSelector } from "react-redux";
import useGuardian from "@/hooks/useGuardian";
import useReadContract from "@/hooks/useReadContract";

export default function ExecuteRecovery({
  RecoveryRequestsData,
  executeFunction,
}) {
  const [selected, setSelected] = useState([]);
  const threshold = 3;

  const isGuardian = useSelector((state) => state.wallet.isGuardian);
  const { isGuardian: checkGuardian, isOwner } = useReadContract();
  const [proposedOwner, setProposedOwner] = useState("");
  const { supportRecovery } = useGuardian();

  const setSelectedItem = (address) => {
    if (selected.includes(address)) {
      setSelected(selected.filter((item) => item !== address));
    } else {
      setSelected([...selected, address]);
    }
  };

  return (
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
            toast.error("Cannot transfer ownership to an owner or guardian");
          }

          await supportRecovery(proposedOwner);
        }}
      >
        Support Recovery
      </Button>

      <div className="flex items-center justify-between -my-1 -mb-3 px-2">
        <h6 className="font-uni text-lg font-bold">Select Requests</h6>
        <p>
          {selected.length} out of {threshold} selected
        </p>
      </div>

      <List className="p-0">
        {RecoveryRequestsData.map((data, index) => (
          <ListItem
            key={index}
            className="flex items-center w-full p-2 justify-between gap-2 relative"
            onClick={() => setSelectedItem(data.address)}
            selected={selected.includes(data.address)}
            style={{
              backgroundColor: selected.includes(data.address)
                ? "rgba(0, 255, 255, 0.1)"
                : "transparent",
              borderRadius: "0.5rem",
              border: selected.includes(data.address)
                ? "1px solid rgba(0, 255, 255, 1)"
                : "",
            }}
          >
            {selected.includes(data.address) && (
              <div className="absolute top-0 right-0 w-7 h-7 rounded-bl-xl bg-[#00ffff] grid place-items-center z-10">
                <CheckIcon className="h-4 w-4 ml-0.5 mb-0.5 text-black" />
              </div>
            )}

            <RecoveryRequests
              name={data.name}
              address={data.address}
              proposedOwner={data.proposedOwner}
            />
          </ListItem>
        ))}
      </List>

      <Button
        className="-mt-2 mx-2 bg-black/80"
        size="lg"
        onClick={executeFunction}
      >
        Execute Recovery
      </Button>
    </>
  );
}
