import { useEffect, useState, useCallback } from "react";
import {
  getMe,
  postCheckPhoneNumber,
  postCreateDependent,
  unsafeLogin,
} from "../api/auth";
import Spinner from "./Spinner";
import styles from "./InfoCheck.module.css";
import { isEmpty } from "lodash";
import { getProfile } from "../utils/user";
import Input from "./Input";
import NewUserPopup from "./NewUserPopup";

export default function InfoCheck({
  setUser,
  user,
  setToken,
  token,
  children,
  setDependent,
  dependent,
}) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [step, setStep] = useState(
    !isEmpty(user)
      ? dependent != null
        ? "continue"
        : "requestCurrentDependent"
      : "requestPhone"
  );

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const { user } = await getMe();
    if (user) {
      setUser(user);
      setLoading(false);
      return setStep("requestCurrentDependent");
    }
    setLoading(false);
  }, [setUser]);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (token != null && token != "" && isEmpty(user)) {
      fetchUser();
    }
  }, [fetchUser, token, user]);

  async function handleRequestPhoneNextStep() {
    setLoading(true);
    try {
      const userExists = await postCheckPhoneNumber({ phoneNumber: phone });
      if (!userExists) {
        setNewUser(true);
      }
      const { token } = await unsafeLogin(phone);
      setLoading(false);
      setToken(token);
    } catch (error) {
      setLoading(false);
    }
  }

  async function handleAddDependentNextStep(firstName, lastName) {
    setLoading(true);
    await postCreateDependent(firstName, lastName);
    await fetchUser();
    setStep("requestCurrentDependent");
    setLoading(false);
  }

  const STEPS = {
    continue: children,
    requestPhone: (
      <SetPhone
        phone={phone}
        setPhone={setPhone}
        newUser={newUser}
        newUserNextStep={async (phoneNumber) => {
          setNewUser(false);
        }}
        nextStep={handleRequestPhoneNextStep}
      />
    ),
    requestCurrentDependent: (
      <SetCurrentDependent
        dependents={[getProfile(user, "user"), ...(user.dependents ?? [])]}
        setDependent={setDependent}
        nextStep={() => setStep("continue")}
        altStep={() => setStep("addDependent")}
      />
    ),
    addDependent: <AddDependent nextStep={handleAddDependentNextStep} />,
  };

  return loading ? (
    <div className={"loading-container-full"}>
      <Spinner />
    </div>
  ) : (
    <>{STEPS[step]}</>
  );
}

function SetCurrentDependent({ dependents, setDependent, nextStep, altStep }) {
  const [timer, setTimer] = useState(null);
  const [seconds, setSeconds] = useState(15);

  function startTimer() {
    setTimer(
      setInterval(() => {
        setSeconds((n) => n - 1);
      }, 1000)
    );
  }

  useEffect(() => {
    startTimer();
  }, []);

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

  return (
    <div className={styles.container}>
      <svg onClick={finish} width="12" height="17">
        <path d="M10.8158 0.889582C11.1481 1.33071 11.0598 1.9577 10.6187 2.29L2.63108 8.3071L10.6414 14.7102C11.0728 15.055 11.143 15.6843 10.7981 16.1157C10.4533 16.5471 9.82405 16.6172 9.39265 16.2724L0.375802 9.06478C0.134464 8.87187 -0.00414848 8.57823 0.000289917 8.2693C0.00472927 7.96036 0.151721 7.67083 0.398501 7.48493L9.41535 0.692535C9.85647 0.360233 10.4835 0.448454 10.8158 0.889582Z" />
      </svg>
      <p className={styles.heading}>
        Please select the correct profile to log in with.
      </p>
      <div className={styles["dependent-container"]}>
        {dependents.map((dep) => (
          <div
            key={dep.id}
            className={styles["dependent-selector"]}
            onClick={() => {
              setDependent(dep.id);
              nextStep();
            }}
          >
            <span>{dep.first_name}</span> <span>{dep.last_name}</span>
          </div>
        ))}
      </div>
      <div className={styles["add-dependent"]} onClick={altStep}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 21 22"
          fill="none"
        >
          <circle cx="10.5" cy="11" r="10" fill="white" stroke="#0084CA" />
          <path
            d="M5.61111 11H15.3889"
            stroke="#0084CA"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <path
            d="M10.5 6V16"
            stroke="#0084CA"
            strokeWidth="2"
            strokeLinecap="square"
          />
        </svg>
        <span>Add A Dependent</span>
      </div>
      <p className={styles.timer}>
        this will close in {seconds} second{seconds === 1 ? "" : "s"}
      </p>
    </div>
  );
}

