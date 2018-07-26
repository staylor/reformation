import PropTypes from 'prop-types';

// eslint-disable-next-line
export const mediaSettingsShape = PropTypes.shape({
  crops: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    })
  ),
});
