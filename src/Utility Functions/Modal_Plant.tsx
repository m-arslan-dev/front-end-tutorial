import { actionKind, dataType } from '../Interfaces/Interface';

// eslint-disable-next-line
export const handleSubmitPlant = (props: any) => {
  if (props.TREE.current.value != '' && props.NAME.current.value != '') {
    const pload: dataType = {
      tree: props.TREE.current.value,
      name: props.NAME.current.value,
      position: { lat: props.lt, lng: props.lg },
      note: props.NOTE.current.value,
    };
    props.setD({ type: actionKind.add, payload: { data: pload } });
    props.VisibleFunc(false);
    if (props.TREE.current.value === 'White Oak') props.setEm((prevState: number) => prevState + 5);
    else if (props.TREE.current.value === 'Red Maple') props.setEm((prevState: number) => prevState + 10);
    else if (props.TREE.current.value === 'Hemlock') props.setEm((prevState: number) => prevState + 15);
    props.TREE.current.value = '';
    props.NAME.current.value = '';
    props.NOTE.current.value = '';
  } else {
    props.VisibleFunc(true);
  }
};
