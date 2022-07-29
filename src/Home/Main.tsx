import React, {useReducer} from 'react';
import MapSection from '../Components/MapSection';
import { contextData } from '../ContextAPI/Context';
import data from '../Data/Marked.json';
import { dataType, actionContext } from '../Interfaces/Interface';

const reducer = (state: Array<dataType>, action: actionContext) => {
  console.log(state)
  // if (action.type === "remove") {
  //   return state.filter((_, i) => i != action.i); 
  // }  
  if (action.type === "add") 
    return [
      ...state,
      {
        tree: action.payload.tree,
        name: action.payload.name,
        position: action.payload.position,
        note: action.payload.note
      }
    ];
      return state;
  }
  const App = () => {

  const [state, dispatch] = useReducer(reducer, data);
  return(
    <div>
      <contextData.Provider value={{data: state, setData: dispatch}} >
        <MapSection/>
      </contextData.Provider>
    </div>
  )
}

export default App;