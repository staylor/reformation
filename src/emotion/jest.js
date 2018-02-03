// @flow
import type { Emotion } from 'create-emotion';

type ClassNameReplacer = (className: string, index: number) => string;

type Options = {
  classNameReplacer: ClassNameReplacer,
};

function defaultClassNameReplacer(className, index) {
  return `emotion-${index}`;
}

const componentSelectorClassNamePattern = /\.e[a-zA-Z0-9-]+[0-9]+/;

const replaceClassNames = (
  selectors: Array<string>,
  code: string,
  key: string,
  replacer: ClassNameReplacer = defaultClassNameReplacer
) => {
  let index = 0;
  const classRegex = new RegExp(`^\\.${key}-([a-zA-Z0-9-]+)`);

  return selectors.reduce((acc, className) => {
    if (classRegex.test(className) || componentSelectorClassNamePattern.test(className)) {
      const escapedRegex = new RegExp(
        className.replace('.', '').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
        'g'
      );
      index += 1;
      return acc.replace(escapedRegex, replacer(className, index));
    }
    return acc;
  }, code);
};

function getNodes(node, nodes = []) {
  if (node.children) {
    node.children.forEach(child => getNodes(child, nodes));
  }

  if (typeof node === 'object') {
    nodes.push(node);
  }

  return nodes;
}

function getSelectorsFromProps(selectors, props) {
  const className = props.className || props.class;
  if (className) {
    selectors = selectors.concat(className.split(' ').map(cn => `.${cn}`));
  }
  return selectors;
}

function getSelectors(nodes) {
  return nodes.reduce((selectors, node) => getSelectorsFromProps(selectors, node.props), []);
}

function test(val: *) {
  return val && !val.withEmotionStyles && val.$$typeof === Symbol.for('react.test.json');
}

// eslint-disable-next-line
export function createSerializer(emotion: Emotion, { classNameReplacer }: Options = {}) {
  function markNodes(nodes) {
    nodes.forEach(node => {
      node.withEmotionStyles = true;
    });
  }

  function print(val: *, printer: Function) {
    const nodes = getNodes(val);
    markNodes(nodes);
    const selectors = getSelectors(nodes);
    const printedVal = printer(val);
    return replaceClassNames(selectors, printedVal, emotion.caches.key, classNameReplacer);
  }

  return { test, print };
}
