import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useState, useEffect, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import axios from "axios";

import "../css/map.css";
import { LocationData } from "../services/DataService";

const Map = () => {
  const mapElement = useRef();
  const { locationData } = LocationData();

  const [map, setMap] = useState(null);
  const [mapCoordinates, setMapCoordinates] = useState({ lat: 0, lon: 0 });
  const address = `${locationData.ulica} ${locationData.kucBroj} ${locationData.pbr}`;

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
        const coordinatesResponse = await axios.get(
          `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
            address,
          )}.json?key=aLgQNoPtQzJe5nGzbNocRvlSyQEjlOF4`,
        );

        if (coordinatesResponse.status === 200) {
          const coordinates = coordinatesResponse.data.results[0].position;
          setMapCoordinates({ lat: coordinates.lat, lon: coordinates.lon });
        } else {
          console.error(
            "Error fetching coordinates:",
            coordinatesResponse.statusText,
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchMapData();
  }, [address]);

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
};
export default Map;
