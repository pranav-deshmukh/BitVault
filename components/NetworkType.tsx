interface NetworkNameProps{
    networkName:string,
}

export default function NetworkType({networkName}:NetworkNameProps) {
  return (
    <div className="w-full h-16 flex justify-center bg-[#202127] hover:bg-[#1c1e29] rounded-xl text-lg font-semibold">
      <section className="w-full flex justify-start items-center ml-10">
        <span>{networkName}</span>
      </section>
    </div>
  );
}
