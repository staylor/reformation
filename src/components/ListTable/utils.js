// eslint-disable-next-line
export const formatDate = date => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const min = d.getMinutes();
  const hour = d.getHours();
  return `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${d.getFullYear()}
  ${' '}at${' '}
  ${hour % 12}:${min < 10 ? `0${min}` : min}${hour < 12 ? 'am' : 'pm'}`;
};
