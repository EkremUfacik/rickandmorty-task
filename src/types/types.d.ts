interface Character {
  id: string;
  name: string;
  status: string;
  image: string;
  species: string;
  gender: string;
  type: string;
  location: {
    name: string;
    url: string;
  };
}

interface LocationResult {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface Location {
  info: Info;
  results: LocationResult[];
}

interface RelatedCharacters {
  info: Info;
  results: Character[];
}
