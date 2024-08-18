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
                <div className="md:h-[600px] md:w-[600px] flex flex-col items-center">
                    <section className="h-[200px] w-full flex flex-col justify-center items-center mt-4">
                        <span className="md:text-4xl text-2xl font-semibold">Select Network</span>
                        <span className="text-blue-200 text-center md:w-[400px] mt-6">
                            BitVault supports multiple blockchains. Which do you want to use?
                            You can add more later.
                        </span>
                    </section>
                    <section className="md:w-full w-[200px]">
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
