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
    <div className="popup ">
      <div className="popup-inner bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mt-2">
        <h2 className="text-sm text-gray-500 px-4 pb-4">{title}</h2>
        <input
          type="text"
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={inputPlaceholder}
        />
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            onClick={handleSendClick}
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Send
          </button>
          <button
            onClick={handleCancelClick}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
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
