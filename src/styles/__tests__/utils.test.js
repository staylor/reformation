import React from 'react';
import { mount } from 'enzyme';
import { cx } from 'emotion';
import { headingStyles, Heading, largeButtonStyles, smallButtonStyles } from '../utils';

describe('Style utils', () => {
  test('headingStyles', () => {
    const wrapper = mount(<h1 className={headingStyles}>Hello</h1>);
    expect(wrapper).toMatchSnapshot();
  });

  test('Heading', () => {
    const wrapper = mount(<Heading>Hello</Heading>);
    expect(wrapper).toMatchSnapshot();
  });

  test('cx', () => {
    const wrapper = mount(
      <a
        href="http://foo.com"
        className={cx({
          [largeButtonStyles]: typeof largeButtonStyles === 'string',
          [smallButtonStyles]: typeof smallButtonStyles !== 'string',
        })}
      >
        Hello
      </a>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
