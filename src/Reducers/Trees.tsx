import { Tree, PlantTreeAction } from '../Assets/Interfaces';
import { plantTreeActionKind } from '../Assets/Variables';

const plantTree = (trees: Array<Tree>, action: PlantTreeAction) => {
  switch (action.type) {
    case plantTreeActionKind.PLANT: {
      const tree = action.payload.tree;
      if (tree) {
        return trees.concat({
          id: trees.length + 1,
          name: tree.name,
          type: tree.type,
          note: tree.note,
          location: tree.location,
        });
      } else return trees;
    }
    case plantTreeActionKind.REMOVE: {
      return trees;
    }
    case plantTreeActionKind.INITIALIZE: {
      const newTrees = action.payload.trees as Array<Tree>;
      return newTrees ? newTrees : trees;
    }
    default:
      throw new Error();
  }
};

export { plantTree };
