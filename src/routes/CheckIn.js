import styles from "./CheckIn.module.css";
import { useState, useEffect } from "react";
import { getAppointments, postCheckIn } from "../api/appointments";
import Spinner from "../components/Spinner";
import { DateTime } from "luxon";
import Cheers from "../assets/cheers.png";
import Caution from "../assets/caution.png";
import AlarmClock from "../assets/alarm-clock.png";
import SchedulePopup from "../components/SchedulePopup";

export default function CheckIn({ profile, location }) {
  // const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(null);
  const [openScheduler, setOpenScheduler] = useState(false);
  const [seconds, setSeconds] = useState(8);
  const [appointments, setAppointments] = useState([]);
  const [missedTodaysAppt, setMissedTodaysAppt] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const { future, past } = await getAppointments();
      const pastAppts = past.filter((a) =>
        profile.id === "user" ? a.dependent == null : a.dependent === profile.id
      );

      // Need to find all future appointments and also append past appointments that are within range
      // of lateness error so they can also be included in result.
      const appointments =
        [
          ...future.filter((a) => profile.id === "user" ? a.dependent == null : a.dependent === profile.id),
          ...pastAppts.filter((a) => DateTime.fromISO(a.date).plus({ minutes: 10 }).toMillis() >= DateTime.now().toMillis())
        ].filter((a) => a.location === location);

      const missedTodays = pastAppts.find((a) =>
        DateTime.now().hasSame(DateTime.fromISO(a.date), "day") &&
        DateTime.now().toMillis() > DateTime.fromISO(a.date).plus({ minutes: 10 }).toMillis() &&
        !a?.checkedin
      ) || false

      setAppointments(appointments);
      setMissedTodaysAppt(missedTodays)
      setLoading(false);
      startTimer();
    }
    fetchData();
  }, [location, profile.id]);

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

  useEffect(() => {
    if (appointments[0] != null) {
      if (DateTime.now() > DateTime.fromISO(appointments[0].date).minus({ minutes: 20 })) {
        postCheckIn(appointments[0].id);
      }
    }
  }, [appointments])

  if (!!missedTodaysAppt) {
    return (
      <div>
        <div className={styles["image-container"]}>
          <img className={styles.image} src={Caution} alt="caution" />
        </div>
        <p className={styles.name}>Hey {profile.first_name},</p>
        <p className={styles.message}>
          It's too late to check in to your{" "}
          {DateTime.fromISO(missedTodaysAppt.date).toFormat("h:mm a DD")}{" "}
          appointment. Please speak to the manager for assistance.
        </p>
        <div className={styles["button-container"]}>
          <div
            className={styles.button}
            onClick={finish}
          >
            DONE
          </div>
        </div>
      </div>
    )
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
          profile={profile}
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
        ) : appointments[0].checkedin ? (
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
            <p className={styles.name}>Hey {profile.first_name}, you're checked in!</p>
            <p className={styles.message}>
              Welcome to your{" "}
              {DateTime.fromISO(appointments[0].date).toFormat("h:mm a")}{" "}
              appointment! Grab a free drink, hang out, and we'll be with you shortly.
            </p>
          </div>
        ) : DateTime.now() >
          DateTime.fromISO(appointments[0].date).plus({ minutes: 10 }) &&
          DateTime.now().hasSame(
            DateTime.fromISO(appointments[0].date),
            "day"
          ) ? (
          <div>
            <div className={styles["image-container"]}>
              <img className={styles.image} src={Caution} alt="caution" />
            </div>
            <p className={styles.name}>Hey {profile.first_name},</p>
            <p className={styles.message}>
              It's too late to check in to your{" "}
              {DateTime.fromISO(appointments[0].date).toFormat("h:mm a DD")}{" "}
              appointment. Please speak to the manager for assistance.
            </p>
            <div className={styles["button-container"]}>
              <div
                className={styles.button}
                onClick={finish}
              >
                DONE
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
              {earlyMessage(appointments[0])}
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

function earlyMessage(appointment) {
  if (DateTime.now().hasSame(DateTime.fromISO(appointment.date), "day")) {
    return (
      <>
        You are too early to check in for your{" "}
        {DateTime.fromISO(appointment.date).toFormat("h:mm a DD")}{" "}
        appointment.
        <br />
        <br />
        You cannot check in sooner than{" "}
        {DateTime.fromISO(appointment.date)
          .minus({ minutes: 20 })
          .toFormat("h:mm a")}{" "}
        .
        <br />
        <br />
        Enjoy a drink, hang out and check back in soon!
      </>
    )
  } else {
    return (
      <>
        You dont have an appointment for today that you can check in for.
        Your next appointment is scheduled for <b>{DateTime.fromISO(appointment.date).toFormat("DD @ hh:mm a")}</b>.
        <br /><br />
        Come back then to check in for your kut.
        <br />
        If you think this is an error you should speak to the manager on site.
      </>
    )
  }
}
