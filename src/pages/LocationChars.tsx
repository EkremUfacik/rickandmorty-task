import CharacterCard from "@/components/CharacterCard";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDataCalls from "@/hooks/useDataCalls";
import { paginateFunc } from "@/utils";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LocationChars = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const { locationId } = useParams<{ locationId: string }>();
  const { fetchCharsByLocation } = useDataCalls();
  const { data, isLoading } = fetchCharsByLocation(locationId!);

  const filteredData = data?.filter((char) => {
    return (
      char.name.toLowerCase().includes(search.toLowerCase()) &&
      (status === "all" || char.status.toLowerCase() === status.toLowerCase())
    );
  });

  // filtrelenmiş datayı paginate ediyoruz

  const { paginatedData, totalPages } = paginateFunc(filteredData, page);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center">Location Characters</h2>
      <div className="text-center space-x-8 my-8">
        <Link to="/">
          <Button>Back to Locations</Button>
        </Link>
        <Link to="/favorites">
          <Button>Go to Favorites</Button>
        </Link>
      </div>
      <div className="flex justify-center gap-4">
        <Input
          className="w-60"
          value={search}
          placeholder="Search characters"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          onValueChange={(value: string) => setStatus(value)}
          defaultValue="all"
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="dead">Dead</SelectItem>
              <SelectItem value="alive">Alive</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <div className="my-10">
          <Loading />
        </div>
      ) : paginatedData?.length === 0 ? (
        <p className="text-xl text-center my-10">No characters found</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 my-10">
          {paginatedData?.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      )}
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

export default LocationChars;
