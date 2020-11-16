import React from 'react';
import { mount } from 'enzyme';
import { cx } from 'pretty-lights';
import { headingBaseClass, Heading, largeButtonClass, smallButtonClass } from '../utils';

describe('Style utils', () => {
  test('headingBaseClass', () => {
    const wrapper = mount(<h1 className={headingBaseClass}>Hello</h1>);

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
          [largeButtonClass]: typeof largeButtonClass === 'string',
          [smallButtonClass]: typeof smallButtonClass !== 'string',
        })}
      >
        Hello
      </a>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
