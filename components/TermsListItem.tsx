import React from 'react';
import styled from 'styled-components/native';
import ChevronDown from 'images/chevron-down.svg';
import ChevronUp from 'images/chevron-up.svg';
import {hp, wp} from 'styles/size';
import {TouchableHighlight} from 'react-native';

interface TermsData {
  title: string;
  description: string;
}

interface IProps {
  item: TermsData;
  onPress: () => void;
  isSelected: boolean;
}

const TermsListItem = ({item, onPress, isSelected}: IProps) => {
  return (
    <>
      <TouchableHighlight onPress={onPress} underlayColor={'transperent'}>
        <ListTitle>
          <ListTitleLabel>{item.title}</ListTitleLabel>
          {isSelected ? (
            <ChevronUp width={wp('4.3%')} height={wp('4.3%')} />
          ) : (
            <ChevronDown width={wp('4.3%')} height={wp('4.3%')} />
          )}
        </ListTitle>
      </TouchableHighlight>
      {isSelected && <ListDescription>{item.description}</ListDescription>}
    </>
  );
};

const ListTitle = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${hp('5.9%')}px;
  width: ${wp('89.3%')}px;
  padding: 0px ${wp('6.4%')}px 0px ${wp('4.3%')}px;
`;

const ListTitleLabel = styled.Text`
  color: ${({theme}) => theme.color.black};
  font-size: ${({theme}) => theme.fontSize.md}px;
  font-family: ${({theme}) => theme.fontFamily.regular};
`;

const ListDescription = styled.Text`
  width: ${wp('87.2')}px;
  padding: ${hp('1%')}px ${wp('6.4%')}px 0px;
  font-size: ${({theme}) => theme.fontSize.sm}px;
  font-family: ${({theme}) => theme.fontFamily.demiLight};
  color: ${({theme}) => theme.color.black};
`;

export default TermsListItem;
