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

const Search = ({
  query,
  setQuery,
  setCity,
  options,
  setOptions,
  setWeather,
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
      {/* Search bar */}
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          justifyContent: "center",
          paddingTop: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "50%",
            backgroundColor: "#1d1c1f",
            borderRadius: "500px",
            alignItems: "center",
            padding: "8px",
            transition: "border-radius 0.3s, border-block-end 0.3s",
            borderBottomRightRadius: query === "" ? "500px" : "5px",
            borderBottomLeftRadius: query === "" ? "500px" : "5px",
            borderBlockEnd: query === "" ? "none" : "1px solid #3e3d40",
          }}
        >
          <SearchIcon sx={{ m: 2 }} />
          <InputBase
            type="text"
            placeholder="Search"
            onChange={inputHandler}
            value={query}
          />
        </Box>
      </Box>
      {/* Search list */}
      {query !== "" && (
        <List
          sx={{
            display: { xs: "none", sm: "block" },
            position: "absolute",
            zIndex: 2,
            backgroundColor: "#1d1c1f",
            width: "50%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {options.map((option, index) => (
            <React.Fragment key={option.name + "-" + index}>
              <ListItem
                onClick={() => onOptionSelect(option)}
                disablePadding
                sx={{
                  gap: "10px",
                  padding: "16px 24px",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "hsla(0, 0%, 100%, 0.08)" },
                }}
              >
                <ListItemIcon sx={{ color: "#7b7980" }}>
                  <LocationOnOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={`${option.name}, ${option.country}`} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Search;
