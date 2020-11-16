import React, { Component } from 'react';
import Input from 'components/Form/Input';
import { fieldNumberClass } from 'components/Form/styled';
import { SecondaryButton } from 'styles/utils';
import { tableClass, cellClass, cellHeadingClass } from './styled';

/* eslint-disable react/prop-types */

class Crops extends Component {
  state = {};

  static getDerivedStateFromProps(nextProps) {
    const crops =
      nextProps.settings.crops && nextProps.settings.crops.length > 0
        ? nextProps.settings.crops
        : [{}];
    return { crops };
  }

  addCrop = e => {
    e.preventDefault();

    this.setState(
      ({ crops: stateCrops }) => {
        const crops = [...stateCrops];
        crops.push({});
        return { crops };
      },
      () => {
        this.props.onUpdate(this.state.crops);
      }
    );
  };

  bindOnChange = (prop, i) => value => {
    this.setState(
      ({ crops: stateCrops }) => {
        const crops = [...stateCrops];
        crops[i] = { ...crops[i] };
        crops[i][prop] = value;
        return { crops };
      },
      () => {
        this.props.onUpdate(this.state.crops);
      }
    );
  };

  render() {
    const { crops } = this.state;
    return (
      <>
        <SecondaryButton onClick={this.addCrop}>Add Crop</SecondaryButton>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={cellHeadingClass}>Name</th>
              <th className={cellHeadingClass}>Dimensions</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop, i) => (
              <tr key={i.toString(16)}>
                <td className={cellClass}>
                  <Input
                    size={20}
                    type="text"
                    name={`crops[${i}][name]`}
                    onChange={this.bindOnChange('name', i)}
                    value={crop.name || ''}
                  />
                </td>
                <td className={cellClass}>
                  <Input
                    className={fieldNumberClass}
                    size={4}
                    type="number"
                    name={`crops[${i}][width]`}
                    onChange={this.bindOnChange('width', i)}
                    value={crop.width || 0}
                  />{' '}
                  x{' '}
                  <Input
                    className={fieldNumberClass}
                    size="4"
                    type="number"
                    name={`crops[${i}][height]`}
                    onChange={this.bindOnChange('height', i)}
                    value={crop.height || 0}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Crops;
