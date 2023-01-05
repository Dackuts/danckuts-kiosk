import { useState } from "react";
import styles from "./SchedulePopup.module.css";
import TimeSelector from "./TimeSelector";
import { DateTime } from "luxon";
import Spinner from "./Spinner";
import Caution from "../assets/caution.png";
import Cheers from "../assets/cheers.png";
import { postCreateAppointment } from "../api/appointments";

export default function SchedulePopup({ location, profile, close, success }) {
  const [state, setState] = useState("schedule");
  const [error, setError] = useState("Test error");
  const [date, setDate] = useState(
    DateTime.now().minus({ days: 1 }).toFormat("yyyy-LL-dd")
  );
  const [timer, setTimer] = useState(null);
  const [seconds, setSeconds] = useState(15);

  function canAutoCheckin(newApptTime) {
    return Math.abs(DateTime.now().diff(DateTime.fromISO(newApptTime), 'minutes').minutes) <= 20
  }

  function startTimer() {
    setTimer(
      setInterval(() => {
        setSeconds((n) => n - 1);
      }, 1000)
    );
  }

  if (seconds === 0) {
    clearInterval(timer);
    if (state === "success") {
      success();
    } else {
      close();
    }
  }

  function X() {
    return (
      <div className={styles.close} onClick={close}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.62089 7.5C9.62089 7.5 14.3292 12.2083 14.5601 12.4393C15.1466 13.0257 15.1466 13.9752 14.5601 14.5601C13.9737 15.1466 13.0242 15.1466 12.4393 14.5601C12.2083 14.3307 7.5 9.62089 7.5 9.62089C7.5 9.62089 2.79174 14.3292 2.56075 14.5601C1.97428 15.1466 1.02482 15.1466 0.439853 14.5601C-0.146618 13.9737 -0.146618 13.0242 0.439853 12.4393C0.669342 12.2083 5.37911 7.5 5.37911 7.5C5.37911 7.5 0.670841 2.79174 0.439853 2.56075C-0.146618 1.97428 -0.146618 1.02482 0.439853 0.439853C1.02632 -0.146618 1.97578 -0.146618 2.56075 0.439853C2.79174 0.669342 7.5 5.37911 7.5 5.37911C7.5 5.37911 12.2083 0.670841 12.4393 0.439853C13.0257 -0.146618 13.9752 -0.146618 14.5601 0.439853C15.1466 1.02632 15.1466 1.97578 14.5601 2.56075C14.3307 2.79174 9.62089 7.5 9.62089 7.5Z"
          />
        </svg>
      </div>
    );
  }

  switch (state) {
    case "confirm":
      return (
        <div className={`card ${styles.container}`}>
          <X />
          <p>/{location}</p>
          <p>
            {profile.first_name} {profile.last_name}
          </p>
          <p>{DateTime.fromISO(date).toFormat("cccc, LL/dd/yy h:mm a")}</p>

          <button
            className={styles.button}
            onClick={async () => {
              try {
                setState("loading");
                await postCreateAppointment({
                  location: location,
                  time: date,
                  autoCheckIn: canAutoCheckin(date),
                  ...(profile?.isDependent && { dependent: profile?.id }),
                });
                setState("success");
              } catch (error) {
                setError(
                  error?.data?.payload?.message ??
                  error.message ??
                  JSON.stringify(error)
                );
                setState("error");
              }
            }}
          >
            CONFIRM
          </button>
        </div>
      );
    case "loading":
      return (
        <div className={`card ${styles.container}`}>
          <X />
          <div className={"loading-container-full"}>
            <Spinner />
          </div>
        </div>
      );
    case "error":
      if (timer == null) {
        startTimer();
      }
      return (
        <div className={`card ${styles.container}`}>
          <X />
          <div className={styles["image-container"]}>
            <img src={Caution} alt="caution" />
          </div>
          <p className={styles["error-text"]}>{error}</p>
          <p className={styles["info-text"]}>
            this will close in {seconds} second{seconds === 1 ? "" : "s"}
          </p>
        </div>
      );
    case "success":
      if (timer == null) {
        startTimer();
      }
      return (
        <div className={`card ${styles.container}`}>
          <X />
          <div className={styles["image-container"]}>
            <img src={Cheers} alt="cheers" />
          </div>
          <p className={styles["info-text"]}>Appointment Booked!</p>
          {!canAutoCheckin(date) ? (
            <p className={styles["info-text"]}>
              <b>You are too early to check in for your <br /> {DateTime.fromISO(date).toFormat("cccc, LL/dd/yy h:mm a")} appointment.</b><br /><br />
              <i>Come back to check in between {DateTime.fromISO(date).minus({ minutes: 20 }).toFormat("h:mm a")} and {DateTime.fromISO(date).plus({ minutes: 10 }).toFormat("h:mm a")}</i>
            </p>
          ) : (
            <p className={styles["info-text"]}>
              You were automatically checked in for your appointment.<br />
              Help yourself to a complimentary drink, hangout & we will be with you shortly.
            </p>
          )}
          <p className={styles["info-text"]}>
            this will close in {seconds} second{seconds === 1 ? "" : "s"}
          </p>
          <button className={styles.button} onClick={success}>
            DONE
          </button>
        </div>
      );
    case "schedule":
    default:
      return (
        <div className={`card ${styles.container}`}>
          <X />
          <p>/{location}</p>
          <p>Please select a day and time slot that works for the client.</p>
          <TimeSelector time={date} setTime={setDate} location={location} />
          <button
            className={styles.button}
            onClick={async () => {
              setState("confirm");
            }}
          >
            SELECT
          </button>
        </div>
      );
  }
}
