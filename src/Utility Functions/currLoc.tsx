// eslint-disable-next-line
export const getCurrentLocation = (props: any) => {
  navigator.geolocation.getCurrentPosition(function (position) {
    props.PosFunc({ lat: position.coords.latitude, lng: position.coords.longitude });
    props.ZoomFunc(15);
  });
};
