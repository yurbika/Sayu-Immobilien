import theme from "../../utils/theme";
import styled, { css } from "styled-components";

const normalButton = css`
  max-width: 13vw;
  &:active {
    background: ${theme.colors.lightPurple};
    span {
      color: ${theme.colors.lightWhite};
    }
  }
`;

const actionButton = css`
  background: ${theme.colors.darkPurple};
  transition: all 0.3s ease;
  border-left: none;
  border-radius: 15px;
  width: 10rem;
  max-width: 12rem;
  span {
    left: 2.5rem;
    color: ${theme.colors.lightWhite};
  }
  &:hover {
    background: ${theme.colors.lightPurple};
    letter-spacing: 2px;
  }
`;

const searchButton = css`
  ${actionButton};
  border-radius: 0 15px 15px 0;
`;

const secondaryButton = css`
  background: none;
  width: 10rem;
  max-width: 18vw;
  border-radius: 25px;
  border-left: none;
  border: 2px solid ${theme.colors.lightWhite};
  span {
    margin-top: 1rem;
    color: ${theme.colors.lightWhite};
  }

  &:active {
    border-color: ${theme.colors.lightPurple};
    span {
      color: ${theme.colors.lightPurple};
    }
  }
`;

const scrollButton = css`
  position: absolute;
  height: 3.5rem;
  bottom: 15px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border: 1px solid ${theme.colors.lightWhite};
  background-color: rgba(0, 0, 0, 0);
  border-radius: 15px;
  &:hover {
    background: ${theme.colors.darkPurple};
    transition: all 0.3s ease-out;
  }
`;

const inputButton = css`
  min-width: 70%;
  border-radius: 15px 0 0 15px;
  display: flex;
  align-items: center;
  overflow: hidden;
  & span {
    position: absolute;
    color: ${theme.colors.transDarkerBlack};
    margin-left: 15px;
    white-space: nowrap;
  }
`;

const responsivButton = css`
  border-radius: 15px;
  border-left: none;
  min-width: calc(50% - 10px);
  max-width: 100%;
`;

const getButtonStyles = (props) => {
  if (props.pageChanger && props.noOpacity)
    return css`
      border: none;
      border-radius: 15px;
      background: rgba(0, 0, 0, 0);
      border: 1px solid ${theme.colors.black};
      width: 10rem;
      opacity: 0;
      cursor: default;
      span {
        color: ${theme.colors.black};
      }
    `;
  if (props.pageChanger && props.secondary && props.right)
    return css`
      display: flex;
      border: none;
      border-radius: 15px;
      background: rgba(0, 0, 0, 0);
      border: 1px solid ${theme.colors.black};
      width: 10rem;
      min-width: 6rem;
      span {
        margin: auto 15px;
      }
      div span {
        margin-right: 0;
        margin-left: 0;
      }
      span {
        color: ${theme.colors.black};
      }
      &:hover {
        background: ${theme.colors.brown};
      }
    `;
  if (props.pageChanger && props.secondary && props.left)
    return css`
      border: none;
      border-radius: 15px;
      background: rgba(0, 0, 0, 0);
      border: 1px solid ${theme.colors.black};
      width: 10rem;
      min-width: 6rem;

      span {
        margin-left: 15px;
      }
      div span {
        margin-left: 0px;
      }
      span {
        color: ${theme.colors.black};
      }
      &:hover {
        background: ${theme.colors.brown};
      }
    `;

  if (props.pageChanger)
    return css`
      border: none;
      border-radius: 15px;
      box-shadow: 5px 5px 5px ${theme.colors.transBlack};
      background: ${theme.colors.black};
      span {
        color: ${theme.colors.lightWhite};
      }
    `;
  if (props.scrollButton && props.sliderArrow)
    return [
      scrollButton,
      css`
        position: relative;
        bottom: 0;
        height: 2rem;
        width: 3rem;
        border: none;
        &:hover {
          background: ${theme.colors.lightPurple};
          transition: all 0.3s ease-out;
        }
      `,
    ];
  if (props.scrollButton) return scrollButton;
  if (props.secondaryButton && props.dropdown)
    return [
      secondaryButton,
      css`
        z-index: -1;
      `,
    ];
  if (props.secondaryButton) return secondaryButton;
  if (props.searchButton && props.responsivButton)
    return [
      searchButton,
      responsivButton,
      css`
        width: 100%;
      `,
    ];
  if (props.searchButton) return searchButton;
  if (props.actionButton) return actionButton;
  if (props.inputButton) return inputButton;
  if (props.responsivButtonPrice)
    return [
      responsivButton,
      css`
        min-width: 100%;
      `,
    ];
  if (props.responsivButton) return responsivButton;
  return normalButton;
};

