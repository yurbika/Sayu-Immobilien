import React from "react";

import Slider from "../../components/slider/slider.component";

import "./immo-preview.styles.scss";

const ImmoPreview = ({ immo }) => {
  let haustyp = "";
  if (!!immo["haus"]) haustyp = "haus";
  else if (!!immo["wohnung"]) haustyp = "wohnung";
  else return null;
  return (
    <div className="container">
      <div className="bild-preview-container">
        {/*/ <img
        //   src={
        //     immo[haustyp]["bilder"]["titelbild"] +
        //     "&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=360&h=270&fit=crop"
        //   }
        //   alt={haustyp}
        // >*/}
        <Slider
          imgArray={[
            immo[haustyp]["bilder"]["titelbild"] +
              "&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=360&h=270&fit=crop",
            immo[haustyp]["bilder"]["zweites"] +
              "&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=360&h=270&fit=crop",
            immo[haustyp]["bilder"]["drittes"] +
              "&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=360&h=270&fit=crop",
            immo[haustyp]["bilder"]["vier"] +
              "&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=360&h=270&fit=crop",
            immo[haustyp]["bilder"]["fünf"] +
              "&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=360&h=270&fit=crop",
            immo[haustyp]["bilder"]["sechs"] +
              "&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=360&h=270&fit=crop"
          ]}
          alt={haustyp}
        />
      </div>
      <div className="beschreibung">
        <div className="text"></div>
        <span className="titel"></span>
        <span className="untertitel"></span>
        <span className="volle-beschreibung"></span>
      </div>
      <span class="adresse"></span>
      <div className="footer">
        <span className="zimmer"></span>
        <span className="badezimmer"></span>
        <span className="wohnfläche"></span>
        <span className="grundstück"></span>
        <span className="preis"></span>
      </div>
    </div>
  );
};

export default ImmoPreview;
