import React from "react";
import { Box, Button, Grid, Stack, Typography } from "@material-ui/core";
import { Link as RouterLink, useParams } from "react-router-dom";
import type { CountriesResponse } from "../../types";
import { useQuery } from "react-query";

const fetchCountry = async (name: string): Promise<CountriesResponse[]> => {
  const response = await fetch(
    `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
  );
  if (!response.ok) throw Error("Error fetching countries");
  return response.json();
};

const Country = () => {
  const { countryName } = useParams();

  const { data } = useQuery(
    ["countries", countryName],
    ({}) => fetchCountry(countryName),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  const country = data![0];

  return (
    <>
      <Box mb={2}>
        <Button component={RouterLink} variant="outlined" to="/countries">
          Back
        </Button>
      </Box>
      <Grid container justifyContent="center" alignItems="center" spacing={8}>
        <Grid item xs={12} lg={6}>
          <img src={country.flag} alt={country.name} width="100%" />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h1">{country.name}</Typography>
          <Grid container justifyContent="center" spacing={8}>
            <Grid item xs={12} lg={6}>
              <Stack spacing={2}>
                <Typography variant="body1">
                  <b>Native Name: </b>
                  {country.name}
                </Typography>
                <Typography variant="body1">
                  <b>Population: </b>
                  {country.population}
                </Typography>
                <Typography variant="body1">
                  <b>Region: </b>
                  {country.region}
                </Typography>
                <Typography variant="body1">
                  <b>Sub Region: </b>
                  {country.subregion}
                </Typography>
                <Typography variant="body1">
                  <b>Capital: </b>
                  {country.capital}
                </Typography>
              </Stack>
            </Grid>
            <Box height="2rem" />
            <Grid item xs={12} lg={6}>
              <Stack spacing={2}>
                <Typography variant="body1">
                  <b>Top Level Domain: </b>
                  {country.topLevelDomain}
                </Typography>
                <Typography variant="body1">
                  <b>Currencies: </b>
                  {country.currencies[0].name}
                </Typography>
                <Typography variant="body1">
                  <b>Languages: </b>
                  {country.languages
                    .map((language) => language.name)
                    .join(", ")}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Typography component="p" variant="h5" sx={{ mt: 2 }}>
            <b>Border Countries: </b>
          </Typography>
          <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
            {country.borders.map((border) => (
              <Button key={border} variant="outlined">
                {border}
              </Button>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Country;
