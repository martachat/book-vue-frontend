import "./PopUp.css";
import React, { useState } from "react";
import PropTypes from "prop-types";

function PopupDialog({ isOpen, onClose, title, inputPlaceholder, onSend }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    if (onSend) {
      onSend(inputValue);
    }
    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>{title}</h2>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={inputPlaceholder}
        />
        <div className="button-container">
          <button onClick={handleSendClick}>Send</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

PopupDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  onSend: PropTypes.func,
};

export default PopupDialog;
