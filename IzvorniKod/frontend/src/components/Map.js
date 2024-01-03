import "@tomtom-international/web-sdk-maps/dist/maps.css"; // Import the CSS styles for the maps
import { useState, useEffect, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps"; // Import the TomTom Maps SDK
import "../css/map.css";
import { getConferenceId } from "../services/AuthService";
import axios from "axios";

function Map({ calculateButton }) {
  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(-74.006 || 0); // Providing a default value of 0 if null is encountered
  const [mapLatitude, setMapLatitude] = useState(40.7128 || 0); // Providing a default value of 0 if null is encountered
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        console.log("Initializing map...");
        const mapInstance = tt.map({
          key: "aLgQNoPtQzJe5nGzbNocRvlSyQEjlOF4",
          container: mapElement.current,
          center: [mapLongitude, mapLatitude],
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
  }, [mapLongitude, mapLatitude]);

  useEffect(() => {
    const conferenceId = getConferenceId();
    const fetchPosters = async () => {
      try {
        const response = await axios.post(
          "/api/konferencija/getKonfId",
          {
            password: conferenceId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        //Ovdje moram popraviti cijeli response
        if (response.status === 200) {
          const conferenceData = response.data;
          const mapResponse = await axios.get(
            `/api/konferencija/getLocation/${conferenceData}`,
          );

          if (mapResponse.status === 200) {
            const posterData = mapResponse.data;
            setMapLongitude(posterData);
            setMapLatitude(posterData);
          } else {
            console.error("Error fetching posters:", mapResponse.statusText);
          }
        } else {
          console.error("Error fetching conference data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    addMarkerToLocation(map, mapLatitude, mapLongitude);
  }, []);

  function addMarkerToLocation(map, latitude, longitude) {
    if (!map || isNaN(latitude) || isNaN(longitude)) {
      // Check if the map exists and if latitude/longitude are valid numbers
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
