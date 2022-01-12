import { IHeaderMenuItem } from "lib/headerMenus";
import React, { ReactElement } from "react";
import styled, { css } from "styled-components";
import media from "styles/media";
import HeaderMenuIcon from "./HeaderMenuIcon";

interface HeaderMenuListItemProps {
  menuItem: IHeaderMenuItem;
}

function HeaderMenuListItem({
  menuItem,
}: HeaderMenuListItemProps): ReactElement {
  const { icon, name, id } = menuItem;

  return (
    <HeaderMenuListItemStyled isMobileShow={id < 3}>
      <MenuLinked href="#">
        {name}
        <MenuIcon isBeta={icon === "beta"}>
          <HeaderMenuIcon icon={icon} />
        </MenuIcon>
      </MenuLinked>
    </HeaderMenuListItemStyled>
  );
}

const HeaderMenuListItemStyled = styled.li<{ isMobileShow: boolean }>`
  height: inherit;
  display: inline-block;
  &:first-child {
    display: none;
  }
  ${media.medium} {
    &:first-child {
      display: inline-block;
    }
    ${({ isMobileShow }) => !isMobileShow && "display: none;"}
  }
`;

const MenuLinked = styled.a`
  position: relative;
  vertical-align: middle;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  padding: 15px;
  display: inline-block;
  color: #444444;
  ${media.custom(1100)} {
    font-size: 13px;
  }
  ${media.large} {
    padding: 11px 10px 19px;
  }
`;

const MenuIcon = styled.div<{ isBeta: boolean }>`
  position: absolute;
  top: 10px;
  right: ${({ isBeta }) => (isBeta ? "-7px" : "-5px")};
  ${media.large} {
    ${({ isBeta }) =>
      isBeta
        ? css`
            right: -8px;
            top: 4px;
          `
        : css`
            top: 5px;
            right: -7px;
          `}
  }
`;

export default HeaderMenuListItem;
