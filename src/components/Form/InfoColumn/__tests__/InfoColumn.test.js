import React from 'react';
import { shallow } from 'enzyme';
import InfoColumn from 'components/Form/InfoColumn';

const label = 'Info!';

const button = <button type="button">Submit</button>;

const infoFields = [
  <p key="0">
    <input name="foo" />
  </p>,
];
const metaFields = [
  <p key="0">
    <input name="bar" />
  </p>,
];

describe('InfoColumn', () => {
  test('No props', () => {
    const wrapper = shallow(<InfoColumn />);
    expect(wrapper).toMatchSnapshot();
  });

  test('with infoFields', () => {
    const wrapper = shallow(<InfoColumn infoFields={infoFields} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('with metaFields', () => {
    const wrapper = shallow(<InfoColumn metaFields={metaFields} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('with info and meta fields', () => {
    const wrapper = shallow(<InfoColumn {...{ infoFields, metaFields }} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('no button', () => {
    const wrapper = shallow(<InfoColumn {...{ label, infoFields, metaFields }} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('with button', () => {
    const wrapper = shallow(<InfoColumn {...{ label, button, infoFields, metaFields }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
