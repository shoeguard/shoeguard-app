import React, {useEffect, useState} from 'react';
import {FlatList, Linking} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import Header from 'components/Header';
import {hp, wp} from 'styles/size';

type NavigationType = NativeStackNavigationProp<MenuStackType>;

interface ILicense {
  licenses: string;
  repository: string;
  licenseUrl: string;
  parents: string;
}

interface IFinalLicense {
  name: string;
  version: string;
  licenseSpecs: ILicense;
}

const OSS = () => {
  const [licenses, setLicenses] = useState<IFinalLicense[]>([]);
  const navigation = useNavigation<NavigationType>();

  useEffect(() => {
    const licenses: {
      [id: string]: ILicense;
    } = require('../../assets/licenses.json');
    const numberRegex = /\d+(\.\d+)*/;
    const atRegex = /(?:@)/gi;

    const finalLicense: IFinalLicense[] = [];
    Object.keys(licenses).map(idx => {
      let item = licenses[idx];
      // Extract the version of the library from the name
      const version = idx.match(numberRegex);
      // Removes the part after the @
      const nameWithoutVersion = idx
        .replace(atRegex, '')
        .replace(version ? version[0] : '', '');
      finalLicense.push({
        name: nameWithoutVersion,
        version: version ? version[0] : '',
        licenseSpecs: item,
      });
    });

    setLicenses(finalLicense);
  }, []);

  const onPressLeft = () => {
    navigation.dispatch(StackActions.pop(1));
  };

  const renderItem = ({
    item: {name, version, licenseSpecs},
  }: {
    item: IFinalLicense;
  }) => {
    return (
      <FlatListItem onPress={() => Linking.openURL(licenseSpecs.licenseUrl)}>
        <FlatListLabel>
          {name} {version}
        </FlatListLabel>
      </FlatListItem>
    );
  };

  return (
    <Container>
      <Header onPressLeft={onPressLeft} />
      <FlatList
        keyboardShouldPersistTaps={'handled'}
        data={licenses}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({theme}) => theme.color.white};
`;

const FlatListItem = styled.TouchableOpacity`
  width: ${wp('100%')}px;
  height: ${hp('6%')}px;
  padding: 0px ${wp('4.3%')}px;
  flex-direction: row;
  border: 1px solid ${({theme}) => theme.color.gray};
`;

const FlatListLabel = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.regular};
`;

export default OSS;
