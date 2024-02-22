import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";

const Success = () => {
  return (
    <>
      <Head>
        <title>Success Page</title>
      </Head>
      <div className="h-full flex flex-col items-center mt-[250px] gap-y-2">
        <h1 className="text-green-600 font-bold text-5xl">Success</h1>
        <Button asChild className="w-fit" size="lg">
          <Link href="/patient/upcoming-appointments">
            Back to appointments
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Success;
