import React from "react";
import {
  Box,
  InputBase,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Search as SearchIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
} from "@mui/icons-material";
import { API_KEY, BASE_URL } from "../api";

const SearchRes = ({
  query,
  setQuery,
  setCity,
  options,
  setOptions,
  setWeather,
  toggleSearch,
}) => {
  const inputHandler = (e) => {
    const value = e.target.value.trim();
    setQuery(e.target.value);
    if (value !== "") {
      searchOptions(value);
    }
  };

  const searchOptions = (value) => {
    fetch(
      `${BASE_URL}/geo/1.0/direct?q=${value.trim()}&limit=5&APPID=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((e) => console.log({ e }));
  };

  const onOptionSelect = (option) => {
    setCity(option);
    setOptions([]);
    setQuery("");
    fetch(
      `${BASE_URL}/data/2.5/forecast?lat=${option.lat}&lon=${option.lon}&units=metric&lang=en&APPID=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const fiveDayForecast = data.list.slice(0, 40); // Assuming data.list contains 40 entries (5 days with 8 entries each)

        setWeather({
          list: fiveDayForecast,
          city: data.city,
        });
      });
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            borderBlockEnd: "1px solid hsl(0, 0%, 100%)",
            backgroundColor: "#1d1c1f",
            padding: "8px",
          }}
        >
          <SearchIcon sx={{ m: 2 }} />
          <InputBase
            placeholder="Search"
            onChange={inputHandler}
            value={query}
          />
        </Box>
      </Box>
      {query !== "" && (
        <List
          sx={{
            display: { xs: "block", sm: "none" },
            position: "absolute",
            zIndex: 2,
            backgroundColor: "#1d1c1f",
            width: "100%",
          }}
        >
          {options.map((option, index) => (
            <ListItem
              key={`${option.name}-${index}`}
              disablePadding
              sx={{
                gap: "10px",
                padding: "16px 24px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "hsla(0, 0%, 100%, 0.08)",
                },
              }}
              onClick={() => {
                onOptionSelect(option);
                toggleSearch();
              }}
            >
              <ListItemIcon sx={{ color: "#7b7980" }}>
                <LocationOnOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={`${option.name}, ${option.country}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchRes;
