import Link from "next/link";

export const Footer = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-center gap-x-5 text-center text-2xl font-gotchi font-medium px-5 pt-20 pb-5">
        <div>
          made by pg & fifoooo
        </div>
        <div>-</div>
        <Link href={"/faq"}>fAq</Link>
      </div>
    </div>
  );
};
