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
        return dataItem.concat({ name: action.payload.name, rollNo: action.payload.rollNo, age: action.payload.age }) ;
      }
      default:
        throw new Error();
    }
  }



  export {removeDataItem};