import { LinkArrowIcon } from "assets/icons";
import { IBannerImageItem } from "lib/bannerImages";
import React, { ReactElement } from "react";
import styled, { css } from "styled-components";
import media from "styles/media";
import { fadeIn } from "styles/transitions";

interface BannerImageListItemProps {
  imageItem: IBannerImageItem;
  isCenter: boolean;
  imageWidth: number;
  imagePadding: number;
}

function BannerImageListItem({
  imageItem,
  isCenter,
  imageWidth,
  imagePadding,
}: BannerImageListItemProps): ReactElement {
  const { imageUrl, title, description, link } = imageItem;

  return (
    <BannerImageListItemBlock
      isCenter={isCenter}
      imagePadding={imagePadding}
      imageWidth={imageWidth}
    >
      <ItemBox>
        <ItemImage src={imageUrl} isCenter={isCenter} imageWidth={imageWidth} />

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

interface IBannerImageItemStyled {
  isCenter: boolean;
  imageWidth: number;
  imagePadding: number;
}

const BannerImageListItemBlock = styled.div<IBannerImageItemStyled>`
  width: ${(props) => props.imageWidth}px;
  padding: 0 ${(props) => props.imagePadding}px;
  box-sizing: content-box;
  float: left;
  height: 100%;
  min-height: 1px;
`;

const ItemBox = styled.div`
  position: relative;
`;

const ItemImage = styled.img<{ isCenter: boolean; imageWidth: number }>`
  border-radius: 4px;
  width: ${(props) => props.imageWidth}px;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
  filter: ${({ isCenter }) =>
    isCenter ? "brightness(100%)" : "brightness(50%)"};
  ${media.xlarge} {
    height: 183px;
  }
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
  ${media.xlarge} {
    display: block;
  }
  position: absolute;
  bottom: 28px;
  width: 330px;
  height: 146px;
  border-radius: 4px;
  background-color: #fff;
  text-align: left;
  left: 34px;
  ${media.xlarge} {
    position: relative;
    bottom: auto;
    left: auto;
    width: 100%;
    text-align: center;
  }
`;

const ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InfoTitle = styled.h2`
  margin: 20px 20px 0 20px;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 700;
  color: #333;
  ${ellipsis}
  ${media.xlarge} {
    margin: 20px 0 0 0;
    font-size: 18px;
    line-height: 1;
  }
`;

const InfoDescription = styled.h3`
  margin: 0 20px;
  height: 44px;
  font-size: 14px;
  line-height: 1.64;
  color: #333;
  font-weight: 500;
  ${ellipsis}
  ${media.xlarge} {
    margin: 6px 0 0 0;
    font-size: 13px;
    line-height: 1.15;
    height: auto;
  }
`;

const DividerLine = styled.hr`
  height: 1px;
  margin: 0;
  border: none;
  flex-shrink: 0;
  background-color: #ececec;
  ${media.xlarge} {
    display: none;
  }
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
  border-radius: 25px;
  cursor: pointer;
  ${media.xlarge} {
    margin: 0;
  }
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
