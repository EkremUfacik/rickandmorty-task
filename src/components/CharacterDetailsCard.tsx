import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavs,
  removeFavs,
  selectFavorites,
} from "@/features/favoritesSlice";
import { Button } from "./ui/button";

const CharacterDetailsCard = ({ character }: { character: Character }) => {
  const { id, name, status, image, species, gender } = character;
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFav = favorites.some((char) => char.id === id);
  return (
    <div key={id} className="w-96 mx-auto text-center">
      <img
        src={image}
        alt={name}
        className="h-80 w-full object-cover rounded-t-lg mx-auto"
      />
      <div className="py-2 px-4 space-y-4 font-semibold">
        <h2 className="font-semibold text-lg">{name}</h2>

        <div className="flex items-center gap-2 justify-center">
          <p
            className={cn(
              "w-3 h-3 rounded-full bg-gray-500",
              status === "Dead" && "bg-red-500",
              status === "Alive" && "bg-green-500"
            )}
          ></p>
          <p>{status}</p>
        </div>
        <p>{gender}</p>
        <p>{species}</p>
      </div>

      {isFav ? (
        <Button
          variant="destructive"
          className="mx-auto block my-4"
          onClick={() => dispatch(removeFavs(id))}
        >
          Remove Favorites
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="mx-auto block my-4"
          onClick={() => dispatch(addFavs(character))}
        >
          Add Favorites
        </Button>
      )}
    </div>
  );
};

export default CharacterDetailsCard;
