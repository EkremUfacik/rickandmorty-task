import CharacterCard from "@/components/CharacterCard";
import CharacterDetailsCard from "@/components/CharacterDetailsCard";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import useDataCalls from "@/hooks/useDataCalls";
import { Link, useParams } from "react-router-dom";

const CharacterDetails = () => {
  const { charId } = useParams<{ charId: string }>();
  const { fetchCharWithRelates } = useDataCalls();
  const { character, relates, charLoad, relatesLoad } = fetchCharWithRelates(
    charId!
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Character Details</h1>
      <Link to="/">
        <Button className="mx-auto block my-8">Back to Locations</Button>
      </Link>
      <div className="my-10">
        {charLoad ? (
          <Loading />
        ) : (
          <CharacterDetailsCard character={character} />
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-center mb-4">
          Related Characters
        </h2>
        {relatesLoad ? (
          <Loading />
        ) : (
          <div className="overflow-auto py-4">
            <div className="flex gap-4">
              {relates?.results.map((char) => (
                <CharacterCard key={char.id} character={char} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetails;
