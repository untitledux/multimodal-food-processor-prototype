export const setActiveToFalse = ({ obj, key: keyExpected, value }) => {
  Object.keys(obj).forEach((key) => {
    if (key === keyExpected && obj[key] === value) {
      obj.active = false;
    } else if (typeof obj[key] === 'object') {
      setActiveToFalse({ obj: obj[key], key: keyExpected, value });
    }
  });
};

export const setToActive = ({ obj, key: keyExpected, value }) => {
  Object.keys(obj).forEach((key) => {
    if (key === keyExpected && obj[key] === value) {
      obj.active = true;
    } else if (typeof obj[key] === 'object') {
      setToActive({ obj: obj[key], key: keyExpected, value });
    }
  });
};
