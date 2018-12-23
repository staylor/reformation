import React from 'react';
import Checkbox from 'components/Form/Checkbox';
import { shallow } from 'enzyme';

describe('Checkbox', () => {
  test('empty', () => {
    const wrapper = shallow(<Checkbox />);
    expect(wrapper).toMatchSnapshot();
  });

  test('checked', () => {
    const wrapper = shallow(<Checkbox checked />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state().checked).toBe(true);
  });

  test('add className', () => {
    const wrapper = shallow(<Checkbox className="foo" />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('onChange', () => {
    // test('toggle', () => {
    //   const func = jest.fn();
    //   const wrapper = shallow(<Checkbox onChange={func} />);
    //   expect(func).not.toHaveBeenCalled();
    //   expect(wrapper.state('checked')).toBe(false);
    //
    //   wrapper.find('input').simulate('change', { target: { checked: true } });
    //   expect(func).toHaveBeenCalled();
    //   expect(wrapper.state('checked')).toBe(true);
    // });
    // test('bad event', () => {
    //   const func = jest.fn();
    //   const wrapper = shallow(<Checkbox checked onChange={func} />);
    //   wrapper.find('input').simulate('change', { target: { value: 'foo' } });
    //   expect(func).toHaveBeenCalled();
    //   expect(wrapper.state('checked')).toBe(false);
    // });
    // test('checked false', () => {
    //   const func = jest.fn();
    //   const wrapper = shallow(<Checkbox onChange={func} />);
    //   wrapper.find('input').simulate('change', { target: { checked: false } });
    //   expect(func).toHaveBeenCalled();
    //   expect(wrapper.state('checked')).toBe(false);
    // });
    //
    // test('toggle false', () => {
    //   const func = jest.fn();
    //   const wrapper = shallow(<Checkbox onChange={func} checked />);
    //   wrapper.find('input').simulate('change', { target: { checked: false } });
    //   expect(func).toHaveBeenCalled();
    //   expect(wrapper.state('checked')).toBe(false);
    // });
    //
    // test('id', () => {
    //   const func = jest.fn();
    //   const wrapper = shallow(<Checkbox id="pizza" onChange={func} checked />);
    //   wrapper.find('input').simulate('change', { target: { checked: false } });
    //   expect(func).toHaveBeenCalledWith(false, 'pizza');
    //   expect(wrapper.state('checked')).toBe(false);
    // });
  });
});
