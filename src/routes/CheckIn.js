import styles from "./CheckIn.module.css";
import { useState, useEffect } from "react";
import { getAppointments } from "../api/appointments";
import Spinner from "../components/Spinner";
import { DateTime } from "luxon";
import Cheers from "../assets/cheers.png";
import AlarmClock from "../assets/alarm-clock.png";
import SchedulePopup from "../components/SchedulePopup";

export default function CheckIn({ profile, location }) {
  // const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(null);
  const [openScheduler, setOpenScheduler] = useState(false);
  const [seconds, setSeconds] = useState(15);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { future } = await getAppointments();
      // setAppointments([
      //   {
      //     id: "31886888-54c1-4291-bc2d-c4bcd7bc2d0c",
      //     location: "Danckuts / Irvine 01",
      //     date: "2022-03-12T22:00:00.000Z",
      //     type: "hairKut",
      //     checkedIn: true,
      //   },
      // ]);
      setAppointments(future);
      setLoading(false);
      startTimer();
    }
    fetchData();
  }, []);

  function startTimer() {
    setTimer(
      setInterval(() => {
        setSeconds((n) => n - 1);
      }, 1000)
    );
  }

  if (seconds === 0) {
    finish();
  }

  function finish() {
    clearInterval(timer);
    //* disable this to prevent logout
    sessionStorage.clear("token");
    // eslint-disable-next-line no-restricted-globals
    window.location.reload();
  }

  return loading ? (
    <div className={"loading-container-full"}>
      <Spinner />
    </div>
  ) : (
    <>
      {openScheduler && (
        <SchedulePopup
          success={finish}
          close={() => {
            setOpenScheduler(false);
            startTimer();
          }}
          location={location}
        />
      )}
      <div>
        {appointments.length === 0 ? (
          <div>
            <p className={styles.name}>Hey {profile.first_name}!</p>
            <p className={styles.message}>
              You don't have an appointment scheduled for today. Would you like
              to view a list of available appointments?
            </p>
            <div className={styles["button-container"]}>
              <div
                className={`${styles.ghost} ${styles.button}`}
                onClick={finish}
              >
                NO
              </div>
              <div
                className={styles.button}
                onClick={() => {
                  clearInterval(timer);
                  setOpenScheduler(true);
                }}
              >
                YES
              </div>
            </div>
          </div>
        ) : appointments[0].checkedIn ? (
          <div>
            <div className={styles["image-container"]}>
              <img className={styles.image} src={Cheers} alt="cheers" />
            </div>
            <p className={styles.name}>Hey {profile.first_name},</p>
            <p className={styles.message}>
              You are already checked in. Have a drink and hang out, a
              technician will be with you shortly!
            </p>
            <div className={styles["button-container"]}>
              <div className={styles.button} onClick={finish}>
                DONE
              </div>
            </div>
          </div>
        ) : DateTime.now() >
          DateTime.fromISO(appointments[0].date).minus({ minutes: 20 }) ? (
          <div>
            <div className={styles["image-container"]}>
              <img className={styles.image} src={Cheers} alt="cheers" />
            </div>
            <p className={styles.name}>Hey {profile.first_name},</p>
            <p className={styles.message}>
              Welcome to your{" "}
              {DateTime.fromISO(appointments[0].date).toFormat("h:mm a")}{" "}
              appointment! Help yourself to a complimentary drink, hangout & we
              will be with you shortly.
            </p>
            <div className={styles["button-container"]}>
              <div
                className={styles.button}
                onClick={() => {
                  //TODO call check-in endpoint
                  finish();
                }}
              >
                CHECK-IN
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles["image-container"]}>
              <img
                className={styles.image}
                src={AlarmClock}
                alt="alarm-clock"
              />
            </div>
            <p className={styles.name}>Hey {profile.first_name},</p>
            <p className={styles.message}>
              You are too early to check in for your{" "}
              {DateTime.fromISO(appointments[0].date).toFormat("h:mm a")}{" "}
              appointment. You cannot check in sooner than{" "}
              {DateTime.fromISO(appointments[0].date)
                .minus({ minutes: 20 })
                .toFormat("h:mm a")}{" "}
              . Enjoy a drnk, hang out and check back in soon!
            </p>
            <div className={styles["button-container"]}>
              <div className={styles.button} onClick={finish}>
                DONE
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.seperator} />
      <p className={styles.timer}>
        this will close in {seconds} second{seconds === 1 ? "" : "s"}
      </p>
    </>
  );
}
