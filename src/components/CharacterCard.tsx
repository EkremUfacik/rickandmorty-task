import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavs,
  removeFavs,
  selectFavorites,
} from "@/features/favoritesSlice";

const CharacterCard = ({ character }: { character: Character }) => {
  const { id, name, image, status, species } = character;
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFav = favorites.some((char) => char.id === id);
  return (
    <div
      key={id}
      className=" border w-80 min-w-80 border-slate-300 rounded-lg hover:shadow-2xl transition duration-300 ease-in-out"
    >
      <Link to={`/character/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-80 object-cover rounded-t-lg"
        />
        <div className="py-2 px-4 space-y-1 font-semibold">
          <h2 className="font-semibold text-lg">{name}</h2>

          <div className="flex items-center gap-2">
            <p
              className={cn(
                "w-3 h-3 rounded-full bg-gray-500",
                status === "Dead" && "bg-red-500",
                status === "Alive" && "bg-green-500"
              )}
            ></p>
            <p>{status}</p>
          </div>

          <p>{species}</p>
        </div>
      </Link>
      {isFav ? (
        <Button
          variant="destructive"
          className="mx-auto block mb-4"
          onClick={() => dispatch(removeFavs(id))}
        >
          Remove Favorites
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="mx-auto block mb-4"
          onClick={() => dispatch(addFavs(character))}
        >
          Add Favorites
        </Button>
      )}
    </div>
  );
};

export default CharacterCard;
