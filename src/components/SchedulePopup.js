import { useState } from "react";
import styles from "./SchedulePopup.module.css";
import TimeSelector from "./TimeSelector";
import { DateTime } from "luxon";
import Spinner from "./Spinner";
import { postCreateAppointment } from "../api/appointments";

export default function SchedulePopup({ location, close, success }) {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(
    DateTime.now().minus({ days: 1 }).toFormat("yyyy-LL-dd")
  );

  return (
    <div className={`card ${styles.container}`}>
      {loading ? (
        <div className={"loading-container-full"}>
          <Spinner />
        </div>
      ) : (
        <>
          <div class={styles.close} onClick={close}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.62089 7.5C9.62089 7.5 14.3292 12.2083 14.5601 12.4393C15.1466 13.0257 15.1466 13.9752 14.5601 14.5601C13.9737 15.1466 13.0242 15.1466 12.4393 14.5601C12.2083 14.3307 7.5 9.62089 7.5 9.62089C7.5 9.62089 2.79174 14.3292 2.56075 14.5601C1.97428 15.1466 1.02482 15.1466 0.439853 14.5601C-0.146618 13.9737 -0.146618 13.0242 0.439853 12.4393C0.669342 12.2083 5.37911 7.5 5.37911 7.5C5.37911 7.5 0.670841 2.79174 0.439853 2.56075C-0.146618 1.97428 -0.146618 1.02482 0.439853 0.439853C1.02632 -0.146618 1.97578 -0.146618 2.56075 0.439853C2.79174 0.669342 7.5 5.37911 7.5 5.37911C7.5 5.37911 12.2083 0.670841 12.4393 0.439853C13.0257 -0.146618 13.9752 -0.146618 14.5601 0.439853C15.1466 1.02632 15.1466 1.97578 14.5601 2.56075C14.3307 2.79174 9.62089 7.5 9.62089 7.5Z"
              />
            </svg>
          </div>
          <p>/{location}</p>
          <p>Please select a day and time slot that works for the client.</p>
          <TimeSelector time={date} setTime={setDate} location={location} />
          <button
            className={styles.button}
            onClick={async () => {
              setLoading(true); 
              await postCreateAppointment({
                location: location,
                time: date,
              });
              success();
            }}
          >
            SELECT
          </button>
        </>
      )}
    </div>
  );
}
