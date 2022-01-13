export const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

export const size = {
  xlarge: 1200,
  large: 991,
  medium: 767,
  small: 320,
};

const { large, medium, xlarge, small } = size;

const media = {
  xlarge: mediaQuery(xlarge),
  large: mediaQuery(large),
  medium: mediaQuery(medium),
  small: mediaQuery(small),
  custom: mediaQuery,
};

export default media;
