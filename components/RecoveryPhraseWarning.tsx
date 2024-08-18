import { useState, useEffect } from "react";
import { useMnemonic } from "@/context/MnemonicContext";
import { generateMnemonic } from "bip39";
import Mnemonic from "./Mnemonic";
import { FaExclamationTriangle, FaLock } from "react-icons/fa";

export default function RecoveryPhraseWarning() {
  const { setMnemonic, mnemonic } = useMnemonic();
  const [isChecked, setIsChecked] = useState(false);
  const [generate, setGenerate] = useState(false);

  const generateKey = async () => {
    const mn = generateMnemonic();
    setMnemonic(mn);
    console.log("Generated mnemonic:", mn); 
  };

  useEffect(() => {
    if (mnemonic) {
      console.log("Mnemonic updated:", mnemonic); 
    }
  }, [mnemonic]);

  return (
    <div className="w-full h-screen flex justify-center items-center text-white text-lg">
      {generate ? (
        <Mnemonic />
      ) : (
        <div className="p-8 rounded-lg shadow-lg w-[600px]">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Secret Recovery Phrase Warning
          </h1>
          <p className="text-center text-gray-400 mb-6">
            On the next page, you will receive your secret recovery phrase.
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex items-center bg-[#202127] p-7 rounded-xl">
              <FaExclamationTriangle className="text-yellow-400 text-2xl mr-3" />
              <p className="text-base text-gray-400">
                This is the <strong>ONLY</strong> way to recover your account if
                you lose access to your device or password.
              </p>
            </div>
            <div className="flex items-center bg-[#202127] p-7 rounded-xl">
              <FaLock className="text-green-500 text-xl mr-3" />
              <p className="text-base text-gray-400">
                Write it down, store it in a safe place, and{" "}
                <strong>NEVER</strong> share it with anyone.
              </p>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="acknowledgement"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-500 rounded mr-3"
            />
            <label
              htmlFor="acknowledgement"
              className="text-base text-gray-400"
            >
              I understand that I am responsible for saving my secret recovery
              phrase, and that it is the only way to recover my wallet.
            </label>
          </div>
          <div className="flex justify-center">
            <button
              className={`w-[300px] py-2 px-4 rounded ${
                isChecked
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-500 cursor-not-allowed"
              } text-white font-semibold`}
              disabled={!isChecked}
              onClick={async () => {
                if (isChecked) {
                  await generateKey();
                  setGenerate(true);
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
