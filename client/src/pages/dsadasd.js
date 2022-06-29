const handleCheckChange = ({ target }) => {
  const { checked, value } = target;

  if (checked) {
    setCheckedProducts((prev) => (
      [...prev, value]
    ));

    setQuantityArr((prev) => (
      [...prev, { [value]: '' }]
    ));

    return;
  }

  setQuantityArr((prev) => prev.filter((item) => (
    parseInt(Object.keys(item)[0], 10) !== parseInt(value, 10)
  )));
  setCheckedProducts((prev) => prev.filter((item) => item !== value));
};

const handleQuantityChange = ({ target }) => {
  const { name, value } = target;

  const newArr = quantityArr.map((obj) => {
    if (parseInt(Object.keys(obj)[0], 10) === parseInt(name, 10)) {
      return {
        [Object.keys(obj)[0]]: value,
      };
    }
    return obj;
  });

  setQuantityArr(newArr);
};