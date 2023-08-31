import React from "react";

import "./InfoTooltip.css";

const InfoTooltip = ({ isOpen, onClose, message }) => {
  function closePopupByOverlayClick(e) {
    if (e.target === e.currentTarget) onClose(e);
  }

  return (
    <div className="popup__box">
      <div
        className={`popup ${isOpen ? "popup_opened" : ""}`}
        onClick={closePopupByOverlayClick}
      >
        <div className="popup__container">
          <button
            type="button"
            className="popup__close"
            aria-label="Закрыть окно"
            onClick={onClose}
          />
          <span className="popup__massage">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
