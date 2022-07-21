const removeDataItem = (dataItem, action) => {
  switch (action.type) {
    case "remove": {
      // eslint-disable-next-line
      let index = dataItem.findIndex((x) => x.rollNo == action.payload);
      if (index !== -1) {
        return dataItem.splice(index, 1);
      }
      return dataItem;
    }
    case "add": {
      return dataItem.findIndex((x) => x.rollNo === action.payload.rollNo) ===
        -1
        ? dataItem.concat({
            name: action.payload.name,
            rollNo: action.payload.rollNo,
            age: action.payload.age,
          })
        : dataItem;
    }
    default:
      throw new Error();
  }
};

export { removeDataItem };
