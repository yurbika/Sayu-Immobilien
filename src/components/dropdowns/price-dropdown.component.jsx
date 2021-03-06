import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

//utils
import {
  createLiRentMin,
  createLiRentMax,
  createLiBuyMin,
  createLiBuyMax
} from "./dropdown.component.utils";

//component imports
import Input from "../input/input.component";
import {
  thousandSeperatorDots,
  onlyNumberkey,
  testNum
} from "../input/input.utils";

//redux imports
import { dropdownRef } from "../../utils/utils";
import toggleDropdown from "../../redux/dropdown/dropdown.action";

import {
  setInputMax,
  setInputMin,
  resetInputMax,
  resetInputMin
} from "../../redux/filter/filter.action";

import {
  selectMaxInput,
  selectMinInput,
  selectObtainingType
} from "../../redux/filter/filter.selectors";

//styles
import {
  DropdownContainer,
  InputListContainer,
  DashSymbole
} from "./dropdown.styles";

const PriceDropdown = ({
  maxInput,
  minInput,
  setInputMax,
  setInputMin,
  obtainingType,
  toggleDropdown,
  resetInputMin,
  resetInputMax,
  additionalStyle
}) => {
  return (
    <DropdownContainer additionalStyle={additionalStyle} ref={dropdownRef}>
      <InputListContainer>
        <Input
          placeholder="Min"
          //this attribute is for the input styling
          dropdownInput
          autoFocus
          onFocus={() => {
            document.getElementById("price-min").style.display = "inline-block";
            document.getElementById("price-max").style.display = "none";
          }}
          value={testNum(minInput) ? minInput : resetInputMin()}
          onChange={e => setInputMin(thousandSeperatorDots(e.target.value))}
          onKeyPress={e => onlyNumberkey(e)}
        />
        <ul id="price-min">
          {obtainingType === "Rent"
            ? createLiRentMin(10, maxInput, "max-input", setInputMin)
            : createLiBuyMin(10, maxInput, "max-input", setInputMin)}
        </ul>
      </InputListContainer>
      <DashSymbole>
        <span></span>
      </DashSymbole>
      <InputListContainer>
        <Input
          //this attribute is nessecary for the createLi function, to set focus
          id="max-input"
          placeholder="Max"
          //this attribute is for the input styling
          dropdownInput
          onFocus={() => {
            document.getElementById("price-min").style.display = "none";
            document.getElementById("price-max").style.display = "inline-block";
          }}
          value={testNum(maxInput) ? maxInput : resetInputMax()}
          onChange={e => setInputMax(thousandSeperatorDots(e.target.value))}
          onKeyPress={e => onlyNumberkey(e)}
        />
        <ul id="price-max">
          {obtainingType === "Rent"
            ? createLiRentMax(10, minInput, setInputMax, toggleDropdown)
            : createLiBuyMax(10, minInput, setInputMax, toggleDropdown)}
        </ul>
      </InputListContainer>
    </DropdownContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  maxInput: selectMaxInput,
  minInput: selectMinInput,
  obtainingType: selectObtainingType
});

const mapDispatchToProps = dispatch => ({
  setInputMax: price => dispatch(setInputMax(price)),
  setInputMin: price => dispatch(setInputMin(price)),
  toggleDropdown: type => dispatch(toggleDropdown(type)),
  resetInputMax: () => dispatch(resetInputMax()),
  resetInputMin: () => dispatch(resetInputMin())
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceDropdown);
