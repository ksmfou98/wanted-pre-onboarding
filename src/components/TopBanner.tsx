import React, { ReactElement } from "react";
import styled from "styled-components";
import BannerImageList from "./BannerImageList";

function TopBanner(): ReactElement {
  return (
    <TopBannerBlock>
      <BannerImageList />
    </TopBannerBlock>
  );
}

const TopBannerBlock = styled.div`
  padding-top: 25px;
  width: 1084px;
  margin: 0 auto;
  position: relative;
`;

export default TopBanner;
