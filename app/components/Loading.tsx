"use client";

import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[100]">
      <div className="text-center">
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div className="absolute inset-0 animate-pulse">
            <Image
              src="/devopsbird.svg"
              alt="DevOps Bird"
              width={200}
              height={200}
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute inset-0 animate-ping opacity-75">
            <Image
              src="/devopsbird.svg"
              alt="DevOps Bird"
              width={200}
              height={200}
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1EBDD1] to-[#8C51BF]">
            Loading DevOpsDay Peru...
          </h2>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1EBDD1] animate-ping [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-[#00A86B] animate-ping [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 rounded-full bg-[#8C51BF] animate-ping"></div>
          </div>
        </div>
      </div>
    </div>
  );
}