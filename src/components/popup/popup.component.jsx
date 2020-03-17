import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

//component imports
import Slider from "../../components/slider/slider.component";
import SliderPreview from "../slider-preview/slider-preview.component";
import PopupMap from "../../components/popup-map/popup-map.component";

//redux imports
import {
  selectPopupRealEstate,
  selectPopupRealEstateID
} from "../../redux/popup/popup.selectors";

import { togglePopup } from "../../redux/popup/popup.action";

//utils
import { popupRef } from "../../utils/utils";
import { thousandSeperatorDots } from "../input/input.utils";
import theme from "../../utils/theme";

//styles
import {
  //generally styles
  PopupContainer,
  PopupContentContainer,
  CloseButtonContainer,
  AllContentContainer,
  RotateContainer,
  Rotate,
  Section,

  //section styles
  Container,
  IconContainer,

  //first section
  SliderInfoContainer,
  SliderContainer,
  InfosContainer,
  InfosContent,
  BoxInfo,
  InfosFooter,
  HeaderSpan,

  //second section
  MainContentContainer,
  MainContent,
  InformationContainer,
  GridContainer,
  GridItem,
  MapContainer
} from "./popup.styles";
import { CloseButton } from "../searchbar/searchbar.styles";

//assets
import moneyIconBrown from "../../assets/money-icon-brown.png";
import gpsIconBrown from "../../assets/gps-icon-brown.png";
import propertyIcon from "../../assets/property-icon.png";
import roomIcon from "../../assets/room-icon.png";
import areaIcon from "../../assets/area-icon.png";
import clockIcon from "../../assets/clock-icon.png";

