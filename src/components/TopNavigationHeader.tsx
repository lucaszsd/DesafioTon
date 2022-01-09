import {
    Button,
    Icon,
    Layout,
    Text,
    StyleService,
    useStyleSheet,
    TopNavigation,
    IconProps,
    TopNavigationAction,
    Card,
    List,
    Avatar,
    Spinner,
  } from '@ui-kitten/components';
import React, { ReactText } from 'react';
import { ListRenderItemInfo, View, ViewProps } from 'react-native';
  
interface TopNavigationHeaderProps {
    title: ReactText;
    backButton?: Boolean;
}

const BackIcon = (props: IconProps) => <Icon {...props} name="arrow-back" />;
 
const CartIcon = (props: IconProps) => <Icon {...props} name="shopping-cart" />;
 
const BackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
    // <TopNavigationAction icon={BackIcon} onPress={navigation.goBack} />
);

const CartAction = () => (
    <TopNavigationAction icon={CartIcon}/>
    // <TopNavigationAction icon={BackIcon} onPress={navigation.goBack} />
);

const TopNavigationHeader = (props: TopNavigationHeaderProps) => { 
    return(
        <TopNavigation
        title={props.title}
        alignment="center"
        accessoryLeft={props.backButton ? BackAction : undefined} 
        accessoryRight={CartAction} 
      /> 
    ) 
}

export default TopNavigationHeader;