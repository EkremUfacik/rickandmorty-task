import CharacterCard from "@/components/CharacterCard";
import { Button } from "@/components/ui/button";
import { selectFavorites } from "@/features/favoritesSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector(selectFavorites);
  return (
    <div className="">
      <h2 className="text-3xl text-center font-bold">Favorites</h2>

      <Link to="/">
        <Button className="mx-auto block my-8">Back to Locations</Button>
      </Link>
      {favorites.length === 0 ? (
        <div className="text-center my-8">
          <p className="text-xl">No favorites added yet</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 my-10">
          {favorites.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
