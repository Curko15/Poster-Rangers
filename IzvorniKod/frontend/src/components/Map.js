import "@tomtom-international/web-sdk-maps/dist/maps.css"; // Import the CSS styles for the maps
import { useState, useEffect, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps"; // Import the TomTom Maps SDK
import "../css/map.css";
import { getConferenceId } from "../services/AuthService";
import axios from "axios";

function Map({ calculateButton }) {
  const mapElement = useRef();
  const [map, setMap] = useState(null);

  const [streetName, setStreetName] = useState("");
  const [mapCoordinates, setMapCoordinates] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    const initializeMap = async () => {
      try {
        console.log("Initializing map...");
        const mapInstance = tt.map({
          key: "aLgQNoPtQzJe5nGzbNocRvlSyQEjlOF4",
          container: mapElement.current,
          center: [mapCoordinates.lon, mapCoordinates.lat],
          zoom: 15,
        });

        if (mapInstance) {
          console.log("Map instance created:", mapInstance);
          setMap(mapInstance);
        } else {
          console.error("Map instance not created");
        }
      } catch (error) {
        console.error("Map initialization error:", error);
      }
    };

    if (mapElement.current) {
      initializeMap();
    } else {
      console.warn("Map element not found");
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [mapCoordinates]);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const conferenceId = getConferenceId();
        const conferenceResponse = await axios.post(
          "/api/konferencija/getKonfId",
          {
            password: conferenceId,
          },
        );

        if (conferenceResponse.status === 200) {
          const conferenceData = conferenceResponse.data;
          const locationResponse = await axios.get(
            `/api/konferencija/getLocation/${conferenceData}`,
          );

          if (locationResponse.status === 200) {
            const posterData = locationResponse.data;
            setStreetName(
              `${posterData.ulica} ${posterData.kucBroj} ${posterData.pbr}`,
            );

            const coordinatesResponse = await axios.get(
              `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
                streetName,
              )}.json?key=aLgQNoPtQzJe5nGzbNocRvlSyQEjlOF4`,
            );

            if (coordinatesResponse.status === 200) {
              const coordinates = coordinatesResponse.data.results[0].position;
              console.log("ovo je izlazzzzz", coordinatesResponse.data);
              console.log(streetName);
              setMapCoordinates({ lat: coordinates.lat, lon: coordinates.lon });
            } else {
              console.error(
                "Error fetching coordinates:",
                coordinatesResponse.statusText,
              );
            }
          } else {
            console.error(
              "Error fetching location data:",
              locationResponse.statusText,
            );
          }
        } else {
          console.error(
            "Error fetching conference data:",
            conferenceResponse.statusText,
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMapData();
  }, [streetName]);

  useEffect(() => {
    addMarkerToLocation(map, mapCoordinates.lat, mapCoordinates.lon);
  }, [map, mapCoordinates]);

  function addMarkerToLocation(map, latitude, longitude) {
    if (!map || isNaN(latitude) || isNaN(longitude)) {
      return;
    }

    const newMarker = new tt.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);
  }

  return (
    <>
      <div className="mapContainer">
        <div className="mapDiv" ref={mapElement}></div>
      </div>
    </>
  );
}

export default Map;
