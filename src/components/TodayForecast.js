import { Box, Divider, SvgIcon, Typography, Grid } from "@mui/material";
import React from "react";
import {
  VisibilityOutlined as VisibilityOutlinedIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  CalendarToday as CalendarTodayIcon,
  WbSunnyOutlined as WbSunnyOutlinedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
  DeviceThermostat as DeviceThermostatIcon,
} from "@mui/icons-material";
import { getSunTime } from "../api";

const TodayForecast = ({ weather }) => {
  const description = weather.list[0].weather[0].description;
  // Capitalize the first letter of the description
  const capitalizedDescription = description
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const dateBuilder = (d) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${day} ${date}, ${month}`;
  };

  const module = {
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    weekDayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  };

  const { list: forecastList } = weather;

  const daysForecast = () => {
    const fiveDayForecast = [];
    for (let i = 0; i < 5; i++) {
      const {
        main: { temp },
        weather,
        dt_txt,
      } = forecastList[i * 8];
      const [{ icon, description }] = weather;
      const date = new Date(dt_txt);
      fiveDayForecast.push(
        <Grid container spacing={5} alignItems="center">
          <Grid mt={1} item>
            <img
              width="30px"
              height="30px"
              src={require(`../assets/${icon}.png`)}
              alt={description}
              style={{ margin: "auto" }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body-1" fontFamily="Satoshi">
              {Math.round(temp)}&deg;C
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body-1" sx={{ color: "#7b7980" }}>
              {/* {dateBuilder(new Date())} */}
              {date.getDate()} {module.monthNames[date.getUTCMonth()]}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body-1" sx={{ color: "#7b7980" }}>
              {/* {dateBuilder(new Date())} */}
              {module.weekDayNames[date.getUTCDay()]}
            </Typography>
          </Grid>
        </Grid>
      );
    }
    return fiveDayForecast;
  };

  return (
      <Box
        m="10px"
        sx={{ display: { xs: "none", sm: "grid" } }}
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="130px"
        gap="30px"
      >
        {/* Current Weather */}
        <Box
          gridColumn="span 3"
          gridRow="span 2"
          borderRadius="28px"
          backgroundColor="#1d1c1f"
        >
          <Box m="20px">
            <Typography variant="body-1" fontFamily="Satoshi">
              Now
            </Typography>
            <Box>
              <Box display="flex" alignItems="center" mb={3}>
                <Typography variant="h2" fontFamily="Satoshi">
                  {Math.round(weather.list[0].main.temp)}&deg;C
                </Typography>
                <img
                  width="70px"
                  height="70px"
                  src={require(`../assets/${weather.list[0].weather[0].icon}.png`)}
                  alt={weather.list[0].weather[0].description}
                  style={{ margin: "auto" }}
                />
              </Box>
              <Typography variant="body-1" fontFamily="Satoshi">
                {capitalizedDescription}
              </Typography>
              <Divider
                variant="middle"
                sx={{ marginTop: "20px", marginBottom: "20px" }}
              />
              <Box
                display="flex"
                alignItems="center"
                sx={{ marginBottom: "20px" }}
              >
                <CalendarTodayIcon
                  sx={{ color: "#7b7980", marginRight: "10px" }}
                />
                <Typography variant="body-1" fontFamily="Satoshi">
                  {dateBuilder(new Date())}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <LocationOnOutlinedIcon
                  sx={{ color: "#7b7980", marginRight: "10px" }}
                />
                <Typography variant="body-1" fontFamily="Satoshi">
                  {weather.city.name}, {weather.city.country}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Today Highlights */}
        <Box
          gridColumn="span 9"
          gridRow="span 3"
          borderRadius="28px"
          backgroundColor="#1d1c1f"
        >
          <Box m="25px">
            <Typography variant="body-1" fontFamily="Satoshi">
              Today Highlights
            </Typography>
          </Box>

          {/* sunset and sunrise */}
          <Box display="flex" justifyContent="center">
            <Box backgroundColor="#131214" borderRadius="16px">
              <Typography
                m={2}
                variant="h6"
                fontFamily="Satoshi"
                color="#7b7980"
              >
                Sunrise and Sunset
              </Typography>
              <Box display="flex">
                {/* sunrise */}
                <Box m="20px" display="flex" alignItems="center">
                  <WbSunnyOutlinedIcon sx={{ width: "50px", height: "50px" }} />
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    ml={4}
                    sx={{ gap: "5px" }}
                  >
                    <Typography
                      variant="body-1"
                      fontFamily="Satoshi"
                      color="#7b7980"
                    >
                      Sunrise
                    </Typography>
                    <Typography variant="h5" fontFamily="Satoshi">
                      {getSunTime(weather.city.sunrise)}
                    </Typography>
                  </Box>
                </Box>
                {/* sunset */}
                <Box
                  m="20px 40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <DarkModeOutlinedIcon
                    sx={{ width: "50px", height: "50px" }}
                  />
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    ml={4}
                    sx={{ gap: "5px" }}
                  >
                    <Typography
                      variant="body-1"
                      fontFamily="Satoshi"
                      color="#7b7980"
                    >
                      Sunset
                    </Typography>
                    <Typography variant="h5" fontFamily="Satoshi">
                      {getSunTime(weather.city.sunset)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* humidity, pressure etc */}
          <Box m={2}>
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gap="10px"
            >
              <Box
                gridColumn="span 3"
                gridRow="span 3"
                borderRadius="28px"
                backgroundColor="#131214"
              >
                <Typography
                  m={2}
                  variant="h6"
                  fontFamily="Satoshi"
                  color="#7b7980"
                >
                  Humidity
                </Typography>
                <Box m="20px" display="flex" alignItems="center">
                  <SvgIcon sx={{ mr: "auto", width: "60px", height: "60px" }}>
                    <path d="M15.0066 3.25608C16.8483 2.85737 19.1331 2.8773 22.2423 3.65268C22.7781 3.78629 23.1038 4.32791 22.9699 4.86241C22.836 5.39691 22.2931 5.7219 21.7573 5.58829C18.8666 4.86742 16.9015 4.88747 15.4308 5.20587C13.9555 5.52524 12.895 6.15867 11.7715 6.84363L11.6874 6.89494C10.6044 7.55565 9.40515 8.28729 7.82073 8.55069C6.17734 8.82388 4.23602 8.58235 1.62883 7.54187C1.11607 7.33724 0.866674 6.75667 1.0718 6.24513C1.27692 5.73359 1.85889 5.48479 2.37165 5.68943C4.76435 6.6443 6.32295 6.77699 7.492 6.58265C8.67888 6.38535 9.58373 5.83916 10.7286 5.14119C11.855 4.45445 13.1694 3.6538 15.0066 3.25608Z" />
                    <path d="M22.2423 7.64302C19.1331 6.86765 16.8483 6.84772 15.0066 7.24642C13.1694 7.64415 11.855 8.44479 10.7286 9.13153C9.58373 9.8295 8.67888 10.3757 7.492 10.573C6.32295 10.7673 4.76435 10.6346 2.37165 9.67977C1.85889 9.47514 1.27692 9.72393 1.0718 10.2355C0.866674 10.747 1.11607 11.3276 1.62883 11.5322C4.23602 12.5727 6.17734 12.8142 7.82073 12.541C9.40515 12.2776 10.6044 11.546 11.6874 10.8853L11.7715 10.834C12.895 10.149 13.9555 9.51558 15.4308 9.19621C16.9015 8.87781 18.8666 8.85777 21.7573 9.57863C22.2931 9.71224 22.836 9.38726 22.9699 8.85275C23.1038 8.31825 22.7781 7.77663 22.2423 7.64302Z" />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.9998 10.0266C18.6526 10.0266 18.3633 10.2059 18.1614 10.4772C18.0905 10.573 17.9266 10.7972 17.7089 11.111C17.4193 11.5283 17.0317 12.1082 16.6424 12.7555C16.255 13.3996 15.8553 14.128 15.5495 14.8397C15.2567 15.5213 14.9989 16.2614 14.9999 17.0117C15.0006 17.2223 15.0258 17.4339 15.0604 17.6412C15.1182 17.9872 15.2356 18.4636 15.4804 18.9521C15.7272 19.4446 16.1131 19.9674 16.7107 20.3648C17.3146 20.7664 18.0748 21 18.9998 21C19.9248 21 20.685 20.7664 21.2888 20.3648C21.8864 19.9674 22.2724 19.4446 22.5192 18.9522C22.764 18.4636 22.8815 17.9872 22.9393 17.6413C22.974 17.4337 22.9995 17.2215 22.9998 17.0107C23.0001 16.2604 22.743 15.5214 22.4501 14.8397C22.1444 14.128 21.7447 13.3996 21.3573 12.7555C20.968 12.1082 20.5803 11.5283 20.2907 11.111C20.073 10.7972 19.909 10.573 19.8382 10.4772C19.6363 10.2059 19.3469 10.0266 18.9998 10.0266ZM20.6119 15.6257C20.3552 15.0281 20.0049 14.3848 19.6423 13.782C19.4218 13.4154 19.2007 13.0702 18.9998 12.7674C18.7989 13.0702 18.5778 13.4154 18.3573 13.782C17.9948 14.3848 17.6445 15.0281 17.3878 15.6257L17.3732 15.6595C17.1965 16.0704 16.9877 16.5562 17.0001 17.0101C17.0121 17.3691 17.1088 17.7397 17.2693 18.0599C17.3974 18.3157 17.574 18.5411 17.8201 18.7048C18.06 18.8643 18.4248 19.0048 18.9998 19.0048C19.5748 19.0048 19.9396 18.8643 20.1795 18.7048C20.4256 18.5411 20.6022 18.3156 20.7304 18.0599C20.8909 17.7397 20.9876 17.3691 20.9996 17.01C21.0121 16.5563 20.8032 16.0705 20.6265 15.6597L20.6119 15.6257Z"
                    />
                    <path d="M14.1296 11.5308C14.8899 11.2847 15.4728 12.076 15.1153 12.7892C14.952 13.1151 14.7683 13.3924 14.4031 13.5214C13.426 13.8666 12.6166 14.3527 11.7715 14.8679L11.6874 14.9192C10.6044 15.5799 9.40516 16.3115 7.82074 16.5749C6.17735 16.8481 4.23604 16.6066 1.62884 15.5661C1.11608 15.3615 0.866688 14.7809 1.07181 14.2694C1.27694 13.7578 1.8589 13.509 2.37167 13.7137C4.76436 14.6685 6.32297 14.8012 7.49201 14.6069C8.67889 14.4096 9.58374 13.8634 10.7286 13.1654C11.8166 12.5021 12.9363 11.9171 14.1296 11.5308Z" />
                  </SvgIcon>
                  <Typography variant="h5" fontFamily="Satoshi">
                    {weather.list[0].main.humidity}%
                  </Typography>
                </Box>
              </Box>
              <Box
                gridColumn="span 3"
                gridRow="span 3"
                borderRadius="28px"
                backgroundColor="#131214"
              >
                <Typography
                  m={2}
                  variant="h6"
                  fontFamily="Satoshi"
                  color="#7b7980"
                >
                  Pressure
                </Typography>
                <Box m="20px" display="flex" alignItems="center">
                  <SvgIcon sx={{ mr: "auto", width: "60px", height: "60px" }}>
                    <svg
                      width="64px"
                      height="64px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 13.1L4.5 11.6C6.04 10.68 7.96 10.68 9.5 11.6C11.04 12.52 12.96 12.52 14.5 11.6C16.04 10.68 17.96 10.68 19.5 11.6L22 13.1"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2 3.90002L4.5 5.40002C6.04 6.32002 7.96 6.32002 9.5 5.40002C11.04 4.48002 12.96 4.48002 14.5 5.40002C16.04 6.32002 17.96 6.32002 19.5 5.40002L22 3.90002"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2 20.1L4.5 18.6C6.04 17.68 7.96 17.68 9.5 18.6C11.04 19.52 12.96 19.52 14.5 18.6C16.04 17.68 17.96 17.68 19.5 18.6L22 20.1"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </SvgIcon>
                  <Typography variant="h5" fontFamily="Satoshi">
                    {weather.list[0].main.pressure}
                    <sub>hPa</sub>
                  </Typography>
                </Box>
              </Box>
              <Box
                gridColumn="span 3"
                gridRow="span 3"
                borderRadius="28px"
                backgroundColor="#131214"
              >
                <Typography
                  m={2}
                  variant="h6"
                  fontFamily="Satoshi"
                  color="#7b7980"
                >
                  Visibility
                </Typography>
                <Box m="20px" display="flex" alignItems="center">
                  <VisibilityOutlinedIcon
                    sx={{ mr: "auto", width: "60px", height: "60px" }}
                  />
                  <Typography variant="h5" fontFamily="Satoshi">
                    <sub>{weather.list[0].visibility / 1000}km</sub>
                  </Typography>
                </Box>
              </Box>
              <Box
                gridColumn="span 3"
                gridRow="span 3"
                borderRadius="28px"
                backgroundColor="#131214"
              >
                <Typography
                  m={2}
                  variant="h6"
                  fontFamily="Satoshi"
                  color="#7b7980"
                >
                  Feels Like
                </Typography>
                <Box m="20px" display="flex" alignItems="center">
                  <DeviceThermostatIcon
                    sx={{ mr: "auto", width: "60px", height: "60px" }}
                  />
                  <Typography variant="h5" fontFamily="Satoshi">
                    {Math.round(weather.list[0].main.feels_like)}&deg;C
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 5 days forecast */}
        <Box
          gridColumn="span 3"
          gridRow="span 2"
          borderRadius="28px"
          backgroundColor="#1d1c1f"
        >
          <Box m="15px">
            <Typography variant="body-1" fontFamily="Satoshi">
              5 Days Forecast
            </Typography>
            {daysForecast()}
          </Box>
        </Box>
      </Box>
  );
};

export default TodayForecast;
