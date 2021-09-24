import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import TabDeviceIcon from 'images/tab-device.svg';
import TabHistoryIcon from 'images/tab-history.svg';
import TabMenuIcon from 'images/tab-menu.svg';
import TabReportIcon from 'images/tab-report.svg';
import TabDeviceActiveIcon from 'images/tab-device-active.svg';
import TabHistoryActiveIcon from 'images/tab-history-active.svg';
import TabMenuActiveIcon from 'images/tab-menu-active.svg';
import TabReportActiveIcon from 'images/tab-report-active.svg';
import {hp, wp} from 'styles/size';
import {Platform} from 'react-native';

interface IContainerProps {
  height: number;
}

interface ITabButtonProps {
  marginBottom: number;
}

interface ITabLabelProps {
  isFocused: boolean;
}

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const {bottom} = useSafeAreaInsets();

  const getIcon = (routeName: string, index: number) => {
    const inactiveIcon = {
      DeviceStack: <TabDeviceIcon width={wp('5.3%')} />,
      ReportStack: <TabReportIcon width={wp('5.3%')} />,
      HistoryStack: <TabHistoryIcon width={wp('5.3%')} />,
      MenuStack: <TabMenuIcon width={wp('5.3%')} />,
    };
    const activeIcon = {
      DeviceStack: <TabDeviceActiveIcon width={wp('5.3%')} />,
      ReportStack: <TabReportActiveIcon width={wp('5.3%')} />,
      HistoryStack: <TabHistoryActiveIcon width={wp('5.3%')} />,
      MenuStack: <TabMenuActiveIcon width={wp('5.3%')} />,
    };
    const focused = state.index === index;

    return focused
      ? activeIcon[routeName as keyof MainParentTabType]
      : inactiveIcon[routeName as keyof MainParentTabType];
  };

  return (
    <Container
      height={
        Platform.OS === 'android' ? hp('8%') + bottom : hp('6.9%') + bottom
      }>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let icon = getIcon(route.name, index);

        return (
          <TabButton
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            marginBottom={0}
            key={index}>
            {icon}
            <TabLabel isFocused={isFocused}>{label}</TabLabel>
          </TabButton>
        );
      })}
    </Container>
  );
};

const Container = styled.View<IContainerProps>`
  flex-direction: row;
  background-color: ${({theme}) => theme.color.white};
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.color.gray};
  height: ${({height}) => height}px;
`;

const TabButton = styled.TouchableOpacity<ITabButtonProps>`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: ${hp('0.6%')}px;
  margin-bottom: ${({marginBottom}) => marginBottom}px;
`;

const TabLabel = styled.Text<ITabLabelProps>`
  color: ${({isFocused, theme}) =>
    isFocused ? theme.color.blue : theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.regular};
  font-size: ${({theme}) => theme.fontSize.sm}px;
  margin-top: ${hp('0.2%')}px;
`;

export default TabBar;
