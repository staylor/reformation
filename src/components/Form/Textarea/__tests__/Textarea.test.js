import React from 'react';
import Textarea from 'components/Form/Textarea';
import { shallow } from 'enzyme';

const TEXT_VALUE = 'Run for the border.';

describe('Textarea', () => {
  test('empty', () => {
    const wrapper = shallow(<Textarea />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('value')).toEqual('');
  });

  test('add className', () => {
    const wrapper = shallow(<Textarea className="foo" />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('onChange', () => {
    test('adding text', () => {
      const func = jest.fn();
      const wrapper = shallow(<Textarea onChange={func} />);
      const value = TEXT_VALUE;
      wrapper.simulate('change', { target: { value } });
      expect(wrapper.state('value')).toEqual(value);
    });

    test('removing text', () => {
      const func = jest.fn();
      const value = TEXT_VALUE;
      const wrapper = shallow(<Textarea onChange={func} value={value} />);
      wrapper.simulate('change', { target: { value: '' } });
      expect(wrapper.state('value')).toEqual('');
    });

    test('bad event', () => {
      const func = jest.fn();
      const value = TEXT_VALUE;
      const wrapper = shallow(<Textarea onChange={func} value={value} />);
      wrapper.simulate('change', { target: { foo: 'bar' } });
      expect(wrapper.state('value')).toEqual('');
    });

    test('bad type', () => {
      const func = jest.fn();
      const value = TEXT_VALUE;
      const wrapper = shallow(<Textarea onChange={func} value={value} />);
      wrapper.simulate('change', { target: { value: false } });
      expect(wrapper.state('value')).toEqual('');
    });
  });
});
