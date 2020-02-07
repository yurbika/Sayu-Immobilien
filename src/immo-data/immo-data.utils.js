const createRegex = splitedStr => {
  let str = "(";
  for (let i = 0; i < splitedStr.length; i++) {
    str += splitedStr[i];
    if (i < splitedStr.length - 1) str += "|";
  }
  str += ")";
  let regex = new RegExp(`${str}`, "gi");
  return regex;
};

export const filterDatas = (data, haustyp, search) => {
  let bundeslaender = [];
  let staedteOrte = [];
  let straßenPlzOrt = [];
  let suchTreffer = 0;
  let totalArrayLength = 0;
  let splitedStr = search.split(/[ ,]+/);
  //entfernt alles leere
  splitedStr = splitedStr.filter(i => i);
  let regex = createRegex(splitedStr);
  for (let i in data) {
    if (!!!data[i][haustyp]) continue;
    if (
      !bundeslaender.includes(data[i][haustyp]["adresse"]["bundesland"]) &&
      !!data[i][haustyp]["adresse"]["bundesland"].match(regex) &&
      data[i][haustyp]["adresse"]["bundesland"].match(regex).length >=
        splitedStr.length &&
      bundeslaender.length < 4 &&
      search !== ""
    ) {
      bundeslaender.push(data[i][haustyp]["adresse"]["bundesland"]);
      suchTreffer++;
    }
    if (
      !staedteOrte.includes(
        data[i][haustyp]["adresse"]["stadt"] +
          " - " +
          data[i][haustyp]["adresse"]["bundesland"]
      ) &&
      !!data[i][haustyp]["adresse"]["stadt"].match(regex) &&
      data[i][haustyp]["adresse"]["stadt"].match(regex).length >=
        splitedStr.length &&
      staedteOrte.length < 4 &&
      search !== ""
    ) {
      staedteOrte.push(
        data[i][haustyp]["adresse"]["stadt"] +
          " - " +
          data[i][haustyp]["adresse"]["bundesland"]
      );
      suchTreffer++;
    }
  }
  totalArrayLength = 12 - (bundeslaender.length + staedteOrte.length);
  //hier wird die straße/plz geprüft
  for (let i in data) {
    if (!!!data[i][haustyp]) continue;
    if (
      !straßenPlzOrt.includes(
        data[i][haustyp]["adresse"]["straße"] +
          ", " +
          data[i][haustyp]["adresse"]["postleitzahl"] +
          " - " +
          data[i][haustyp]["adresse"]["bundesland"]
      ) &&
      !!data[i][haustyp]["adresse"]["straße"].match(regex) &&
      data[i][haustyp]["adresse"]["straße"].match(regex).length >=
        splitedStr.length &&
      search !== ""
    ) {
      if (straßenPlzOrt.length < totalArrayLength) {
        straßenPlzOrt.push(
          data[i][haustyp]["adresse"]["straße"] +
            ", " +
            data[i][haustyp]["adresse"]["postleitzahl"] +
            " - " +
            data[i][haustyp]["adresse"]["bundesland"]
        );
      }
      suchTreffer++;
    }
    //splitedStr.length wird um eins subtrahiert um die resultate zu erhöhen
    if (
      !straßenPlzOrt.includes(
        data[i][haustyp]["adresse"]["straße"] +
          ", " +
          data[i][haustyp]["adresse"]["postleitzahl"] +
          " - " +
          data[i][haustyp]["adresse"]["bundesland"]
      ) &&
      !!data[i][haustyp]["adresse"]["postleitzahl"].match(regex) &&
      data[i][haustyp]["adresse"]["postleitzahl"].match(regex).length >=
        splitedStr.length - 1 &&
      search !== ""
    ) {
      if (straßenPlzOrt.length < totalArrayLength) {
        straßenPlzOrt.push(
          data[i][haustyp]["adresse"]["straße"] +
            ", " +
            data[i][haustyp]["adresse"]["postleitzahl"] +
            " - " +
            data[i][haustyp]["adresse"]["bundesland"]
        );
      }
      suchTreffer++;
    }
  }
  return { bundeslaender, staedteOrte, straßenPlzOrt, suchTreffer };
};