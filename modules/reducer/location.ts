import {GeolocationResponse} from '@react-native-community/geolocation';

const SET_LOCATION = 'LOCATION/SET_LOCATION' as const;

export const changeLocation = (pos: GeolocationResponse) => ({
  type: SET_LOCATION,
  payload: pos,
});

type LocationAction = ReturnType<typeof changeLocation>;

export interface LocationState {
  location: GeolocationResponse;
}

const initialState: LocationState = {
  location: {
    coords: {
      latitude: 0,
      longitude: 0,
      altitude: null,
      accuracy: 0,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: 0,
  },
};

const setLocation = (state: LocationState, location: GeolocationResponse) => ({
  ...state,
  location,
});

const reducer = (
  state: LocationState = initialState,
  action: LocationAction,
) => {
  switch (action.type) {
    case SET_LOCATION:
      return setLocation(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
