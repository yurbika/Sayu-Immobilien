//bibliotheken imports
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import { filterData } from "../../immo-data/immo-data.utils";

//Component imports
import Input from "../../components/input/input.component";
import {
  checkInputValue,
  checkSearchInput,
  numberWithDots
} from "../../components/input/input.utils";

import Button from "../../components/button/button.component";

import PreisDropdown from "../../components/dropdowns/preis-dropdown.component";
import AuswahlDropdown from "../dropdowns/auswahl-dropdown.component";
import Results from "../dropdowns/results-dropdown.component";

//redux
import {
  selectBezugsart,
  selectHaustyp,
  selectSearchInput,
  selectZimmerAnzahl,
  selectPreis,
  selectFläche,
  selectMaxInput,
  selectMinInput
} from "../../redux/filter/filter.selectors";
import {
  setPreis,
  resetInputMax,
  resetInputMin,
  setSearchInput
} from "../../redux/filter/filter.action";

import FilterActionTypes from "../../redux/filter/filter.types";

import {
  selectPreisDropdown,
  selectBezugsartDropdown,
  selectImmobilientypDropdown,
  selectZimmerDropdown,
  selectFlächeDropdown,
  selectResultsDropdown
} from "../../redux/dropdown/dropdown.selectors";
import toggleDropdown from "../../redux/dropdown/dropdown.action";
import DropdownActionTypes from "../../redux/dropdown/dropdown.types";

import { selectSuchtreffer } from "../../redux/results-dropdown/results.selectors";
import {
  setBundesländer,
  setStraßenPlzOrte,
  setStädteOrte,
  setSuchtreffer
} from "../../redux/results-dropdown/results.action";

//styles
import {
  SuchleisteContainer,
  Bild,
  BildContainer,
  ContentContainer,
  InputContainer,
  InputContainerZeile
} from "./suchleiste2.styles";

/*Button id = filter-button ist hier notwendig damit die richtigen aktionen gefeuert 
werden damit ist es möglich die dropdowns von überall zu schließen*/

