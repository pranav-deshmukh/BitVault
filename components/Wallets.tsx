"use client";
import { useState, useEffect } from 'react';
import { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { useMnemonic } from '@/context/MnemonicContext';

interface WalletInt {
  publicKey: string,
  privateKey: string
}

export default function NewWallet() {
  const { mnemonic } = useMnemonic();
  const [walletNo, setWalletNo] = useState(0);
  const [keys, setKeys] = useState<WalletInt[]>([]);
  const [balance, setBalance] = useState(0);
  const [selectedWallet, setSelectedWallet] = useState<WalletInt | null>(null);

  useEffect(() => {
    console.log('Mnemonic on CreateSolanaKeyPair page:', mnemonic);
  }, [mnemonic]);

  const generateKeyPair = async () => {
    try {
      console.log('Mnemonic used:', mnemonic);
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const derivedSeed = derivePath(`m/44'/501'/${walletNo}'/0'`, seed.toString('hex')).key;
      setWalletNo(prevNo => prevNo + 1);
      const keypair = Keypair.fromSeed(derivedSeed);

      const newWallet = {
        publicKey: keypair.publicKey.toBase58(),
        privateKey: Buffer.from(keypair.secretKey).toString('hex')
      };

      setKeys(prevKeys => [...prevKeys, newWallet]);
      setSelectedWallet(newWallet); 
    } catch (err) {
      console.error('Error generating key pair:', err);
    }
  };

  const handleWalletSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(event.target.value, 10);
    setSelectedWallet(keys[selectedIndex]);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <h2 className="text-2xl font-bold mb-2">
            {selectedWallet ? `Wallet ${keys.indexOf(selectedWallet) + 1}` : `Wallet ${walletNo}`}
          </h2>
          <div className="text-4xl font-bold mb-2">
            ${balance.toFixed(2)}(hardcoded)
          </div>
          <div className="text-sm text-gray-400">
            ${balance.toFixed(2)} 0%(hardcoded)
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <button className="bg-gray-700 text-white px-4 py-2 rounded">Receive(hardcoded)</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded">Send(hardcoded)</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded">Swap(hardcoded)</button>
        </div>

        <div className="mb-4">
          <button
            onClick={generateKeyPair}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4"
          >
            Generate New Wallet
          </button>

          {keys.length > 0 && (
            <select 
              onChange={handleWalletSelect} 
              className="bg-gray-700 text-white px-4 py-2 rounded w-full mb-4"
              value={keys.indexOf(selectedWallet as WalletInt)}
            >
              <option disabled value="">
                Select a wallet
              </option>
              {keys.map((key, index) => (
                <option key={index} value={index}>
                  Wallet {index + 1} - {key.publicKey.slice(0, 8)}...{key.publicKey.slice(-8)}
                </option>
              ))}
            </select>
          )}
        </div>

        {selectedWallet && (
          <div className="bg-gray-800 rounded-lg p-4 mb-2">
            <div className="text-sm text-gray-400">Selected Wallet:</div>
            <div className="break-all">Public Key: {selectedWallet.publicKey}</div>
            <div className="break-all">Private Key: {selectedWallet.privateKey}</div>
          </div>
        )}
      </div>
    </div>
  );
}
