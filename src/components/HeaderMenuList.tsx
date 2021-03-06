import { headerMenus } from "lib/headerMenus";
import React, { ReactElement } from "react";
import styled from "styled-components";
import media from "styles/media";
import HeaderMenuListItem from "./HeaderMenuListItem";

function HeaderMenuList(): ReactElement {
  return (
    <HeaderMenuListBlock>
      {headerMenus.map((menu) => (
        <HeaderMenuListItem menuItem={menu} key={menu.id} />
      ))}
    </HeaderMenuListBlock>
  );
}

const HeaderMenuListBlock = styled.ul`
  ${media.custom(1100)} {
    display: flex;
    flex: 1 1;
    justify-content: space-evenly;
  }
  ${media.large} {
    justify-content: flex-start;
    margin-right: 30px;
  }
  ${media.medium} {
    margin-right: 0;
  }
`;

export default HeaderMenuList;
