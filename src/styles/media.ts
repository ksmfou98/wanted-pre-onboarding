export const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

export const size = {
  xlarge: 1200,
  large: 991,
  medium: 767,
};

const { large, medium, xlarge } = size;

const media = {
  xlarge: mediaQuery(xlarge),
  large: mediaQuery(large),
  medium: mediaQuery(medium),
  custom: mediaQuery,
};

export default media;
