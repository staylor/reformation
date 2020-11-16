import React from 'react';
import { css, keyframes, styled } from 'pretty-lights';

import themeUtils from 'styles/theme';

const Container = styled.div`
  background: ${themeUtils.colors.white};
  min-height: ${p => (p.compact ? 100 : 300)}px;
  padding: ${p => (p.compact ? 50 : 100)}px 0 0;
`;

const Wrap = styled.div`
  height: 40px;
  margin: ${p => (p.compact ? '0 0 0 40px' : '0 auto')};
  position: relative;
  width: 40px;
`;

const bounce = keyframes`
  0%,
  100% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }
`;

const bouncingClass = css`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${themeUtils.colors.dark};
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${bounce} 2s infinite ease-in-out;
`;

const Bounce1 = styled.div`
  ${bouncingClass};
`;
const Bounce2 = styled.div`
  ${bouncingClass};
  animation-delay: -1s;
`;

export default function Loading() {
  return (
    <Container>
      <Wrap>
        <Bounce1 />
        <Bounce2 />
      </Wrap>
    </Container>
  );
}
