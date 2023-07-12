import { useGotchisQuery } from "@/graphql/core/__generated__/types";
import { useGotchisSvgQuery } from "@/graphql/svg/__generated__/types";

const Home = () => {
  // const gotchi = useGotchiQuery({ variables: { id: "24091" } });
  const gotchis = useGotchisQuery({variables: { owner: "0x1a08b4d6497fa6d5970bd8f6c72bc5fbc8dd500e"}, context: { clientName: "core"}})
  const ids = gotchis.data?.aavegotchis?.map((gotchi) => gotchi?.id)
  const svgs = useGotchisSvgQuery({variables: { ids: ids }, context: { clientName: "svg"}})
  console.log(svgs.data?.aavegotchis)
  return <div>
    Home 
    <ul>
        { gotchis.data?.aavegotchis?.map((gotchi) => {
            return <li key={gotchi?.id}>
                {gotchi?.gotchiId}
                <div className="w-20 h-20" dangerouslySetInnerHTML={{ __html: svgs.data?.aavegotchis?.find((svg) => svg?.id === gotchi?.id)?.svg ?? "empty"}} />
            </li>
        } )}
    </ul>
        
    </div>;
};

export default Home;
