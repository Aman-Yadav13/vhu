import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";

const Error = async () => {
  return (
    <>
      <Head>
        <title>Error Page</title>
      </Head>
      <div className="h-full flex flex-col items-center mt-[250px] gap-y-2">
        <h1 className="text-red-600 font-bold text-5xl">Error</h1>
        <Button className="w-fit" asChild>
          <Link href="/">
            <p className="capitalize">Back to home</p>
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Error;
