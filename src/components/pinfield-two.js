import React from "react";
import "../styles.css";

export default function PinFieldTwo() {
  const fields = React.useRef();
  const activeField = React.useRef();
  const [state, setState] = React.useState("");

  const handleInputFocus = (e) => {
    const value = e.key;

    if (value !== "Backspace" && value !== "Delete" && !/\d/.test(value)) {
      return;
    }

    if (value === "Backspace" || value === "Delete") {
      if (!activeField.current.value || (state && activeField.current.value)) {
        if (activeField.current && activeField.current === fields.current[0]) {
          return setState("");
        }

        setState(state.substring(0, state.length - 1));
        const count = state.length - 1;
        activeField.current = fields.current[count];
        activeField.current.focus();
      }
    } else {
      setState(`${state}${value}`);
      let count = state.length + 1;
      if (state.length + 1 === 4) {
        count = state.length;
      }
      activeField.current = fields.current[count];
      activeField.current.focus();
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
    console.log(state);
  };

  React.useEffect(() => {
    fields.current = Array.from(document.querySelectorAll(".pin-otp"));
    activeField.current = fields.current[0];
  }, []);

  const isBtnDisable = checkButttonDisability();

  return (
    <div className="wrapper">
      <div className="wrapper--container">
        <h4>Using Ref</h4>
        <form className="container" onSubmit={submitCode}>
          <input
            name="otp1"
            type="password"
            value={state.charAt(0) || ""}
            className={`pin-otp ${state.charAt(0) && `active`}`}
            maxLength={1}
            inputMode="numeric"
            autoFocus={true}
            onKeyDownCapture={handleInputFocus}
            onChange={() => {}}
            autoComplete="off"
          />
          <input
            name="otp2"
            type="password"
            value={state.charAt(1) || ""}
            className={`pin-otp ${state.charAt(1) && `active`}`}
            maxLength={1}
            inputMode="numeric"
            onKeyDownCapture={handleInputFocus}
            onChange={() => {}}
            autoComplete="off"
          />
          <input
            name="otp3"
            type="password"
            value={state.charAt(2) || ""}
            className={`pin-otp ${state.charAt(2) && `active`}`}
            maxLength={1}
            inputMode="numeric"
            onKeyDownCapture={handleInputFocus}
            onChange={() => {}}
            autoComplete="off"
          />
          <input
            name="otp4"
            type="password"
            value={state.charAt(3) || ""}
            className={`pin-otp ${state.charAt(3) && `active`}`}
            maxLength={1}
            inputMode="numeric"
            onKeyDownCapture={handleInputFocus}
            onChange={() => {}}
            autoComplete="off"
          />
          <button type="submit" disabled={isBtnDisable}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
