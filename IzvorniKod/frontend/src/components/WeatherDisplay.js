import ReactWeather, { useOpenWeather } from "react-open-weather";

const WeatherDisplay = (props) => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: "cd9f7696d0bd3387399e903c5be61456",
    lat: props.lat.toString(),
    lon: props.lon.toString(),
    lang: "en",
    unit: "metric",
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="New York City"
      unitsLabels={{ temperature: "C", windSpeed: "km/h" }}
      showForecast
    />
  );
};

export default WeatherDisplay;
