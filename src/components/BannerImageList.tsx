import { ArrowLeftIcon, ArrowRightIcon } from "assets/icons";
import useWindowDimensions from "hooks/useWindowDimensitons";
import { bannerImages } from "lib/bannerImages";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import media from "styles/media";
import BannerImageListItem from "./BannerImageListItem";

interface IButtonDirection {
  direction: "left" | "right";
}

function BannerImageList(): ReactElement {
  const { width } = useWindowDimensions();
  const SLIDE_IMAGE_WIDTH = width > 1200 ? 1060 : width - 80;
  const SLIDE_IMAGE_PADDING = width > 1200 ? 12 : 10;
  const SLIDE_ITEM_WIDTH =
    SLIDE_IMAGE_WIDTH + SLIDE_IMAGE_PADDING + SLIDE_IMAGE_PADDING; // @Note 슬라이드 할 요소 가로 길이
  const SHOW_SLIDE_LENGTH = 1; // @Note 슬라이드 할 요소 개수
  const INITIAL_FOCUS_SLIDE_INDEX = 16; // @Note 처음에 초점 맞춰져 있는 슬라이드 인덱스
  const ORIGINAL_IMAGE_LENGTH = bannerImages.length; // @Note 원본 이미지 개수

  // @Note 이미지 데이터를 랜덤하게 섞어서 상태에 저장
  const [bannerImageList, setBannerImageList] = useState(
    bannerImages.sort(() => Math.random() - 0.5)
  );
  const [isAnimation, setIsAnimaion] = useState(true); // @Note 슬라이드 애니메이션 여부 -> 무한 슬라이드 구현 시 인덱스 초기화 시에는 에니메이션 사용X
  const [isFlowing, setIsFlowing] = useState(true); // @Note 이 값이 true 이면 자동 슬라이드 실행
  const [isCenterIndex, setIsCenterIndex] = useState(0); // @Note 중앙에 있는 슬라이드 인덱스 (현재 슬라이드 값 + 처음에 초점 맞춰져 있는 슬라이드 인덱스 - 1) -> 마지막에 -1 하는 이유는 인덱스가 0부터 시작해야해서 -1 해줌
  const slideRef = useRef<HTMLDivElement>(null); // @Note 슬라이드 시킬 div 값 저장
  const [currentSlide, setCurrentSlide] = useState(SHOW_SLIDE_LENGTH); // @Note 현재 슬라이드 값

  useEffect(() => {
    const handleResize = () => {
      // @Note 화면이 리사이즈 될 동안에는 애니매이션, 화면 슬라이드 막기
      setIsAnimaion(false);
      setIsFlowing(false);
      setTimeout(() => {
        setIsFlowing(true);
        setIsAnimaion(true);
      }, 500);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // @Note 최초 이미지 리스트를 [이전] [중앙] [다음] 상태로 넣어줌 -> 무한 슬라이드를 위해서
  useEffect(() => {
    setBannerImageList([...bannerImages, ...bannerImages, ...bannerImages]);
  }, []);

  // @Note 다음 슬라이드 이동
  const onNextSlide = useCallback(() => {
    setCurrentSlide(currentSlide + SHOW_SLIDE_LENGTH);
  }, [currentSlide]);

  // @Note 이전 슬라이드 이동
  const onBackSlide = useCallback(() => {
    setCurrentSlide(currentSlide - SHOW_SLIDE_LENGTH);
  }, [currentSlide]);

  useEffect(() => {
    if (!slideRef.current) return;
    //@Note 현재 슬라이드가 이미지 갯수를 넘어갔을 경우 초기 상태로 몰래 바꿔치기하는 작업
    if (
      currentSlide === bannerImages.length + 1 ||
      currentSlide * -1 === bannerImages.length - 1
    ) {
      setTimeout(() => {
        setIsAnimaion(false); // @Note 바꿔치기할 때 animation을 잠깐 끔 (사용자에게 들키지 않기 위해 )
        if (slideRef.current) {
          // slideRef.current.style.left = "-17344px";
          slideRef.current.style.left = `${
            INITIAL_FOCUS_SLIDE_INDEX * SLIDE_ITEM_WIDTH * -1
          }px`;
        }
        setCurrentSlide(SHOW_SLIDE_LENGTH);
      }, 500);
      setTimeout(() => {
        // @Note 바꿔치기 성공한 뒤에 animation을 바로 킴
        setIsAnimaion(true);
      }, 600);
    }

    slideRef.current.style.transform = `translateX(${
      -SLIDE_ITEM_WIDTH * (currentSlide - SHOW_SLIDE_LENGTH)
    }px)`;
  }, [currentSlide, SLIDE_ITEM_WIDTH]);

  // @Note 무한 슬라이드를 위해 setInterval 사용
  useLayoutEffect(() => {
    let intervalId: NodeJS.Timer;
    if (isFlowing) {
      intervalId = setInterval(() => {
        setCurrentSlide(currentSlide + SHOW_SLIDE_LENGTH);
      }, 3500);
    }
    return () => clearTimeout(intervalId);
  }, [isFlowing, currentSlide]);

  // @Note 현재 슬라이드가 원본 이미지 길이를 벗어났을 때는 그대로 return 시켜주고 아닐 경우에는 center 상태에 index를 넣어줌
  // @Note 이렇게 하는 이유는 center Index 값을 가지고 있어야 이미지 아래에 information 정보를 보여줄 수 있음
  useEffect(() => {
    if (currentSlide > ORIGINAL_IMAGE_LENGTH) return;
    if (currentSlide <= -1 * ORIGINAL_IMAGE_LENGTH + SHOW_SLIDE_LENGTH) return;

    setIsCenterIndex(currentSlide - 1 + INITIAL_FOCUS_SLIDE_INDEX);
  }, [currentSlide, ORIGINAL_IMAGE_LENGTH]);

  return (
    <BannerImageListWrapper bannerWidth={SLIDE_ITEM_WIDTH}>
      <ImageListBox
        ref={slideRef}
        isAnimation={isAnimation}
        initialLeft={SLIDE_ITEM_WIDTH * -1 * INITIAL_FOCUS_SLIDE_INDEX}
        onMouseEnter={() => setIsFlowing(false)}
        onMouseLeave={() => setIsFlowing(true)}
      >
        <ImageList>
          {bannerImageList.map((image, index) => (
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
        onClick={onBackSlide}
        onMouseEnter={() => setIsFlowing(false)}
        onMouseLeave={() => setIsFlowing(true)}
      >
        <IconBox>
          <ArrowLeftIcon />
        </IconBox>
      </ArrowButtonStyled>

      <ArrowButtonStyled
        direction="right"
        onClick={onNextSlide}
        onMouseEnter={() => setIsFlowing(false)}
        onMouseLeave={() => setIsFlowing(true)}
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
