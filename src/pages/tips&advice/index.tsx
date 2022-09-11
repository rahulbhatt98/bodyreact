import React from "react";
import Accesories from "./accesories";
import Banner from "./banner";
import HelpProtect from "./helpProtect";
import MiniBanner from "./miniBanner";
import MoisturerRight from "./moisturerRight";
import Spf from "./spf";

const Index = () => {
  return (
    <React.Fragment>
      <Banner />
      <MiniBanner />
      <HelpProtect />
      <Spf />
      <MoisturerRight />
      <Accesories />
    </React.Fragment>
  );
};

export default Index;
