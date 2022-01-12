export const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

const media = {
  xlarge: mediaQuery(1200),
  tablet: mediaQuery(1068),
  mobile: mediaQuery(550),
  custom: mediaQuery,
};

export default media;
