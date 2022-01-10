import React, { ReactElement } from "react";
import styled from "styled-components";

function Header(): ReactElement {
  return (
    <HeaderBlock>
      <HeaderInner>
        <HeaderNav>Header</HeaderNav>
      </HeaderInner>
    </HeaderBlock>
  );
}

const HeaderBlock = styled.header`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 1px 0 0 rgb(0 0 0 / 10%);
`;

const HeaderInner = styled.div`
  margin: 0 auto;
  width: 87.72%;
  max-width: 1060px;
  height: 50px;
`;

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default Header;
