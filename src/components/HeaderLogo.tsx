import { MenuIMG } from "assets/images";
import React, { ReactElement } from "react";
import styled from "styled-components";
import media from "styles/media";

function HeaderLogo(): ReactElement {
  return (
    <HeaderLogoBlock>
      <LogoButton>
        <LogoIcon src={MenuIMG} />
      </LogoButton>
      <a href="/">
        <LogoText>wanted</LogoText>
      </a>
    </HeaderLogoBlock>
  );
}

const HeaderLogoBlock = styled.div`
  display: flex;
  align-items: center;
  ${media.large} {
    width: 100%;
    padding: 15px 0;
    height: 60px;
  }
  ${media.medium} {
    padding: 15px 20px;
  }
`;

const LogoButton = styled.button`
  margin-top: -2px;
  margin-right: 15px;
  display: flex;
`;

const LogoIcon = styled.img`
  width: 17px;
  height: 14px;
`;

const LogoText = styled.span`
  font-size: 23px;
  font-weight: 700;
  height: 17px;
  color: #403f3f;
  font-family: "roboto";
  line-height: 18px;
`;

export default HeaderLogo;
