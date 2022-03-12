import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import AudioRecorderPlayer, {
  AudioSet,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import {wp, hp} from 'styles/size';
import {RootState} from 'modules/store';
import {useInterval} from 'hooks';
import AudioImage from 'images/waves.svg';
import api, {uploadFile} from 'api';

type NavigationType = NativeStackNavigationProp<RootStackType>;
type RouteType = RouteProp<RootStackType, 'ReportActive'>;

const ReportActive = () => {
  const [address, setAddress] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string>('');
  const [recordSecs, setRecordSecs] = useState<number>(0);
  const [recordTime, setRecordTime] = useState<string>('');
  const [uri, setUri] = useState<string>('');
  const navigation = useNavigation<NavigationType>();
  const {
    params: {id},
  } = useRoute<RouteType>();
  const {user} = useSelector((state: RootState) => state.account);
  useInterval(() => fetchData(), 1000);
  const audioRecorderPlayer = new AudioRecorderPlayer();

  useEffect(() => {
    onStartRecord();
  }, []);

  const onStartRecord = async () => {
    await AsyncStorage.setItem('ongoing_report_id', `${id}`);

    // const audioSet: AudioSet = {
    //   AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    //   AudioSourceAndroid: AudioSourceAndroidType.MIC,
    //   AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
    //   AVNumberOfChannelsKeyIOS: 2,
    //   AVFormatIDKeyIOS: AVEncodingOption.aac,
    // };

    const audioUri = await audioRecorderPlayer.startRecorder();

    setUri(audioUri);
    console.log(`uri: ${audioUri}`);

    audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      console.log('record-back', e);
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    });
  };

  const fetchData = async () => {
    const access = await AsyncStorage.getItem('access');

    const response = await api.get(`/reports/${id}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      setAddress(response.data.address);
      setCreatedAt(response.data.created);

      if (response.data.is_done) {
        const result = await audioRecorderPlayer.stopRecorder();

        console.log(`result: ${result}`);

        const audioUrl = await uploadFile(uri);

        const putResponse = await api.put(
          `/reports/${id}`,
          {
            audio_url: audioUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          },
        );

        if (putResponse.status === 200) {
          audioRecorderPlayer.removeRecordBackListener();
          navigation.dispatch(StackActions.replace('MainTab'));
        }
      }
    }
  };

  return (
    <Container>
      <Title>신고하기</Title>
      <InfoWrapper>
        <InfoLabel>신고위치</InfoLabel>
        <InfoText>{address}</InfoText>
      </InfoWrapper>
      <InfoWrapper>
        <InfoLabel>신고시각</InfoLabel>
        <InfoText>{new Date(createdAt).toLocaleString('ko-KR')}</InfoText>
      </InfoWrapper>
      <InfoWrapper>
        <InfoLabel>보호자</InfoLabel>
        <InfoText>{user?.parent.name}</InfoText>
      </InfoWrapper>
      <AudioText>증거 수집을 위한 녹음중..</AudioText>
      <AudioImage width={wp('100%')} />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({theme}) => theme.color.red};
`;

const Title = styled.Text`
  width: 100%;
  font-size: ${({theme}) => theme.fontSize.xl}px;
  color: ${({theme}) => theme.color.white};
  font-family: ${({theme}) => theme.fontFamily.bold};
  padding: 0px ${wp('4.3%')}px;
  margin: ${hp('5.2%')}px 0px ${hp('2.3%')}px 0px;
`;

const InfoWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px ${wp('4.3%')}px;
  margin-top: ${hp('2%')}px;
`;

const InfoLabel = styled.Text`
  font-size: ${({theme}) => theme.fontSize.sm}px;
  color: ${({theme}) => theme.color.white};
  font-family: ${({theme}) => theme.fontFamily.regular};
  line-height: ${hp('2%')}px;
  margin-bottom: ${hp('0.2%')}px;
`;

const InfoText = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.color.white};
  font-family: ${({theme}) => theme.fontFamily.bold};
  line-height: ${hp('3%')}px;
`;

const AudioText = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  color: ${({theme}) => theme.color.white};
  font-family: ${({theme}) => theme.fontFamily.bold};
  width: 100%;
  text-align: center;
  margin: ${hp('24.1%')}px 0px ${hp('4.9%')}px 0px;
`;

export default ReportActive;