function SetPhone({ newUser, newUserNextStep, nextStep, phone, setPhone }) {
  return (
    <>
      {newUser && <NewUserPopup phone={phone} nextStep={newUserNextStep} />}
      <div className={styles.container}>
        <p className={styles.heading}>Please enter your phone number.</p>
        <p className={styles["phone-input"]}>{phone}​</p>
        <div className={styles["button-grid"]}>
          {Array.from(new Array(9), (x, i) => i + 1).map((v) => (
            <button
              key={v}
              disabled={phone.length >= 10}
              className={styles["grid-button"]}
              onClick={() => {
                setPhone((s) => s + v);
              }}
            >
              {v}
            </button>
          ))}
          <button
            disabled={phone.length === 0}
            className={styles["grid-button"]}
            onClick={() => {
              setPhone((s) => s.slice(0, -1));
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="21"
              viewBox="0 0 29 21"
              fill="none"
            >
              <path
                opacity="0.5"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.7306 1.68979e-05C10.7326 1.68979e-05 9.53499 0.499344 8.82966 1.20691L0.504315 9.5587C-0.0143928 10.0791 -0.0143929 10.921 0.504314 11.4413L8.82966 19.7931C9.53053 20.4962 10.7372 21 11.7306 21H25.3427C27.3622 21 28.9999 19.3531 28.9999 17.3249V3.67513C28.9999 1.6421 27.3649 1.68979e-05 25.3427 1.68979e-05H11.7306ZM9.26672 18.2482L0.999874 10L9.26672 1.75187C9.6829 1.33663 10.4921 1.00002 11.0824 1.00002H24.8837C26.0524 1.00002 26.9999 1.94243 26.9999 3.11778V16.8823C26.9999 18.0519 26.0506 19 24.8837 19H11.0824C10.4958 19 9.67769 18.6582 9.26672 18.2482ZM13.3547 6.8681C13.0451 6.55847 13.0451 6.05645 13.3547 5.74682C13.6644 5.43718 14.1664 5.43718 14.476 5.74682L17.8363 9.10709L21.1966 5.74682C21.5062 5.43718 22.0082 5.43719 22.3179 5.74682C22.6275 6.05645 22.6275 6.55847 22.3179 6.86811L18.9576 10.2284L22.3179 13.5887C22.6275 13.8983 22.6275 14.4003 22.3179 14.7099C22.0082 15.0196 21.5062 15.0196 21.1966 14.7099L17.8363 11.3497L14.476 14.7099C14.1664 15.0196 13.6644 15.0196 13.3547 14.7099C13.0451 14.4003 13.0451 13.8983 13.3547 13.5887L16.715 10.2284L13.3547 6.8681Z"
                fill="black"
              />
            </svg>
          </button>
          <button
            disabled={phone.length >= 10}
            className={styles["grid-button"]}
            onClick={() => {
              setPhone((s) => s + "0");
            }}
          >
            0
          </button>
          <button
            disabled={phone.length !== 10}
            className={`${styles["grid-button"]} ${styles.submit}`}
            onClick={() => nextStep()}
            type="submit"
            value="Submit"
          >
            enter
          </button>
        </div>
      </div>
    </>
  );
}

function AddDependent({ nextStep }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

  return (
    <div className={styles["new-dependent-container"]}>
      <h1 className={styles["small-heading"]}>
        Whats your <b>dependent's</b> name?
      </h1>
      <div className={styles["input-container"]}>
        <Input
          style={{ width: "50%" }}
          value={firstName}
          onChange={setFirstName}
          placeholder="First Name"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.5 10.1429C6.80656 10.1429 4.625 8.09714 4.625 5.57143C4.625 3.04571 6.80656 1 9.5 1C12.1934 1 14.375 3.04571 14.375 5.57143C14.375 8.09714 12.1934 10.1429 9.5 10.1429ZM3 17C3 13.6337 5.91015 10.9048 9.5 10.9048C13.0899 10.9048 16 13.6337 16 17H14.375C14.375 14.4753 12.1924 12.4286 9.5 12.4286C6.80761 12.4286 4.625 14.4753 4.625 17H3ZM12.75 5.57143C12.75 7.25524 11.2956 8.61905 9.5 8.61905C7.70438 8.61905 6.25 7.25524 6.25 5.57143C6.25 3.88762 7.70438 2.52381 9.5 2.52381C11.2956 2.52381 12.75 3.88762 12.75 5.57143Z"
                fill="black"
              />
            </svg>
          }
        />
        <Input
          style={{ width: "50%" }}
          value={lastName}
          onChange={setlastName}
          placeholder="Last Name"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.5 10.1429C6.80656 10.1429 4.625 8.09714 4.625 5.57143C4.625 3.04571 6.80656 1 9.5 1C12.1934 1 14.375 3.04571 14.375 5.57143C14.375 8.09714 12.1934 10.1429 9.5 10.1429ZM3 17C3 13.6337 5.91015 10.9048 9.5 10.9048C13.0899 10.9048 16 13.6337 16 17H14.375C14.375 14.4753 12.1924 12.4286 9.5 12.4286C6.80761 12.4286 4.625 14.4753 4.625 17H3ZM12.75 5.57143C12.75 7.25524 11.2956 8.61905 9.5 8.61905C7.70438 8.61905 6.25 7.25524 6.25 5.57143C6.25 3.88762 7.70438 2.52381 9.5 2.52381C11.2956 2.52381 12.75 3.88762 12.75 5.57143Z"
                fill="black"
              />
            </svg>
          }
        />
      </div>
      <div className={styles.seperator} />
      <button
        disabled={firstName === "" || lastName === ""}
        className={styles.button}
        onClick={() => nextStep(firstName, lastName)}
      >
        CONTINUE
      </button>
    </div>
  );
}