//general Button-Styles
//pointer-events none of the spans because only the button should toggle the dropdowns

export const CustomButtonContainer = styled.button`
  cursor: pointer;
  position: relative;
  min-width: 4rem;
  width: 8rem;
  max-width: 8vw;
  height: 2.5rem;
  outline: none;
  border: none;
  background: ${theme.colors.lightWhite};
  border-left: 1px solid grey;
  font-size: 1rem;

  span {
    color: rgb(0, 0, 0);
    pointer-events: none;
  }
  ${getButtonStyles}
`;

const getArrowContainerStyles = (props) => {
  if (props.noArrow)
    return css`
      display: none;
    `;
  if (props.pageChanger && props.left)
    return css`
      right: unset;
      left: 15px;
      bottom: 22.5px;
      transform: rotate(135deg);
    `;
  if (props.pageChanger && props.right)
    return css`
      right: 15px;
      bottom: 14.5px;
      transform: rotate(-45deg);
    `;
  if (props.pageChanger && props.scrollButton)
    return css`
      right: 15px;
      bottom: 22.5px;
      transform: rotate(45deg);
    `;
  if (props.scrollButton && props.sliderArrow)
    return css`
      min-width: 4rem;
      width: 3rem;
      max-width: 8vw;
      height: 2rem;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      left: 0;
      pointer-events: none;
    `;
  if (props.scrollButton)
    return css`
      min-width: 4rem;
      width: 8rem;
      max-width: 8vw;
      height: 3.5rem;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      left: 0;
    `;
};

const getArrowStyles = (props) => {
  if (props.pageChanger && props.secondary)
    return css`
      right: 25px;
      bottom: 22.5px;
      transform: rotate(45deg);

      &:before,
      &:after {
        background-color: ${theme.colors.black};
      }
    `;
  if (props.pageChanger && props.scrollButton) return css``;
  if (props.scrollButton && props.sliderArrow)
    return css`
      margin: -1px 0 0 -32px;
      &:before,
      &:after {
        width: 25px;
        height: 3px;
      }
      &:after {
        top: -11px;
        left: 11px;
      }
    `;
  if (props.scrollButton)
    return css`
      margin: -5px 0 0 -45px;
      &:before,
      &:after {
        width: 35px;
        height: 3px;
      }
      &:after {
        top: -16px;
        left: 16px;
      }
    `;
};

//general Dropdown-Arrow-Styles

export const ArrowContainer = styled.div`
  position: absolute;
  right: 18px;
  bottom: -1px;
  ${getArrowContainerStyles}
`;

export const Arrow = styled.span`
  width: 13px;
  height: 13px;
  bottom: 0;
  margin-top: 2px;
  text-align: left;
  transform: rotate(45deg);

  &:before,
  &:after {
    position: absolute;
    content: "";
    display: inline-block;
    width: 8px;
    height: 2px;
    background-color: ${theme.colors.lightWhite};
  }
  &:after {
    position: absolute;
    transform: rotate(90deg);
    top: -3px;
    left: 3px;
  }
  ${getArrowStyles}
`;
