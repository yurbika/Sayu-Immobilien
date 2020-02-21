import theme from "../../variablen-styles/theme";
import styled, { css } from "styled-components";

export const AuswahlDropdownContainer = styled.div`
  position: absolute;
`;

export const InputContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
`;

export const BindeStrich = styled.div`
  position: relative;
  width: 10px;
  height: 2.2rem;
  margin-right: 5px;
  margin-left: 5px;
  span {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    margin: 0 auto;
    border-bottom: 2px solid ${theme.colors.brown};
  }
`;

export const ResultsContainer = styled.div`
  position: absolute;
  transform: translate3d(-22rem, 30px, 0px) !important;
  font-size: 0.9rem;
  z-index: 2;
`;

//hier werden die styles für die verschiedenen dropdowns ausgewählt
const AuswahlDropdown = css`
  transform: translate3d(0, 60px, 0px) !important;
  z-index: 1;
  width: 7.93rem;
  height: 2.5rem;
  padding-top: 60px;
  position: relative;
  border-radius: 0 0 15px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    list-style: none;
    position: absolute;
    width: 80%;
    top: 45%;
    text-align: center;
    li {
      cursor: pointer;
      width: 100%;
      color: black;
      padding: 5px;
      &:hover {
        color: ${theme.colors.darkPurple};
        border: 1px solid ${theme.colors.darkPurple};
        border-radius: 25px;
      }
    }
  }
`;
const ResultsDropdown = css`
  &::before,
  &::after {
    display: none;
  }
  border-radius: 0 0 15px 15px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  h4 {
    color: black;
  }
  ul {
    list-style: none;
    min-width: 26rem;
    max-width: 35rem;
    li {
      cursor: pointer;
      width: 100%;
      color: black;
      padding: 5px;
      padding-left: 15px;
      &:hover {
        color: ${theme.colors.darkPurple};
        border: 1px solid ${theme.colors.darkPurple};
        border-radius: 25px;
      }
    }
  }
`;

const PreisDropdown = css`
  //diese zeile lässt den dropdown unter dem button sein

  transform: translate3d(-3rem, 283px, 0px) !important;
  height: 360px;

  input {
    width: 100%;
  }
  ${InputContainer}
  ul {
    list-style: none;
    display: none;
    margin-top: 10px;
    margin-left: 10px;
    li {
      cursor: pointer;
      padding: 5px;
      width: 90%;
      color: black;
      &:hover {
        color: ${theme.colors.darkPurple};
        border: 1px solid ${theme.colors.darkPurple};
        border-radius: 25px;
      }
    }
  }
  #preis-min {
    display: block;
  }
`;

const HausDropdown = css`
  transform: translate3d(8.05rem, 60px, 0px) !important;
`;

const ZimmerDropdown = css`
  transform: translate3d(0, 183px, 0px) !important;
  border-radius: 0 15px 15px 15px;
  width: 8rem;
  height: 10.2rem;
  ul {
    position: absolute;
    top: 5%;
  }
`;

const FlächeDropdown = css`
  transform: translate3d(12rem, 200px, 0px) !important;
  border-radius: 0 15px 15px 15px;
  width: 8rem;
  min-height: 12.2rem;
  ul {
    position: absolute;
    top: 5%;
  }
`;

const getAdditionalStyle = props => {
  if (props.additionalStyle === "bezugsart-dropdown") return AuswahlDropdown;
  if (props.additionalStyle === "haus-dropdown")
    return [AuswahlDropdown, HausDropdown];
  if (props.additionalStyle === "zimmer-dropdown")
    return [AuswahlDropdown, ZimmerDropdown];
  if (props.additionalStyle === "flaeche-dropdown")
    return [AuswahlDropdown, FlächeDropdown];
  if (props.additionalStyle === "results-dropdown") return ResultsDropdown;
  if (props.additionalStyle === "preis-dropdown") return PreisDropdown;
  return "";
};

//--------------------------------------------------------------------//

export const DropdownContainer = styled.div`
  position: absolute;
  display: flex;
  background-color: ${theme.colors.lightWhite};
  border-radius: 0 25px 25px 25px;
  padding: 10px 15px;
  z-index: 3;
  ${getAdditionalStyle}
`;