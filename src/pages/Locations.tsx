import Loading from "@/components/Loading";
import LocationCard from "@/components/LocationCard";
import Pagination from "@/components/Pagination";
import useDataCalls from "@/hooks/useDataCalls";

import { useState } from "react";

const Locations = () => {
  const [page, setPage] = useState(1);
  const { fetchLocations } = useDataCalls();
  const { data, isLoading, totalPages } = fetchLocations(page);

  return (
    <div className="">
      <h1 className="text-center text-3xl font-bold">Locations</h1>
      <div className="flex flex-wrap gap-8 justify-center my-10">
        {isLoading ? (
          <Loading />
        ) : (
          data.results.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))
        )}
      </div>
      <div className="flex justify-center">
        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Locations;
