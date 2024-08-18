"use client";

import { useEffect, useState } from "react";
import { useMnemonic } from "@/context/MnemonicContext";
import { useRouter } from "next/navigation";

export default function Mnemonic() {
  const Router = useRouter()
  const { mnemonic, setMnemonic } = useMnemonic();
  const [copySuccess, setCopySuccess] = useState<string>("Click to copy");


  const mnemonicStrings = mnemonic.split(" ");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      setCopySuccess("Copied to clipboard!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="h-[600px] w-[600px] flex flex-col items-center">
        <section className="h-[200px] w-full flex flex-col justify-center items-center">
          <span className="text-4xl font-semibold">Secret Recovery Phrase</span>
          <span className="text-blue-200 text-center w-[400px] mt-6">
            Save these words in a safe place.
          </span>
        </section>
        <section
          onClick={copyToClipboard}
          className="grid grid-cols-3 gap-4 gap-x-8 place-items-start p-6 rounded-xl bg-[#202127] cursor-pointer"
        >
          {mnemonicStrings.map((str, index) => {
            return (
              <div key={index} className="flex gap-2 text-lg">
                <span className="text-gray-600">{index + 1}</span>
                <span>{str}</span>
              </div>
            );
          })}
          <span className="text-xs text-gray-500">{copySuccess}</span>
        </section>
        <button onClick={()=>Router.push('/yourWallets')}>route</button>
      </div>
    </div>
  );
}
