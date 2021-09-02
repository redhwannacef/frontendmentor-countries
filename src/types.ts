export type CountriesResponse = {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
  nativeName: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: Currency[];
  languages: Language[];
  borders: string[];
};

type Currency = {
  name: string;
};

type Language = {
  name: string;
};
