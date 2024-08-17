"use client";

import NetworkType from "@/components/NetworkType";
import Networks from "@/utils/Network";
import RecoveryPhraseWarning from "@/components/RecoveryPhraseWarning";
import { useState } from "react";

export default function CreateWallet() {
    const [networkName, setNetworkName] = useState<string | null>(null);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            {networkName ? (
                <RecoveryPhraseWarning />
            ) : (
                <div className="h-[600px] w-[600px] flex flex-col items-center">
                    <section className="h-[200px] w-full flex flex-col justify-center items-center">
                        <span className="text-4xl font-semibold">Select Network</span>
                        <span className="text-blue-200 text-center w-[400px] mt-6">
                            BitVault supports multiple blockchains. Which do you want to use?
                            You can add more later.
                        </span>
                    </section>
                    <section className="w-full">
                        {Networks.map((network) => (
                            <div 
                                key={network} 
                                className="mb-4 cursor-pointer" 
                                onClick={() => setNetworkName(network)}
                            >
                                <NetworkType networkName={network} />
                            </div>
                        ))}
                    </section>
                </div>
            )}
        </div>
    );
}
