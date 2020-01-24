import React from "react";

//musst importiert werden damit handleClickOutside funktoniert
//d.h. es muss ein ref={dropdownRef} gesetzt werden wo es gebraucht wird

export const dropdownRef = React.createRef();

export const handleClickOutside = event => {
  if (
    dropdownRef.current &&
    !dropdownRef.current.contains(event.target) &&
    event.target.id !== "filter-button"
  ) {
    return true;
  } else return false;
};
