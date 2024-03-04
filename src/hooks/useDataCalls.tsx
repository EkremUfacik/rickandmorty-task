import useSWR from "swr";
import { fetcher } from "@/services/fetcher";
import { useState } from "react";

interface FetchLocations {
  data: Location;
  isLoading: boolean;
  error: Error;
  totalPages: number;
}

interface FetchCharWithRelates {
  character: Character;
  relates: RelatedCharacters;
  charLoad: boolean;
  relatesLoad: boolean;
  error: Error;
}

interface FetchCharsByLocation {
  data: Character[];
  isLoading: boolean;
  error: Error;
}

const useDataCalls = () => {
  const fetchLocations = (page: number): FetchLocations => {
    const [totalPages, setTotalPages] = useState(1);
    const { data, isLoading, error } = useSWR(
      `/location?page=${page}`,
      fetcher,
      {
        onSuccess: (data) => {
          setTotalPages(data.info.pages);
        },
      }
    );
    return { data, isLoading, error, totalPages };
  };

  const fetchCharWithRelates = (id: string): FetchCharWithRelates => {
    const { data: character, isLoading: charLoad } = useSWR(
      `/character/${id}`,
      fetcher
    );

    const {
      data: relates,
      isLoading: relatesLoad,
      error,
    } = useSWR(
      character
        ? `/character/?status=${character.status}&gender=${character.gender}&species=${character.species}`
        : null,
      fetcher
    );

    return { character, relates, charLoad, relatesLoad, error };
  };

  const fetchCharsByLocation = (id: string): FetchCharsByLocation => {
    const { data: location, isLoading: loading } = useSWR<LocationResult>(
      `/location/${id}`,
      fetcher
    );

    const charsIds = location?.residents.map((charUrl) => {
      const charId = charUrl.split("/").pop();
      return charId;
    });

    const { data, isLoading, error } = useSWR(
      charsIds?.length! > 0 ? `/character/${charsIds}` : null,
      fetcher
    );

    // data değeri undefined dönerse boş array döndürüyoruz obje dönerse arraye çeviriyoruz
    const dataArr = data ? (Array.isArray(data) ? data : [data]) : [];

    return { data: dataArr, isLoading: loading || isLoading, error };
  };

  return {
    fetchLocations,
    fetchCharsByLocation,
    fetchCharWithRelates,
  };
};
export default useDataCalls;
