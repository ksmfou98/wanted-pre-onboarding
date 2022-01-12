import { LinkArrowIcon } from "assets/icons";
import { IBannerImageItem } from "lib/bannerImages";
import React, { ReactElement } from "react";
import styled, { css } from "styled-components";
import { fadeIn } from "styles/transitions";

interface BannerImageListItemProps {
  imageItem: IBannerImageItem;
  isCenter: boolean;
}

function BannerImageListItem({
  imageItem,
  isCenter,
}: BannerImageListItemProps): ReactElement {
  const { imageUrl, title, description, link } = imageItem;

  return (
    <BannerImageListItemBlock isCenter={isCenter}>
      <ItemBox>
        <ItemImage src={imageUrl} />

        <ItemInformationBox isCenter={isCenter}>
          <InfoTitle>{title}</InfoTitle>
          <InfoDescription>{description}</InfoDescription>
          <DividerLine />
          <InfoLinked href={link}>
            <div className="text">
              바로가기
              <div className="icoBox">
                <div className="ico">
                  <LinkArrowIcon />
                </div>
              </div>
            </div>
          </InfoLinked>
        </ItemInformationBox>
      </ItemBox>
    </BannerImageListItemBlock>
  );
}

const BannerImageListItemBlock = styled.div<{ isCenter: boolean }>`
  width: 1060px;
  padding: 0 12px;
  box-sizing: content-box;
  float: left;
  height: 100%;
  min-height: 1px;
  filter: ${({ isCenter }) =>
    isCenter ? "brightness(100%)" : "brightness(50%)"};
`;

const ItemBox = styled.div`
  position: relative;
`;

const ItemImage = styled.img`
  border-radius: 4px;
`;

const ItemInformationBox = styled.div<{ isCenter: boolean }>`
  ${({ isCenter }) =>
    isCenter
      ? css`
          display: block;
        `
      : css`
          display: none;
        `};
  animation: ${fadeIn} 0.4s ease-in-out;
  position: absolute;
  bottom: 28px;
  width: 330px;
  height: 146px;
  border-radius: 4px;
  background-color: #fff;
  text-align: left;
  left: 34px;
`;

const InfoTitle = styled.h2`
  margin-left: 20px;
  margin-right: 20px;
  font-size: 20px;
  line-height: 1.5;
  margin-top: 20px;
  font-weight: 700;
  color: #333;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const InfoDescription = styled.h3`
  margin: 0 20px;
  height: 44px;
  font-size: 14px;
  line-height: 1.64;
  color: #333;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const DividerLine = styled.hr`
  height: 1px;
  margin: 0;
  border: none;
  flex-shrink: 0;
  background-color: #ececec;
`;

const InfoLinked = styled.a`
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  color: #36f;
  margin: 6px 0 0 13px;
  height: 40px;
  display: block;
  padding: 6px 8px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 64px;
  box-sizing: border-box;
  border-radius: 25px;
  cursor: pointer;
  .text {
    width: 100%;
    font-size: inherit;
    font-weight: inherit;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
    color: inherit;
    .icoBox {
      margin-right: -1px;
      margin-left: 2px;
      .ico {
        width: 100%;
        svg {
          user-select: none;
          width: 1em;
          height: 1em;
          display: inline-block;
          fill: currentColor;
          flex-shrink: 0;
          font-size: inherit;
        }
      }
    }
  }
`;

export default BannerImageListItem;
