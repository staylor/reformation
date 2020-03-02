import React from 'react';
import Select from 'components/Form/Select';
import { shallow } from 'enzyme';

const placeholder = '-- Select Flavor --';
const flavors = ['Mild', 'Hot', 'Fire'];
const flavorMap = [
  { label: 'Mild', value: 'mild' },
  { label: 'Hot', value: 'hot' },
  { label: 'Fire', value: 'fire' },
];
const tacoMap = [
  { label: 'Crunchy', value: 'crunchy' },
  { label: 'Soft', value: 'soft' },
];
const groups = [
  { label: 'Tacos', choices: tacoMap },
  { label: 'Saunce', choices: flavorMap },
];

describe('Select', () => {
  test('empty', () => {
    const wrapper = shallow(<Select />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('value')).toEqual('');
  });

  test('add className', () => {
    const wrapper = shallow(<Select className="foo" />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('placeholder', () => {
    test('no choices', () => {
      const wrapper = shallow(<Select placeholder={placeholder} />);
      expect(wrapper).toMatchSnapshot();
    });

    test('choices', () => {
      const wrapper = shallow(<Select placeholder={placeholder} choices={flavors} />);
      expect(wrapper).toMatchSnapshot();
    });

    test('choices as objects', () => {
      const wrapper = shallow(<Select placeholder={placeholder} choices={flavorMap} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('multiple', () => {
    test('true', () => {
      const wrapper = shallow(<Select multiple />);
      expect(wrapper).toMatchSnapshot();
    });

    test('false', () => {
      const wrapper = shallow(<Select multiple={false} />);
      expect(wrapper).toMatchSnapshot();
    });

    test('string', () => {
      const wrapper = shallow(<Select multiple="multiple" />);
      expect(wrapper).toMatchSnapshot();
    });

    test('truthy', () => {
      const wrapper = shallow(<Select multiple="1" />);
      expect(wrapper).toMatchSnapshot();
    });

    test('falsey', () => {
      const wrapper = shallow(<Select multiple="0" />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    test('value', () => {
      const func = jest.fn();
      const wrapper = shallow(<Select onChange={func} choices={flavorMap} />);
      const value = 'fire';
      wrapper.simulate('change', { target: { value } });
      expect(wrapper.state('value')).toEqual(value);
    });

    test('values', () => {
      const func = jest.fn();
      const wrapper = shallow(<Select multiple onChange={func} choices={flavorMap} />);
      wrapper.simulate('change', {
        target: { selectedOptions: [{ value: 'mild' }, { value: 'fire' }] },
      });
      expect(wrapper.state('value')).toEqual(['mild', 'fire']);
    });
  });

  describe('choices', () => {
    test('choices', () => {
      const wrapper = shallow(<Select choices={flavors} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.state('value')).toEqual('');
    });

    test('choices as objects', () => {
      const wrapper = shallow(<Select choices={flavorMap} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.state('value')).toEqual('');
    });

    test('choice', () => {
      const value = 'medium';
      const wrapper = shallow(<Select choices={flavorMap} value={value} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.state('value')).toEqual(value);
    });
  });

  describe('groups', () => {
    test('no value', () => {
      const wrapper = shallow(<Select groups={groups} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.state('value')).toEqual('');
    });

    test('value', () => {
      const value = 'mild';
      const wrapper = shallow(<Select groups={groups} value={value} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.state('value')).toEqual(value);
    });

    test('values', () => {
      const value = ['soft', 'mild'];
      const wrapper = shallow(<Select multiple groups={groups} value={value} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.state('value')).toEqual(value);
    });
  });

  describe('groups', () => {
    test('children', () => {
      const wrapper = shallow(
        <Select>
          <option value="meximelt">Mexi-melt</option>
        </Select>
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('children with choices', () => {
      const wrapper = shallow(
        <Select choices={flavorMap}>
          <option value="meximelt">Mexi-melt</option>
        </Select>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
