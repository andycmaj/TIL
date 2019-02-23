const toLocaleStringSupportsLocales = () => {
  try {
    new Date().toLocaleString('i');
  } catch (e) {
    return e instanceof RangeError;
  }
  return false;
};

const toHumanDate = date => {
  if (!toLocaleStringSupportsLocales()) {
    return date;
  }

  date = new Date(date);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default toHumanDate;
