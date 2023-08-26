import Link from "next/link";

const Success = () => {
  return (
    <div className="text-2xl flex flex-col justify-items-center place-items-center">
      <div>
        Congratulations !! Your OTC deal has been executed. Go to the official aavegotchi website to check your new asset(s) !!
      </div>
      <Link className="btn-gotchi text-2xl p-4 mt-10" href="/otc/new">Create new OTC</Link>
    </div>
  );
};

export default Success;
