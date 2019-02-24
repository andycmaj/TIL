const toLocaleStringSupportsLocales = () => {
  try {
    new Date().toLocaleString('i');
  } catch (e) {
    return e instanceof RangeError;
  }
  return false;
};

const toHumanDate = date => {
  date = new Date(date);

  if (!toLocaleStringSupportsLocales()) {
    return date.toDateString();
  }

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default toHumanDate;
