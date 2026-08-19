export const maskedValue = (val) => {
  let defaultVal = '';

  if (typeof val !== 'string') {
    return defaultVal;
  } else {
    let a = val.replace(/[^\d]+/g, ''); // remove non digit chars.
    let maskedVal = a.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
    );
    return maskedVal;
  }
};
