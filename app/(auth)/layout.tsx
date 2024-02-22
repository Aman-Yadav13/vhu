import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center relative bg-[#F3F4F5]">
      <div className="flex flex-col gap-y-4 items-center">
        <Image
          src="/vhclogo.png"
          alt="Virtual Health Care"
          width={200}
          height={300}
        />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
