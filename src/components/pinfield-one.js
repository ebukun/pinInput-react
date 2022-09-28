import React from "react";
import "../styles.css";

export default function PinFieldOne() {
  const fields = React.useRef();

  const [state, setState] = React.useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: ""
  });

  const updateOTPField = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleInputFocus = (e) => {
    const value = e.key;
    let nextInputIdx = e.target.tabIndex;

    if (value === "Backspace" || value === "Delete") {
      nextInputIdx = nextInputIdx - 2;
      if (nextInputIdx > -1) {
        const nextInput = fields.current[nextInputIdx];
        nextInput.focus();
      }
    } else {
      if (nextInputIdx < 4) {
        const nextInput = fields.current[nextInputIdx];
        nextInput.focus();
      }
    }
  };

  const checkButttonDisability = () => {
    const values = Object.values(state);

    if (values.filter(Boolean).length !== 4) {
      return true;
    }

    return false;
  };

  const submitCode = (e) => {
    e.preventDefault();
    const code = state.otp1 + state.otp2 + state.otp3 + state.otp4;
    console.log(code);
  };

  React.useEffect(() => {
    fields.current = Array.from(document.querySelectorAll(".pin-code"));
  }, []);

  const isBtnDisable = checkButttonDisability();

  return (
    <div className="wrapper">
      <div className="wrapper--container">
        <h4>Using TabIndex</h4>
        <form className="container" onSubmit={submitCode}>
          <input
            name="otp1"
            type="password"
            className={`pin-code ${state.otp1 && `active`}`}
            maxLength={1}
            inputMode="numeric"
            autoFocus={true}
            onKeyUp={handleInputFocus}
            onChange={updateOTPField}
            value={state.otp1}
            autoComplete="off"
            tabIndex="1"
          />
          <input
            name="otp2"
            type="password"
            className={`pin-code ${state.otp2 && `active`}`}
            maxLength={1}
            inputMode="numeric"
            onKeyUp={handleInputFocus}
            onChange={updateOTPField}
            autoComplete="off"
            tabIndex="2"
            value={state.otp2}
          />
          <input
            name="otp3"
            type="password"
            className={`pin-code ${state.otp3 && `active`}`}
            maxLength={1}
            inputMode="numeric"
            onKeyUp={handleInputFocus}
            onChange={updateOTPField}
            autoComplete="off"
            tabIndex="3"
            value={state.otp3}
          />
          <input
            name="otp4"
            type="password"
            className={`pin-code ${state.otp4 && `active`}`}
            maxLength={1}
            inputMode="numeric"
            onKeyUp={handleInputFocus}
            onChange={updateOTPField}
            autoComplete="off"
            tabIndex="4"
            value={state.otp4}
          />
          <button type="submit" disabled={isBtnDisable}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
