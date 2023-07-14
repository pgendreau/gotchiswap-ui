import { useGotchisQuery } from "@/graphql/core/__generated__/types";
import { useGotchisSvgQuery } from "@/graphql/svg/__generated__/types";
import Link from "next/link";

const Home = () => {
  // const gotchi = useGotchiQuery({ variables: { id: "24091" } });
  const gotchis = useGotchisQuery({
    variables: { owner: "0x1a08b4d6497fa6d5970bd8f6c72bc5fbc8dd500e" },
    context: { clientName: "core" },
  });
  const ids = gotchis.data?.aavegotchis?.map((gotchi) => gotchi?.id);
  const svgs = useGotchisSvgQuery({
    variables: { ids: ids },
    context: { clientName: "svg" },
  });
  console.log(svgs.data?.aavegotchis);
  return (
    <>
      <div className="font-katin font-medium text-2xl">
        <p>Hello & Welcome to Gotchiswap frens!</p>
        <p>Gotchiswap is an OTC trading platform for Aavegotchis.</p>
        <p>The platform is free to use and takes 0 fees.</p>
        <p>
          Its goal is to provide a non custodial, trustless way for individuals
          to trade assets in an OTC fashion
        </p>
      </div>

      <div className="flex flex-row justify-center gap-x-10 pt-10">
        <Link
          href={"/otc/new"}
          className="rounded-md bg-gotchi-500 px-5 py-4 text-2xl font-semibold text-white shadow-sm hover:bg-gotchi-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gotchi-500"
        >
          Create an OTC deal
        </Link>
        <button
          type="button"
          className="rounded-md bg-gotchi-500 px-5 py-4 text-2xl font-semibold text-white shadow-sm hover:bg-gotchi-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gotchi-500"
        >
          See my deals
        </button>
      </div>
    </>
  );
};

export default Home;
