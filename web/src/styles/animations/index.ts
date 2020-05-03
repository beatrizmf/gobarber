import { keyframes } from 'styled-components';

export const appearFromLeft = keyframes`
from {
  opacity: 0;
  transform: translateX(-100px)
}
to {
  opacity: 1;
  transform: translateX(0);
}
`;

export const appearFromRight = keyframes`
from {
  opacity: 0;
  transform: translateX(100px)
}
to {
  opacity: 1;
  transform: translateX(0);
}
`;
