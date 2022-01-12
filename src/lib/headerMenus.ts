export interface IHeaderMenuItem {
  id: number;
  name: string;
  icon: IconTypes;
}

export type IconTypes = "new" | "beta" | null;

export const headerMenus: IHeaderMenuItem[] = [
  {
    id: 0,
    name: "홈",
    icon: null,
  },
  {
    id: 1,
    name: "채용",
    icon: null,
  },
  {
    id: 2,
    name: "이벤트",
    icon: null,
  },
  {
    id: 3,
    name: "직군별 연봉",
    icon: null,
  },
  {
    id: 4,
    name: "이력서",
    icon: null,
  },
  {
    id: 5,
    name: "커뮤니티",
    icon: "new",
  },
  {
    id: 6,
    name: "프리랜서",
    icon: null,
  },
  {
    id: 7,
    name: "AI 합격예측",
    icon: "beta",
  },
];
