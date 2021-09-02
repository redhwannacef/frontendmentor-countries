import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import type { CountriesResponse } from "../../types";

const fetchCountries = async (): Promise<CountriesResponse[]> => {
  const response = await fetch("https://restcountries.eu/rest/v2/all");
  if (!response.ok) throw Error("Error fetching countries");
  return response.json();
};

const Countries = () => {
  const { data: countries } = useQuery("countries", () => fetchCountries(), {
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const filteredCountries = countries!
    .filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase().trim())
    )
    .filter((country) => region === "" || country.region === region);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        mb={2}
        flexWrap="wrap"
      >
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{ width: 345 }}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="region">Region</InputLabel>
            <Select
              labelId="region"
              id="region-select"
              value={region}
              label="Region"
              onChange={(event) => setRegion(event.target.value as string)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Africa">Africa</MenuItem>
              <MenuItem value="Americas">Americas</MenuItem>
              <MenuItem value="Asia">Asia</MenuItem>
              <MenuItem value="Europe">Europe</MenuItem>
              <MenuItem value="Oceania">Oceania</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Grid container spacing={8} justifyContent="center">
        {filteredCountries!.map((country) => (
          <Grid
            key={country.name}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            maxWidth={345}
          >
            <Card variant="outlined">
              <Link component={RouterLink} to={`${country.name}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={country.flag}
                  alt={country.name}
                />
              </Link>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {country.name}
                </Typography>
                <Typography variant="body2">
                  <b>Population:</b> {country.population}
                </Typography>
                <Typography variant="body2">
                  <b>Region:</b> {country.region}
                </Typography>
                <Typography variant="body2">
                  <b>Capital</b>: {country.capital}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Countries;
