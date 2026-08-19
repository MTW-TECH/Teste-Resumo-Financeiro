export const convertDateValue = (value) => {
  let timestamp = Date.parse(value);
  let date = new Date(timestamp);
  let day =
    date.getDate() > 30
      ? date.getDate()
      : date.getDate() < 10
      ? '0' + date.getDate()
      : date.getDate();
  let month =
    date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  let year = date.getFullYear();
  let dateInit = `${year}-${month}-${day}`;
  return dateInit;
};

export const convertElementarDateValue = (value) => {
  let timestamp = Date.parse(value);
  let date = new Date(timestamp);
  let day =
    date.getDate() > 30
      ? date.getDate()
      : date.getDate() < 10
      ? date.getDate()
      : date.getDate();
  let month = date.getMonth() < 10 ? date.getMonth() + 1 : date.getMonth() + 1;
  let year = date.getFullYear();
  let dateInit = `${day}/${month}/${year}`;
  return dateInit;
};

export const convertElementarBatchDateValue = (value) => {
  let timestamp = Date.parse(value);
  let date = new Date(timestamp);
  let day =
    date.getDate() > 30
      ? date.getDate()
      : date.getDate() < 10
      ? '0' + date.getDate()
      : date.getDate();
  let month = date.getMonth() < 10 ? date.getMonth() + 1 : date.getMonth() + 1;
  let year = date.getFullYear();
  let dateInit = `${year}/${month}/${day}`;
  return dateInit;
};