class Popup extends React.Component {
  render() {
    const { realEstate, realEstateID, togglePopup } = this.props;
    let realEstateType = "";
    if (!!realEstate["house"]) realEstateType = "house";
    else if (!!realEstate["apartment"]) realEstateType = "apartment";
    else return null;

    return (
      <PopupContainer>
        <PopupContentContainer ref={popupRef}>
          <CloseButtonContainer
            className="closebutton-container"
            onClick={() => {
              togglePopup();
              document.body.style.overflowY = "visible";
            }}
          >
            <CloseButton />
          </CloseButtonContainer>
          <AllContentContainer>
            <Section>
              <RotateContainer>
                <Rotate>BRIEF-INFORMATION</Rotate>
              </RotateContainer>
              <Container>
                <SliderInfoContainer>
                  <SliderContainer>
                    <Slider
                      imgArray={[
                        realEstate[realEstateType]["imgs"]["cover"] +
                          theme.unsplash.normalResolution,
                        realEstate[realEstateType]["imgs"]["two"] +
                          theme.unsplash.normalResolution,
                        realEstate[realEstateType]["imgs"]["three"] +
                          theme.unsplash.normalResolution,
                        realEstate[realEstateType]["imgs"]["four"] +
                          theme.unsplash.normalResolution,
                        realEstate[realEstateType]["imgs"]["five"] +
                          theme.unsplash.normalResolution,
                        realEstate[realEstateType]["imgs"]["six"] +
                          theme.unsplash.normalResolution
                      ]}
                      alt={realEstateType}
                      id={realEstateID}
                    />
                  </SliderContainer>
                  <InfosContainer>
                    <InfosContent>
                      <HeaderSpan titleSpan>
                        {realEstate[realEstateType]["title"]}
                      </HeaderSpan>
                      <IconContainer>
                        <img src={gpsIconBrown} alt="Adress:" />
                        <span>
                          {" " +
                            realEstate[realEstateType]["adress"]["street"] +
                            ", " +
                            realEstate[realEstateType]["adress"]["postcode"] +
                            " - " +
                            realEstate[realEstateType]["adress"]["city"] +
                            " - " +
                            realEstate[realEstateType]["adress"][
                              "federalstate"
                            ]}
                        </span>
                      </IconContainer>
                      <IconContainer>
                        <img src={moneyIconBrown} alt="Price:" />
                        <HeaderSpan price>
                          {" " +
                            thousandSeperatorDots(
                              realEstate[realEstateType]["price"].toString()
                            ) +
                            " €"}
                        </HeaderSpan>
                      </IconContainer>
                      <BoxInfo>
                        <IconContainer>
                          <img src={roomIcon} alt="Rooms:" />
                          <span>
                            {" " + realEstate[realEstateType]["rooms"]}
                          </span>
                        </IconContainer>
                        <IconContainer>
                          <img src={propertyIcon} alt="Livingspace:" />
                          <span>
                            {" " + realEstate[realEstateType]["livingspace"]} m²
                          </span>
                        </IconContainer>
                        {!!realEstate[realEstateType]["property"] ? (
                          <IconContainer>
                            <img src={areaIcon} alt="Property:" />
                            <span>
                              {" " + realEstate[realEstateType]["property"]}
                              m²
                            </span>
                          </IconContainer>
                        ) : null}
                      </BoxInfo>
                    </InfosContent>
                    <InfosFooter>
                      <IconContainer>
                        <img src={clockIcon} alt="Publishing:" />
                        <span>
                          {"Published " +
                            realEstate[realEstateType]["publishedDaysAgo"] +
                            " Days ago"}
                        </span>
                      </IconContainer>
                    </InfosFooter>
                  </InfosContainer>
                  <SliderPreview
                    imgArray={[
                      realEstate[realEstateType]["imgs"]["cover"] +
                        theme.unsplash.normalResolution,
                      realEstate[realEstateType]["imgs"]["two"] +
                        theme.unsplash.normalResolution,
                      realEstate[realEstateType]["imgs"]["three"] +
                        theme.unsplash.normalResolution,
                      realEstate[realEstateType]["imgs"]["four"] +
                        theme.unsplash.normalResolution,
                      realEstate[realEstateType]["imgs"]["five"] +
                        theme.unsplash.normalResolution,
                      realEstate[realEstateType]["imgs"]["six"] +
                        theme.unsplash.normalResolution
                    ]}
                    alt={realEstateType}
                    id={realEstateID}
                  />
                </SliderInfoContainer>
              </Container>
            </Section>
            <Section>
              <RotateContainer second>
                <Rotate>PREVIEW</Rotate>
              </RotateContainer>
              <MainContentContainer>
                <MainContent>
                  <InformationContainer>
                    <GridContainer>
                      <GridItem house>
                        <span>Type:</span>
                        <span>
                          {realEstateType.charAt(0).toUpperCase() +
                            realEstateType.slice(1)}
                        </span>
                      </GridItem>
                      <GridItem house>
                        <span>Rooms:</span>
                        <span>{realEstate[realEstateType]["rooms"]}</span>
                      </GridItem>
                      <GridItem house>
                        <span>Livingspace:</span>
                        <span>
                          {realEstate[realEstateType]["livingspace"]} m²
                        </span>
                      </GridItem>
                      <GridItem house>
                        <span>Bathrooms:</span>
                        <span>{realEstate[realEstateType]["bathrooms"]}</span>
                      </GridItem>
                      {realEstateType === "house" ? (
                        <GridItem house>
                          <span>Property</span>
                          <span>
                            {realEstate[realEstateType]["property"]} m²
                          </span>
                        </GridItem>
                      ) : null}
                      <GridItem house>
                        <span>Obtainingtype:</span>
                        <span>
                          {realEstate[realEstateType]["obtainingType"]
                            .charAt(0)
                            .toUpperCase() +
                            realEstate[realEstateType]["obtainingType"].slice(
                              1
                            )}
                        </span>
                      </GridItem>
                    </GridContainer>
                    {realEstate[realEstateType]["obtainingType"] === "buy" ? (
                      <GridContainer price>
                        <GridItem price>
                          <span>Price:</span>
                          <span>
                            {thousandSeperatorDots(
                              realEstate[realEstateType]["price"].toString()
                            ) + " €"}
                          </span>
                        </GridItem>
                        <GridItem price>
                          <span>Broker-Commision:</span>
                          <span>
                            {thousandSeperatorDots(
                              Math.floor(
                                (realEstate[realEstateType]["price"] * 4.76) /
                                  100
                              ).toString()
                            ) + " €"}
                          </span>
                        </GridItem>
                        <GridItem price>
                          <span>Notary-Fee:</span>
                          <span>
                            {thousandSeperatorDots(
                              Math.floor(
                                (realEstate[realEstateType]["price"] / 100) *
                                  1.5
                              ).toString()
                            ) + " €"}
                          </span>
                        </GridItem>
                        <GridItem price>
                          <span>Real-Estate-Transfer-Tax:</span>
                          <span>
                            {thousandSeperatorDots(
                              Math.floor(
                                (realEstate[realEstateType]["price"] / 100) *
                                  3.5
                              ).toString()
                            ) + " €"}
                          </span>
                        </GridItem>
                        <GridItem price>
                          <span>Land-Register-Entry-Fee:</span>
                          <span>
                            {thousandSeperatorDots(
                              Math.floor(
                                (realEstate[realEstateType]["price"] / 100) *
                                  0.5
                              ).toString()
                            ) + " €"}
                          </span>
                        </GridItem>
                      </GridContainer>
                    ) : null}
                  </InformationContainer>
                  <MapContainer>
                    <PopupMap
                      pos={[
                        realEstate[realEstateType]["adress"]["latitude"],
                        realEstate[realEstateType]["adress"]["longitude"]
                      ]}
                    />
                  </MapContainer>
                </MainContent>
              </MainContentContainer>
            </Section>
          </AllContentContainer>
        </PopupContentContainer>
      </PopupContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  realEstate: selectPopupRealEstate,
  realEstateID: selectPopupRealEstateID
});

const mapDispatchToProps = dispatch => ({
  togglePopup: () => dispatch(togglePopup())
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
