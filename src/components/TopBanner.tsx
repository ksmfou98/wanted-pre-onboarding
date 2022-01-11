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
  width: 100%;
  overflow: hidden;
`;

export default TopBanner;
