import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import InfoCheck from "./components/InfoCheck";
import CheckIn from "./routes/CheckIn";
import { getProfile } from "./utils/user";
import LocationSelect from "./routes/LocationSelect";

export default function App() {
  const [token, setStateToken] = useState(null);
  const [user, setUser] = useState({});
  const [dependent, setDependent] = useState(null);
  const [location, setLocationState] = useState(null);

  function setToken(token) {
    sessionStorage.setItem("token", token);
    setStateToken(token);
  }

  function setLocation(location) {
    setLocationState(location);
    localStorage.setItem("location", location);
  }

  useEffect(() => {
    setLocationState(localStorage.getItem("location"));
  }, []);

  return (
    <main className={`${styles.main} card`}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LocationSelect setLocation={setLocation} />}
          />
          <Route
            path="/check-in"
            element={
              <InfoCheck
                setUser={setUser}
                user={user}
                setToken={setToken}
                token={token}
                setDependent={setDependent}
                dependent={dependent}
              >
                <CheckIn
                  profile={getProfile(user, dependent)}
                  location={location}
                />
              </InfoCheck>
            }
          />
        </Routes>
      </Router>
      <span className={styles.location}>{location}</span>
    </main>
  );
}
