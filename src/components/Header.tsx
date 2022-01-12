import React, { ReactElement } from "react";
import styled from "styled-components";
import media from "styles/media";
import HeaderButtonGroup from "./HeaderButtonGroup";
import HeaderLogo from "./HeaderLogo";
import HeaderMenuList from "./HeaderMenuList";

function Header(): ReactElement {
  return (
    <HeaderBlock>
      <HeaderInner>
        <HeaderNav>
          <HeaderLogo />
          <HeaderMenuList />
          <HeaderButtonGroup />
        </HeaderNav>
      </HeaderInner>
    </HeaderBlock>
  );
}

const HeaderBlock = styled.header`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
`;

const HeaderInner = styled.div`
  margin: 0 auto;
  width: 87.72%;
  max-width: 1060px;
  height: 50px;
  ${media.xlarge} {
    width: 90%;
  }
  ${media.large} {
    height: 110px;
  }
`;

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  flex-wrap: wrap;
`;

export default Header;
