import { Link } from "react-router-dom";

const LocationCard = ({ location }: { location: LocationResult }) => {
  return (
    <div className="flex flex-col gap-2 border w-[380px] p-8 bg-slate-700 text-white rounded-xl font-semibold text-lg">
      <h2 className="text-2xl text-cyan-300 mb-2">{location.name}</h2>
      <p>
        Type: <span className="font-normal">{location.type}</span>
      </p>
      <p>
        Dimension: <span className="font-normal">{location.dimension}</span>
      </p>
      <p>
        Residents:{" "}
        <span className="font-normal">{location.residents.length}</span>
      </p>
      <p className="underline text-blue-200 mt-4">
        <Link to={`/location/${location.id}`}>View Characters</Link>
      </p>
    </div>
  );
};

export default LocationCard;
