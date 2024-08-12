import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <main className="flex min-h-screen flex-col p-6 pt-[240px]">
      <div className="flex flex-grow items-center justify-center mt- h-full bg-gray-200 mb-5">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-200 px-6 py-10 md:px-20 w-full md:w-auto">
          <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />
          <p className="text-xl text-gray-800 md:text-3xl md:leading-normal">
            <strong>Welcome to Meru.</strong> You can find the best automotive
            spare parts for your workshop.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-orange-400 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-500 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
      <div className="flex h-20 shrink-0 items-center justify-center rounded-lg p-4 md:h-52 relative">
        <Image
          src="/bottom.jpeg"
          fill
          objectFit="contain"
          className="md:block hidden"
          alt="Screenshots of the dashboard project showing desktop version"
        />
      </div>
    </main>
  );
};

export default Page;
