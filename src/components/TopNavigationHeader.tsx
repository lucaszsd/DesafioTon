//Importações Externas
import { 
    Icon, 
    StyleService,
    useStyleSheet,
    TopNavigation,
    IconProps,
    TopNavigationAction, 
  } from '@ui-kitten/components';
  import { View } from 'react-native';
  import React, { ReactText } from 'react';
  import { useAppSelector } from 'hooks/store';

//Importações Internas
import { RouteNames } from '../routes/nav_types';
import NavigationService from 'routes/NavigationService';

interface TopNavigationHeaderProps {
    title: ReactText;
    backButton?: Boolean;
}
 
const themedStyles = StyleService.create({
    cartAlert: { height: 8, width: 8, borderRadius: 8, backgroundColor: 'red', position: 'absolute', top: 2, right: 0 }, 
});

const BackIcon = (props: IconProps) => <Icon {...props} name="arrow-back" />;
 
const CartIcon = (props: IconProps) => {

    const styles = useStyleSheet(themedStyles); 
    const cart = useAppSelector(state => state.shoppingCartReducer.shoppingCart); 

    return(
        <View>
            <Icon {...props} name="shopping-cart" />
            {/* Só mostra o indicador caso tenha items no carrinho */}
            {cart.length > 0 && <View style = {styles.cartAlert}></View>}
        </View>
        )
    };
 
const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => NavigationService.goBack()}/> 
);

const CartAction = () => (
    <TopNavigationAction icon={CartIcon} onPress={() => NavigationService.navigate(RouteNames.ShoppingCart)} /> 
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