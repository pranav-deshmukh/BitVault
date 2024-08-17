"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const Router = useRouter();
  function pushToRoute() {
    Router.push('/createWallet')
  }
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="h-[600px] w-[600px] flex flex-col justify-center items-center">
        <section className="h-[200px] w-full flex flex-col justify-center items-center">
          <span className="text-4xl font-semibold">Welcome to BitVault</span>
          <span className="text-blue-200">Let&apos;s get started.</span>
        </section>
        <section className="h-[200px] w-full flex flex-col justify-center items-center">
          <button className="bg-[#FFFFFF] text-black w-[250px] h-[50px] rounded-xl hover:bg-slate-200 font-semibold" onClick={pushToRoute}>Create a Wallet</button>
        </section>
      </div>
    </main>
  );
}
