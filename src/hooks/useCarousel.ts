import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface CarouselOptions {
  data: any[];
  slideItemWidth: number; // 슬라이드 될 아이템 가로 길이
  slideCount: number; // 슬라이드 넘어가는 개수
}

export default function useCarousel(options: CarouselOptions) {
  const { slideCount, data, slideItemWidth } = options;
  const slideRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(slideCount);
  const [isAnimation, setIsAnimaion] = useState(true);
  const [isFlowing, setIsFlowing] = useState(true);
  const [isCenterIndex, setIsCenterIndex] = useState(0);
  const [dataList, setDataList] = useState(
    data.sort(() => Math.random() - 0.5)
  );
  const ORIGINAL_IMAGE_LENGTH = data.length;
  const INITIAL_FOCUS_SLIDE_INDEX = Math.floor((ORIGINAL_IMAGE_LENGTH * 3) / 2);

  useEffect(() => {
    setDataList([...data, ...data, ...data]);
  }, [data]);

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

  // @Note 다음 슬라이드 이동 버튼
  const onNextSlide = useCallback(() => {
    setCurrentSlide(currentSlide + slideCount);
  }, [currentSlide, slideCount]);

  // @Note 이전 슬라이드 이동 버튼
  const onPrevSlide = useCallback(() => {
    setCurrentSlide(currentSlide - slideCount);
  }, [currentSlide, slideCount]);

  useEffect(() => {
    if (!slideRef.current) return;
    //@Note 현재 슬라이드가 이미지 갯수를 넘어갔을 경우 초기 상태로 몰래 바꿔치기하는 작업
    if (
      currentSlide === ORIGINAL_IMAGE_LENGTH + 1 ||
      currentSlide * -1 === ORIGINAL_IMAGE_LENGTH - 1
    ) {
      setTimeout(() => {
        setIsAnimaion(false); // @Note 바꿔치기할 때 animation을 잠깐 끔 (사용자에게 들키지 않기 위해 )
        if (slideRef.current) {
          slideRef.current.style.left = `${
            INITIAL_FOCUS_SLIDE_INDEX * slideItemWidth * -1
          }px`;
        }
        setCurrentSlide(slideCount);
      }, 500);
      setTimeout(() => {
        // @Note 바꿔치기 성공한 뒤에 animation을 바로 킴
        setIsAnimaion(true);
      }, 600);
    }

    slideRef.current.style.transform = `translateX(${
      -slideItemWidth * (currentSlide - slideCount)
    }px)`;
  }, [
    currentSlide,
    slideItemWidth,
    slideCount,
    ORIGINAL_IMAGE_LENGTH,
    INITIAL_FOCUS_SLIDE_INDEX,
  ]);

  // @Note 무한 슬라이드를 위해 setInterval 사용
  useLayoutEffect(() => {
    let intervalId: NodeJS.Timer;
    if (isFlowing) {
      intervalId = setInterval(() => {
        setCurrentSlide(currentSlide + slideCount);
      }, 3500);
    }
    return () => clearTimeout(intervalId);
  }, [isFlowing, currentSlide, slideCount]);

  // @Note 현재 슬라이드가 원본 이미지 길이를 벗어났을 때는 그대로 return 시켜주고 아닐 경우에는 center 상태에 index를 넣어줌
  // @Note 이렇게 하는 이유는 center Index 값을 가지고 있어야 이미지 아래에 information 정보를 보여줄 수 있음
  useEffect(() => {
    if (currentSlide > ORIGINAL_IMAGE_LENGTH) return;
    if (currentSlide <= -1 * ORIGINAL_IMAGE_LENGTH + slideCount) return;

    setIsCenterIndex(currentSlide - 1 + INITIAL_FOCUS_SLIDE_INDEX);
  }, [
    currentSlide,
    ORIGINAL_IMAGE_LENGTH,
    INITIAL_FOCUS_SLIDE_INDEX,
    slideCount,
  ]);

  const onChangeFlowing = (value: boolean) => {
    setIsFlowing(value);
  };

  return {
    slideRef,
    isAnimation,
    INITIAL_FOCUS_SLIDE_INDEX,
    dataList,
    isCenterIndex,
    onPrevSlide,
    onNextSlide,
    onChangeFlowing,
  };
}
