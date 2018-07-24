// @flow
import React from 'react';
import { infoColumnClass, infoBoxClass, infoBoxHeaderClass, infoBoxContentClass } from './styled';

type Props = {
  infoFields?: Array<any>,
  metaFields?: Array<any>,
  label?: string,
  button?: any,
};

export default function InfoColumn({ infoFields, metaFields, label, button }: Props) {
  return (
    <section className={infoColumnClass}>
      {infoFields.length > 0 ? (
        <aside className={infoBoxClass}>
          <h3 className={infoBoxHeaderClass}>{label}</h3>
          <div className={infoBoxContentClass}>
            {infoFields}
            {button}
          </div>
        </aside>
      ) : null}
      {metaFields.length > 0 ? (
        <aside className={infoBoxClass}>
          <div className={infoBoxContentClass}>{metaFields}</div>
        </aside>
      ) : null}
    </section>
  );
}

InfoColumn.defaultProps = {
  infoFields: [],
  metaFields: [],
  label: '',
  button: null,
};
