import { ArrowLeftIcon, ArrowRightIcon } from "assets/icons";
import useCarousel from "hooks/useCarousel";
import useWindowDimensions from "hooks/useWindowDimensitons";
import { bannerImages } from "lib/bannerImages";
import React, { ReactElement } from "react";
import styled, { css } from "styled-components";
import media, { size } from "styles/media";
import BannerImageListItem from "./BannerImageListItem";

interface IButtonDirection {
  direction: "left" | "right";
}

function BannerImageList(): ReactElement {
  const { width } = useWindowDimensions(); // @Note window 사이즈가 변화할 때마다 변경되는 width 값
  const INITIAL_IMAGE_WIDTH = 1060; // @Note 초기 이미지 크기
  const SLIDE_IMAGE_WIDTH =
    width > size.xlarge ? INITIAL_IMAGE_WIDTH : width - 80; // @Note width 사이즈가 1200 이상이면 최초사이즈유지 하고 줄어들면 현재 width 값에서 - 80
  const SLIDE_IMAGE_PADDING = width > size.xlarge ? 12 : 10; // @Note width 사이즈가 1200 이상이면 12 아래이면 10
  const SLIDE_ITEM_WIDTH =
    SLIDE_IMAGE_WIDTH + SLIDE_IMAGE_PADDING + SLIDE_IMAGE_PADDING; // @Note 슬라이드 할 요소 가로 길이 (이미지 가로길이 + 왼쪽 패딩 + 오른쪽 패딩)

  const carouselOption = {
    data: bannerImages,
    slideItemWidth: SLIDE_ITEM_WIDTH,
    slideCount: 1,
  };

  const {
    initialFocusSlideIndex,
    dataList,
    isAnimation,
    isCenterIndex,
    onChangeFlowing,
    onNextSlide,
    onPrevSlide,
    slideRef,
  } = useCarousel(carouselOption);

  return (
    <BannerImageListWrapper bannerWidth={SLIDE_ITEM_WIDTH}>
      <ImageListBox
        ref={slideRef}
        isAnimation={isAnimation}
        initialLeft={SLIDE_ITEM_WIDTH * -1 * initialFocusSlideIndex}
        onMouseEnter={() => onChangeFlowing(false)}
        onMouseLeave={() => onChangeFlowing(true)}
      >
        <ImageList>
          {dataList.map((image, index) => (
            <BannerImageListItem
              key={index}
              imageItem={image}
              isCenter={index === isCenterIndex}
              imageWidth={SLIDE_IMAGE_WIDTH}
              imagePadding={SLIDE_IMAGE_PADDING}
            />
          ))}
        </ImageList>
      </ImageListBox>

      <ArrowButtonStyled
        direction="left"
        onClick={onPrevSlide}
        onMouseEnter={() => onChangeFlowing(false)}
        onMouseLeave={() => onChangeFlowing(true)}
      >
        <IconBox>
          <ArrowLeftIcon />
        </IconBox>
      </ArrowButtonStyled>

      <ArrowButtonStyled
        direction="right"
        onClick={onNextSlide}
        onMouseEnter={() => onChangeFlowing(false)}
        onMouseLeave={() => onChangeFlowing(true)}
      >
        <IconBox>
          <ArrowRightIcon />
        </IconBox>
      </ArrowButtonStyled>
    </BannerImageListWrapper>
  );
}

const BannerImageListWrapper = styled.div<{ bannerWidth: number }>`
  padding-top: 25px;
  width: ${({ bannerWidth }) => bannerWidth}px;
  margin: 0 auto;
  position: relative;
  height: 350px;
  ${media.xlarge} {
    padding-top: 20px;
  }
`;

const ImageListBox = styled.div<{ isAnimation: boolean; initialLeft: number }>`
  width: 100%;
  position: absolute;
  left: ${(props) => props.initialLeft}px;
  ${({ isAnimation }) => isAnimation && "transition: all 0.5s ease-in-out"};
`;

const ImageList = styled.div`
  display: flex;
`;

const ArrowButtonStyled = styled.button<IButtonDirection>`
  ${media.xlarge} {
    display: none;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 145px;
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

export default BannerImageList;
