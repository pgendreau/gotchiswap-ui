import Link from "next/link";

export const Footer = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-center gap-x-2 text-center text-2xl font-gotchi font-medium px-5 pt-20 pb-5">
        <div>made by</div>
        <Link target="_blank" href={"https://discordapp.com/users/829312065437040730"}>pg</Link>
        <div>&</div>
        <Link target="_blank" href={"https://discordapp.com/users/276081752236097536"}>fifoooo</Link>
        <div>-</div>
        <Link href={"/faq"}>fAq</Link>
      </div>
    </div>
  );
};
