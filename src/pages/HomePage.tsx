import React, { ReactElement } from "react";
import Header from "components/Header";
import TopBanner from "components/TopBanner";

function HomePage(): ReactElement {
  return (
    <>
      <Header />
      <TopBanner />
    </>
  );
}

export default HomePage;
