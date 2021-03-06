import React from "react";

//components
import ImgPreview from "../img-preview/img-preview.component";

//utils
import { ID_GENERATOR } from "../../uniqueKey";

//styles
import ImgsPreviewContainer from "./imgs-container.styles";

const ImgsPreview = ({ realEstateArray, expand }) => (
  <ImgsPreviewContainer expand={expand}>
    {realEstateArray.map((item, index) => (
      <ImgPreview
        key={ID_GENERATOR("imgs-preview-")}
        realEstate={item}
        tabIndex={index > 3 && !expand ? "-1" : "0"}
      />
    ))}
  </ImgsPreviewContainer>
);

export default ImgsPreview;
