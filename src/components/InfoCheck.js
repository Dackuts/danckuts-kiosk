import { useEffect, useState } from "react";
import {
  getMe,
  postCheckPhoneNumber,
  postCheckTextCode,
  postSendTextCode,
} from "../api/auth";
import Spinner from "./Spinner";
import styles from "./InfoCheck.module.css";
import { isEmpty } from "lodash";
import { getProfile } from "../utils/user";

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
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(
    !isEmpty(user)
      ? dependent != null
        ? "continue"
        : "requestCurrentDependent"
      : "requestPhone"
  );

  async function handleRequestPhoneNextStep() {
    setLoading(true);
    try {
      const userExists = await postCheckPhoneNumber({ phoneNumber: phone });
      if (userExists) {
        await postSendTextCode(phone);
        setLoading(false);
        setStep("requestCode");
      } else {
        //TODO handle new users
      }
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      // eslint-disable-next-line eqeqeq
      if (token != "" && isEmpty(user)) {
        const { user } = await getMe();
        setLoading(false);
        if (user) {
          setUser(user);
          if (user.dependents.length === 0) {
            setDependent("user");
            return setStep("continue");
          }
          return setStep("requestCurrentDependent");
        }
      }
    }
    fetchData();
  }, [token, user, setUser, setDependent]);

  async function handleRequestCodeNextStep() {
    const { token } = await postCheckTextCode({ phoneNumber: phone, code });
    setLoading(false);
    setToken(token);
  }

  const STEPS = {
    continue: children,
    requestPhone: (
      <SetPhone
        phone={phone}
        setPhone={setPhone}
        nextStep={handleRequestPhoneNextStep}
      />
    ),
    requestCode: (
      <SetCode
        code={code}
        setCode={setCode}
        nextStep={handleRequestCodeNextStep}
      />
    ),
    requestCurrentDependent: (
      <SetCurrentDependent
        dependents={[getProfile(user, "user"), ...(user.dependents ?? [])]}
        setDependent={setDependent}
        nextStep={() => setStep("continue")}
      />
    ),
  };

  return loading ? (
    <div className={"loading-container-full"}>
      <Spinner />
    </div>
  ) : (
    <>{STEPS[step]}</>
  );
}

function SetCurrentDependent({ dependents, setDependent, nextStep }) {
  return (
    <div className={styles.container}>
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
    </div>
  );
}

function SetPhone({ nextStep, phone, setPhone }) {
  return (
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
              fill-rule="evenodd"
              clip-rule="evenodd"
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
  );
}

function SetCode({ code, setCode, nextStep }) {
  return (
    <div className={styles.container}>
      <p className={styles.heading}>Phone Code</p>
      <p className={styles["center-text"]}>
        A code has been sent to your phone, please enter the code below:
      </p>
      <p className={styles["phone-input"]}>{code}​</p>
      <div className={styles["button-grid"]}>
        {Array.from(new Array(9), (x, i) => i + 1).map((v) => (
          <button
            key={v}
            disabled={code.length >= 6}
            className={styles["grid-button"]}
            onClick={() => {
              setCode((s) => s + v);
            }}
          >
            {v}
          </button>
        ))}
        <button
          disabled={code.length === 0}
          className={styles["grid-button"]}
          onClick={() => {
            setCode((s) => s.slice(0, -1));
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.7306 1.68979e-05C10.7326 1.68979e-05 9.53499 0.499344 8.82966 1.20691L0.504315 9.5587C-0.0143928 10.0791 -0.0143929 10.921 0.504314 11.4413L8.82966 19.7931C9.53053 20.4962 10.7372 21 11.7306 21H25.3427C27.3622 21 28.9999 19.3531 28.9999 17.3249V3.67513C28.9999 1.6421 27.3649 1.68979e-05 25.3427 1.68979e-05H11.7306ZM9.26672 18.2482L0.999874 10L9.26672 1.75187C9.6829 1.33663 10.4921 1.00002 11.0824 1.00002H24.8837C26.0524 1.00002 26.9999 1.94243 26.9999 3.11778V16.8823C26.9999 18.0519 26.0506 19 24.8837 19H11.0824C10.4958 19 9.67769 18.6582 9.26672 18.2482ZM13.3547 6.8681C13.0451 6.55847 13.0451 6.05645 13.3547 5.74682C13.6644 5.43718 14.1664 5.43718 14.476 5.74682L17.8363 9.10709L21.1966 5.74682C21.5062 5.43718 22.0082 5.43719 22.3179 5.74682C22.6275 6.05645 22.6275 6.55847 22.3179 6.86811L18.9576 10.2284L22.3179 13.5887C22.6275 13.8983 22.6275 14.4003 22.3179 14.7099C22.0082 15.0196 21.5062 15.0196 21.1966 14.7099L17.8363 11.3497L14.476 14.7099C14.1664 15.0196 13.6644 15.0196 13.3547 14.7099C13.0451 14.4003 13.0451 13.8983 13.3547 13.5887L16.715 10.2284L13.3547 6.8681Z"
              fill="black"
            />
          </svg>
        </button>
        <button
          disabled={code.length >= 6}
          className={styles["grid-button"]}
          onClick={() => {
            setCode((s) => s + "0");
          }}
        >
          0
        </button>
        <button
          disabled={code.length !== 6}
          className={`${styles["grid-button"]} ${styles.submit}`}
          onClick={() => nextStep()}
          type="submit"
          value="Submit"
        >
          enter
        </button>
      </div>
    </div>
  );
}
