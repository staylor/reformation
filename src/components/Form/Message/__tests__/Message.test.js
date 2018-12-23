import React from 'react';
import Message from 'components/Form/Message';
import { shallow } from 'enzyme';

describe('Message', () => {
  test('empty', () => {
    const wrapper = shallow(<Message />);
    expect(wrapper).toMatchSnapshot();
  });

  test('text', () => {
    const wrapper = shallow(<Message text="This is an admin message." />);
    expect(wrapper).toMatchSnapshot();
  });
});
