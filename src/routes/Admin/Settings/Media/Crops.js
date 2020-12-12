import React, { useState } from 'react';
import Input from 'components/Form/Input';
import { fieldNumberClass } from 'components/Form/styled';
import { SecondaryButton } from 'styles/utils';
import { tableClass, cellClass, cellHeadingClass } from './styled';

/* eslint-disable react/prop-types */

function Crops({ settings, onUpdate }) {
  const [crops, setCrops] = useState(
    settings.crops && settings.crops.length > 0 ? settings.crops : [{}]
  );

  const addCrop = e => {
    e.preventDefault();

    const newsCrops = [...crops];
    newsCrops.push({});
    setCrops(newsCrops);
    onUpdate(newsCrops);
  };

  const bindOnChange = (prop, i) => value => {
    const newCrops = [...crops];
    newCrops[i] = { ...newCrops[i] };
    newCrops[i][prop] = value;
    setCrops(newCrops);
    onUpdate(newCrops);
  };

  return (
    <>
      <SecondaryButton onClick={addCrop}>Add Crop</SecondaryButton>
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
                  onChange={bindOnChange('name', i)}
                  value={crop.name || ''}
                />
              </td>
              <td className={cellClass}>
                <Input
                  className={fieldNumberClass}
                  size={4}
                  type="number"
                  name={`crops[${i}][width]`}
                  onChange={bindOnChange('width', i)}
                  value={crop.width || 0}
                />{' '}
                x{' '}
                <Input
                  className={fieldNumberClass}
                  size="4"
                  type="number"
                  name={`crops[${i}][height]`}
                  onChange={bindOnChange('height', i)}
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

export default Crops;