class Suchleiste2 extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      maxInput,
      minInput,
      setPreis,
      bezugsart,
      haustyp,
      resetInputMax,
      resetInputMin,
      input,
      setBundesländer,
      setStraßenPlzOrte,
      setStädteOrte,
      setSuchtreffer,
      zimmerAnzahl,
      fläche
    } = this.props;
    if (
      input !== prevProps.input ||
      maxInput !== prevProps.maxInput ||
      minInput !== prevProps.minInput ||
      bezugsart !== prevProps.bezugsart ||
      haustyp !== prevProps.haustyp ||
      zimmerAnzahl !== prevProps.zimmerAnzahl ||
      fläche !== prevProps.fläche
    ) {
      let filter = {
        haustyp: `${haustyp}`,
        bezugsart: `${bezugsart}`,
        search: `${input}`,
        minInput: `${minInput}`,
        maxInput: `${maxInput}`,
        zimmerAnzahl: `${zimmerAnzahl}`,
        wohnfläche: `${fläche}`
      };
      const {
        bundeslaenderArray,
        staedteOrteArray,
        straßenPlzOrtArray,
        suchtreffer
      } = filterData(filter);
      setSuchtreffer(suchtreffer);
      setBundesländer(bundeslaenderArray);
      setStraßenPlzOrte(straßenPlzOrtArray);
      setStädteOrte(staedteOrteArray);
    }

    if (prevProps.bezugsart !== bezugsart) {
      resetInputMax();
      resetInputMin();
    }

    if (prevProps.minInput !== minInput || prevProps.maxInput !== maxInput)
      setPreis(checkInputValue(minInput, maxInput));
  }
  render() {
    const {
      bezugsart,
      input,
      preis,
      zimmerAnzahl,
      haustyp,
      fläche,
      preisDropdown,
      bezugsartDropdown,
      immobilientypDropdown,
      zimmerDropdown,
      flächeDropdown,
      suchtreffer,
      toggleDropdown,
      setSearchInput,
      resultsDropdown,
      children,
      additionalStyle,
      history
    } = this.props;
    return (
      <SuchleisteContainer additionalStyle={additionalStyle}>
        <BildContainer additionalStyle={additionalStyle}>
          <Bild />
        </BildContainer>
        <ContentContainer>
          {children}
          <InputContainer>
            <InputContainerZeile>
              <Input
                inputStartseite
                id="filter-button"
                inputType="search"
                placeholder="Wo: Ort, Bundesland oder PLZ"
                löschButton
                value={input}
                onChange={e => {
                  setSearchInput(e.target.value);
                  //!!!input sorgt dafür das wenn der input geleert wird das es trotzdem danach ausgelöst wird
                  if (
                    (suchtreffer > 0 || suchtreffer === null || !!!input) &&
                    !resultsDropdown
                  ) {
                    toggleDropdown(DropdownActionTypes.TOGGLE_RESULTS_HIDDEN);
                  }
                }}
                onFocus={() => {
                  //dieser if hier sorgt dafür das beim focus auch wenn der input leer ist alle dropdowns geschloßen werden bis auf result
                  if (
                    (preisDropdown ||
                      bezugsartDropdown ||
                      immobilientypDropdown ||
                      zimmerDropdown ||
                      flächeDropdown) &&
                    !!!input
                  )
                    toggleDropdown(
                      DropdownActionTypes.TOGGLE_ALL_DROPDOWNS_FALSE
                    );
                  if (!!input && suchtreffer > 0 && !resultsDropdown)
                    toggleDropdown(DropdownActionTypes.TOGGLE_RESULTS_HIDDEN);
                }}
                onKeyPress={e => checkSearchInput(e)}
              />
              <Button
                normalerButton
                onClick={() =>
                  toggleDropdown(
                    DropdownActionTypes.TOGGLE_BEZUGSARTDROPDOWN_HIDDEN
                  )
                }
                id="filter-button"
              >
                {bezugsart}
              </Button>
              <Button
                normalerButton
                onClick={() =>
                  toggleDropdown(
                    DropdownActionTypes.TOGGLE_IMMOBILIENTYPDROPDOWN_HIDDEN
                  )
                }
                id="filter-button"
              >
                {haustyp}
              </Button>
              <Button suchButton onClick={() => history.push("/liste")}>
                {suchtreffer > 0 && !!input
                  ? `${numberWithDots(suchtreffer.toString())} Treffer`
                  : "Suchen"}
              </Button>
            </InputContainerZeile>
            {/*damit die dropdowns unter den buttons sind */}
            <InputContainerZeile shadow>
              <Input inputStartseite />
              {resultsDropdown && suchtreffer > 0 && input !== "" ? (
                <Results
                  additionalStyle={
                    "results-dropdown" +
                    (!!additionalStyle ? "-" + additionalStyle : "")
                  }
                />
              ) : null}
              <Button normalerButton dropdown>
                {bezugsartDropdown ? (
                  <AuswahlDropdown
                    additionalStyle={
                      "bezugsart-dropdown" +
                      (!!additionalStyle ? "-" + additionalStyle : "")
                    }
                    children={[bezugsart === "Mieten" ? "Kaufen" : "Mieten"]}
                    type={FilterActionTypes.SET_BEZUGSART}
                  />
                ) : null}
              </Button>
              <Button normalerButton dropdown>
                {immobilientypDropdown ? (
                  <AuswahlDropdown
                    additionalStyle={
                      "haus-dropdown" +
                      (!!additionalStyle ? "-" + additionalStyle : "")
                    }
                    children={[haustyp === "Wohnung" ? "Haus" : "Wohnung"]}
                    type={FilterActionTypes.SET_HAUSTYP}
                  />
                ) : null}
              </Button>
              <Button suchButton></Button>
            </InputContainerZeile>
            {/*zweite Reihe der Suchleiste*/}
            <InputContainerZeile>
              <Button
                sekundärerButton
                preis
                onClick={() =>
                  toggleDropdown(
                    DropdownActionTypes.TOGGLE_PREISDROPDOWN_HIDDEN
                  )
                }
                id="filter-button"
              >
                {preis}
              </Button>
              <Button
                sekundärerButton
                onClick={() =>
                  toggleDropdown(
                    DropdownActionTypes.TOGGLE_ZIMMERDROPDOWN_HIDDEN
                  )
                }
                id="filter-button"
              >
                {zimmerAnzahl}
              </Button>
              <Button
                sekundärerButton
                onClick={() =>
                  toggleDropdown(
                    DropdownActionTypes.TOGGLE_FLÄCHEDROPDOWN_HIDDEN
                  )
                }
                id="filter-button"
              >
                {fläche}
              </Button>
            </InputContainerZeile>
            <InputContainerZeile shadowSekundär>
              <Button sekundärerButton dropdown>
                {preisDropdown ? (
                  <PreisDropdown
                    additionalStyle={
                      "preis-dropdown" +
                      (!!additionalStyle ? "-" + additionalStyle : "")
                    }
                  />
                ) : null}
              </Button>
              <Button sekundärerButton></Button>
              <Button sekundärerButton></Button>
            </InputContainerZeile>
          </InputContainer>
        </ContentContainer>
      </SuchleisteContainer>
    );
  }
}

//Redux

const mapStateToProps = createStructuredSelector({
  //Filter States
  bezugsart: selectBezugsart,
  preis: selectPreis,
  input: selectSearchInput,
  zimmerAnzahl: selectZimmerAnzahl,
  fläche: selectFläche,
  haustyp: selectHaustyp,
  minInput: selectMinInput,
  maxInput: selectMaxInput,
  //Dropdown States
  preisDropdown: selectPreisDropdown,
  bezugsartDropdown: selectBezugsartDropdown,
  immobilientypDropdown: selectImmobilientypDropdown,
  zimmerDropdown: selectZimmerDropdown,
  flächeDropdown: selectFlächeDropdown,
  resultsDropdown: selectResultsDropdown,
  //Results States
  suchtreffer: selectSuchtreffer
});

const mapDispatchToProps = dispatch => ({
  //dropdown action
  toggleDropdown: toggle => dispatch(toggleDropdown(toggle)),
  //filter action
  setPreis: preis => dispatch(setPreis(preis)),
  resetInputMax: () => dispatch(resetInputMax()),
  resetInputMin: () => dispatch(resetInputMin()),
  setSearchInput: value => dispatch(setSearchInput(value)),
  //results action
  setBundesländer: bundesländerArray =>
    dispatch(setBundesländer(bundesländerArray)),
  setStädteOrte: städteOrteArray => dispatch(setStädteOrte(städteOrteArray)),
  setStraßenPlzOrte: straßenPlzOrteArray =>
    dispatch(setStraßenPlzOrte(straßenPlzOrteArray)),
  setSuchtreffer: num => dispatch(setSuchtreffer(num))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Suchleiste2)
);
