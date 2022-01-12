export const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

const media = {
  xlarge: mediaQuery(1200),
  large: mediaQuery(991),
  medium: mediaQuery(767),
  custom: mediaQuery,
};

export default media;
