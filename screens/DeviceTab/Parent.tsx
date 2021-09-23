import React, {useState} from 'react';
import MapView, {EventUserLocation} from 'react-native-maps';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {height, hp, width, wp} from 'styles/size';
import {RootState} from 'modules/store';
import {changeLocation} from 'modules/reducer/location';

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Parent = () => {
  const [isVisibile, setIsVisibile] = useState(false);
  const dispatch = useDispatch();
  const coords = useSelector(
    (state: RootState) => state.location.location.coords,
  );

  const setLocation = ({nativeEvent: {coordinate}}: EventUserLocation) => {
    const info = {
      coords: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        altitude: coordinate.altitude,
        accuracy: coordinate.accuracy,
        altitudeAccuracy: coordinate.accuracy,
        heading: coordinate.heading,
        speed: coordinate.speed,
      },
      timestamp: coordinate.timestamp,
    };
    dispatch(changeLocation(info));
  };

  return (
    <Container>
      <StyledMapView
        showsUserLocation
        followsUserLocation
        onUserLocationChange={event => setLocation(event)}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      />
      <ModalButton>
        <Indicator />
      </ModalButton>
      <StyledModal
        isVisible={isVisibile}
        onBackdropPress={() => setIsVisibile(false)}
        swipeDirection="down"
        onSwipeComplete={() => setIsVisibile(false)}>
        <ModalContainer>
          <Indicator />
        </ModalContainer>
      </StyledModal>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  position: relative;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({theme}) => theme.color.white};
`;

const StyledMapView = styled(MapView)`
  flex: 1;
  width: ${wp('100%')}px;
  height: ${hp('100%')}px;
`;

const ModalButton = styled.TouchableWithoutFeedback`
  position: absolute;
  width: ${wp('100%')}px;
  height: ${hp('2.9%')}px;
  border-radius: 8px;
  background-color: ${({theme}) => theme.color.white};
  justify-content: center;
  align-items: center;
  bottom: 0px;
`;

const StyledModal = styled(Modal)`
  justify-content: flex-end;
  margin: 0px;
  z-index: 1;
`;

const ModalContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Indicator = styled.View`
  flex: 1;
  width: ${wp('10.7%')}px;
  height: ${hp('0.4%')}px;
  border-radius: 4px;
  background-color: ${({theme}) => theme.color.gray};
`;

export default Parent;
