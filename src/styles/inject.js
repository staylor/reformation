import { injectGlobal } from 'pretty-lights';
import themeUtils from 'styles/theme';
import iconsWoff from 'public/fonts/icons/icons.woff';
import iconsWoff2 from 'public/fonts/icons/icons.woff2';
import iconsTtf from 'public/fonts/icons/icons.ttf';
import iconsSvg from 'public/fonts/icons/icons.svg';

// eslint-disable-next-line
injectGlobal`
  body {
    background: repeating-linear-gradient(
      -55deg,
      ${themeUtils.colors.white},
      ${themeUtils.colors.white} 20px,
      ${themeUtils.colors.detail} 20px,
      ${themeUtils.colors.detail} 23px
    );
    color: ${themeUtils.colors.text};
    font-family: ${themeUtils.fonts.body};
    font-size: 1em;
    line-height: 1.5;
    text-rendering: optimizeLegibility;
  }

  iframe {
    max-width: 100%;
  }

  a {
    color: ${themeUtils.colors.dark};

    &:hover, &:active {
      color: ${themeUtils.colors.pink};
    }
  }

  blockquote {
    margin: 0 ${themeUtils.padding}px;
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: ${themeUtils.fonts.weight.bold};
  }

  sup {
    font-size: 10px;
    vertical-align: super;
  }

  sub {
    font-size: 10px;
    vertical-align: sub;
  }

  @font-face {
    font-family: 'icons';
    src: url('${iconsWoff2}?hjlue1') format('woff2'),
      url('${iconsTtf}?hjlue1') format('truetype'),
      url('${iconsWoff}?hjlue1') format('woff'),
      url('${iconsSvg}?hjlue1#icons') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  .icon-font {
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    font-family: 'icons';
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    line-height: 1;
    speak: none;
    text-transform: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
