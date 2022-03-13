import { useEffect, useState } from "react";
import { getLocations } from "../api/locations";
import styles from "./LocationSelect.module.css";
import { useNavigate } from "react-router-dom";

export default function LocationSelect({ setLocation }) {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getLocations();
      setLocations(data.locations);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.heading}>
        Please select the correct profile to log in with.
      </p>
      <div className={styles["location-container"]}>
        {locations.map((loc) => (
          <div
            key={loc.location}
            className={styles["location-selector"]}
            onClick={() => {
              setLocation(loc.location);
              navigate("./check-in");
            }}
          >
            <p>{loc.location}</p>
            <p className={styles["location-address"]}>{loc.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
