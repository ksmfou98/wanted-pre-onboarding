import { ArrowLeftIcon, ArrowRightIcon } from "assets/icons";
import useCarousel from "hooks/useCarousel";
import useWindowDimensions from "hooks/useWindowDimensitons";
import { bannerImages } from "lib/bannerImages";
import React, { ReactElement, useMemo } from "react";
import styled, { css } from "styled-components";
import media, { size } from "styles/media";
import BannerImageListItem from "./BannerImageListItem";

interface IButtonDirection {
  direction: "left" | "right";
}

function BannerImageList(): ReactElement {
  const { width } = useWindowDimensions(); // @Note window 사이즈가 변화할 때마다 변경되는 width 값
  const INITIAL_IMAGE_WIDTH = 1060; // @Note 초기 이미지 크기

  // @Note width 사이즈가 1200 이상이면 최초사이즈유지 하고 줄어들면 현재 width 값에서 - 80
  const slideImageWidth = useMemo(() => {
    return width > size.xlarge ? INITIAL_IMAGE_WIDTH : width - 80;
  }, [width]);

  // @Note width 사이즈가 1200 이상이면 12 아래이면 10
  const slideImagePadding = useMemo(() => {
    return width > size.xlarge ? 12 : 10;
  }, [width]);

  // @Note 슬라이드 할 요소 가로 길이 (이미지 가로길이 + 왼쪽 패딩 + 오른쪽 패딩)
  const slideItemWidth = useMemo(() => {
    return slideImageWidth + slideImagePadding + slideImagePadding;
  }, [slideImageWidth, slideImagePadding]);

  const carouselOption = {
    data: bannerImages,
    slideItemWidth: slideItemWidth,
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
    isDisabled,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    touchMoveDistance,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseOut,
  } = useCarousel(carouselOption);

  return (
    <BannerImageListWrapper
      bannerWidth={slideItemWidth}
      onMouseDown={(e) => e.preventDefault()}
    >
      <ImageListBox
        ref={slideRef}
        isAnimation={isAnimation}
        onMouseEnter={() => onChangeFlowing(false)}
        onMouseLeave={() => onChangeFlowing(true)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onMouseOut={onMouseOut}
        onDragStart={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        style={{
          left:
            slideItemWidth * -1 * initialFocusSlideIndex + touchMoveDistance,
        }}
      >
        <ImageList>
          {dataList.map((image, index) => (
            <BannerImageListItem
              key={index}
              imageItem={image}
              isCenter={index === isCenterIndex}
              imageWidth={slideImageWidth}
              imagePadding={slideImagePadding}
            />
          ))}
        </ImageList>
      </ImageListBox>

      <ArrowButtonStyled
        direction="left"
        onClick={onPrevSlide}
        onMouseEnter={() => onChangeFlowing(false)}
        onMouseLeave={() => onChangeFlowing(true)}
        disabled={isDisabled}
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
        disabled={isDisabled}
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

const ImageListBox = styled.div<{ isAnimation: boolean }>`
  width: 100%;
  position: absolute;
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
