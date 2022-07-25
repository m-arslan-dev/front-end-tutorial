import { Tree, PlantTreeAction } from '../../Assets/Interfaces';
import { plantTreeActionKind } from '../../Assets/Variables';

const plantTree = (trees: Array<Tree>, action: PlantTreeAction) => {
  switch (action.type) {
    case plantTreeActionKind.PLANT: {
      // eslint-disable-next-line
      return trees;
    }
    case plantTreeActionKind.REMOVE: {
      return trees;
    }
    default:
      throw new Error();
  }
};

export { plantTree };
