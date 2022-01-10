//Importações Externas
import React from 'react';
import {
  Button, 
  Layout,
  Text,
  StyleService,
  useStyleSheet, 
  List,
  Avatar,
  Spinner,
} from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { Image, ListRenderItemInfo, View } from 'react-native';

//Importações Intearnas
import { useAppSelector } from 'hooks/store'; 
import { Product } from 'types/interfaces';  
import { RouteNames } from '../../routes/nav_types'; 
import TopNavigationHeader from 'components/TopNavigationHeader'; 
import * as ShoppingCartActions from 'features/shoppingCart/shoppingCartSlice';

interface selectedItems{
  selectedItems: number
} 

const themedStyles = StyleService.create({
  btn: { margin: 16 },

  itemContainer: { padding: 16},

  selectedItems: { fontWeight: 'bold' },

  maxFlex: {
    flex: 1, 
  },

  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    margin: 16,
  },

  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },

  item: {
    marginVertical: 8,
    paddingHorizontal: 16,
    flex: 1, 
  },

  temperamentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  temperament: { 
    paddingLeft: 8,
  },
});


const ShoppingCart = () => {
  const dispatch = useDispatch()
  const styles = useStyleSheet(themedStyles); 
  const cart = useAppSelector(state => state.shoppingCartReducer.shoppingCart); 
  
  const renderItem = ({ item }: ListRenderItemInfo<Product>) => {

    const imageItem = {uri: 'https://www.fillmurray.com/100/100'};

    return(  
      <View style = {styles.item}>
        <View style={styles.temperamentWrapper}>
          <Avatar size="giant" source={imageItem} />
          <Text category="p2" style={styles.temperament}>
            {item.id}
          </Text>
          <Button status = 'danger' onPress={() => dispatch(ShoppingCartActions.removeProductFromCart(item.id))}>Remove</Button>
        </View> 
      </View>
    )
  };

  const EmptyShoppingCart = () => {
     
    const imageCart = {uri: 'https://www.fillmurray.com/100/100'};

    return(
      <View style={[styles.maxFlex, styles.centerContent]}>
        <Image source={imageCart} style={{ height: 180, width: 180 }} />
      </View>
    )
  }

  const SelectedItems = (props: selectedItems) => {
    return(
      <View style = {styles.itemContainer}>
        <Text category={'s1'} style = {styles.selectedItems}>{props.selectedItems == 1 ? `1 item selecionado` : `${props.selectedItems} items selecionados`}</Text>
      </View>
    )
  }
   
  return (
    <Layout style={styles.maxFlex}>  
      <TopNavigationHeader backButton={true} title = {'Carrinho de Compras'}/> 
      <SelectedItems selectedItems = {cart.length}/>
      {cart.length == 0? 
      <EmptyShoppingCart/>:
      <List
      style={styles.maxFlex}
      contentContainerStyle={styles.contentContainer}
      data={cart}
      renderItem={renderItem}
    /> 
    }
     
    </Layout>
  );
};

// Do this so that sentry can track the name of component names even if the code is minified
// You can also ask metro config to not minify function names but that can increase the file size
ShoppingCart.displayName = RouteNames.StoreItems;

export default ShoppingCart;
