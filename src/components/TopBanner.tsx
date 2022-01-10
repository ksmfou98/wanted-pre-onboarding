import React, { ReactElement } from "react";
import styled from "styled-components";

function TopBanner(): ReactElement {
  return <TopBannerBlock>TopBanner</TopBannerBlock>;
}

const TopBannerBlock = styled.div`
  padding-top: 25px;
  background-color: #fff;
  position: relative;
  overflow: hidden;
`;

export default TopBanner;
