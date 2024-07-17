export const API_KEY = "b450e809dae9072242c06b6cb90f3bb5";
export const BASE_URL = "https://api.openweathermap.org";
export const getSunTime = (timestamp) => {
  const date = new Date(timestamp * 1000)
  let hours = date.getHours().toString()
  let minutes = date.getMinutes().toString()

  if (hours.length <= 1) hours = `0${hours}`
  if (minutes.length <= 1) minutes = `0${minutes}`

  return `${hours}:${minutes}`
}