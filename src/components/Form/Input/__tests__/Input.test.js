import React from 'react';
import Input from 'components/Form/Input';
import { shallow } from 'enzyme';

const TEXT_VALUE = 'Run for the border.';

describe('Input', () => {
  test('empty', () => {
    const wrapper = shallow(<Input />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('value')).toEqual('');
  });

  test('add className', () => {
    const wrapper = shallow(<Input className="foo" />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('onChange', () => {
    test('adding text', () => {
      const func = jest.fn();
      const wrapper = shallow(<Input onChange={func} />);
      const value = TEXT_VALUE;
      wrapper.simulate('change', { target: { value } });

      expect(func).toHaveBeenCalledWith(value);
    });

    test('removing text', () => {
      const func = jest.fn();
      const value = TEXT_VALUE;
      const wrapper = shallow(<Input onChange={func} value={value} />);
      wrapper.simulate('change', { target: { value: '' } });

      expect(func).toHaveBeenCalledWith('');
    });

    test('bad event', () => {
      const func = jest.fn();
      const value = TEXT_VALUE;
      const wrapper = shallow(<Input onChange={func} value={value} />);
      wrapper.simulate('change', { target: { foo: 'bar' } });

      expect(func).toHaveBeenCalledWith('');
    });

    test('bad type', () => {
      const func = jest.fn();
      const value = TEXT_VALUE;
      const wrapper = shallow(<Input onChange={func} value={value} />);
      wrapper.simulate('change', { target: { value: false } });

      expect(func).toHaveBeenCalledWith('');
    });
  });
});
