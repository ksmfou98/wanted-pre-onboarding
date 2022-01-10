import { ArrowLeftIcon, ArrowRightIcon } from "assets/icons";
import React, { ReactElement } from "react";
import styled, { css } from "styled-components";
import BannerImageList from "./BannerImageList";

interface IButtonDirection {
  direction: "left" | "right";
}

function TopBanner(): ReactElement {
  return (
    <TopBannerBlock>
      <BannerImageList />

      <ArrowButtonStyled direction="left">
        <IconBox>
          <ArrowLeftIcon />
        </IconBox>
      </ArrowButtonStyled>

      <ArrowButtonStyled direction="right">
        <IconBox>
          <ArrowRightIcon />
        </IconBox>
      </ArrowButtonStyled>
    </TopBannerBlock>
  );
}

const TopBannerBlock = styled.div`
  padding-top: 25px;
  position: relative;
  /* overflow: hidden; */
`;

const ArrowButtonStyled = styled.button<IButtonDirection>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 120px;
  width: 30px;
  height: 60px;
  opacity: 0.5;
  border-radius: 15px;
  background-color: #fff;
  font-size: 16px;
  ${(props) =>
    props.direction === "left"
      ? css`
          left: calc((100% - 1210px) / 2);
        `
      : css`
          right: calc((100% - 1200px) / 2);
        `}
`;

const IconBox = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: inherit;
  svg {
    user-select: none;
    width: 1em;
    height: 1em;
    display: inline-block;
    fill: currentColor;
    flex-shrink: 0;
    font-size: inherit;
  }
`;

export default TopBanner;
