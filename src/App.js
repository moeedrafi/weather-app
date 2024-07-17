import React, { useState } from "react";
import TodayForecast from "./components/TodayForecast";
import Search from "./components/Search";
import SearchRes from "./components/SearchRes";
import TodayForecastRes from "./components/TodayForecastRes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar, Button, CssBaseline, Typography } from "@mui/material";
import "./index.css";
import {Search as SearchIcon} from "@mui/icons-material";

const App = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState(null);
  const [options, setOptions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [showSearch, setShowSearch] = useState(false); //responsive

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {weather ? (
          <div>
            <Search
              query={query}
              setQuery={setQuery}
              options={options}
              setOptions={setOptions}
              setCity={setCity}
              setWeather={setWeather}
            />
            <TodayForecast weather={weather} />
          </div>
        ) : (
          <Search
            query={query}
            setQuery={setQuery}
            options={options}
            setOptions={setOptions}
            setCity={setCity}
            setWeather={setWeather}
          />
        )}
        {/* responsive */}
        {showSearch ? (
          <SearchRes
            query={query}
            setQuery={setQuery}
            options={options}
            setOptions={setOptions}
            setCity={setCity}
            setWeather={setWeather}
            toggleSearch={toggleSearch}
          />
        ) : weather ? (
          <TodayForecastRes weather={weather} toggleSearch={toggleSearch} />
        ) : (
          <AppBar
            sx={{
              display: { xs: "flex", sm: "none" },
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: "20px",
              background: "none",
            }}
            position="sticky"
          >
            <Typography variant="h6" fontFamily="Satoshi">
              Weather App
            </Typography>
            <Button
              onClick={toggleSearch}
              size="large"
              startIcon={<SearchIcon />}
              sx={{ color: "#eae6f2" }}
            >
              Search
            </Button>
          </AppBar>
        )}
      </ThemeProvider>
    </div>
  );
};

export default App;
