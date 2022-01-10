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
  Icon,
  IconProps,
} from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { Image, ListRenderItemInfo, TouchableNativeFeedback, View } from 'react-native';

//Importações Intearnas
import { useAppSelector } from 'hooks/store'; 
import { Breed, Product } from 'types/interfaces';  
import { RouteNames } from '../../routes/nav_types'; 
import NavigationService from 'routes/NavigationService'; 
import TopNavigationHeader from 'components/TopNavigationHeader'; 
import * as ShoppingCartActions from 'features/shoppingCart/shoppingCartSlice';

interface selectedItems{
  selectedItems: number
} 
 
const themedStyles = StyleService.create({
  btn: { margin: 16 },

  removeBtn: { borderRadius: 30},

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

  footerSection: {
    bottom: 0, 
    width: '100%',
    position: 'absolute',
  },

  item: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingLeft: 16,
  },

  temperamentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  temperament: { 
    paddingLeft: 24,
  },
});


const ShoppingCart = () => {
  const dispatch = useDispatch()
  const styles = useStyleSheet(themedStyles); 
  const cart = useAppSelector(state => state.shoppingCartReducer.shoppingCart); 
  const products = useAppSelector(state => state.shoppingCartReducer.products); 
  
  const productData = (id: string) => { 
    let productData:Breed = products.filter(product => product.id == id)[0]
    return productData;
  }

  const RemoveIcon = (props: IconProps) => <Icon {...props} name="close-circle-outline" />;

  const renderItem = ({ item }: ListRenderItemInfo<Product>) => {
 
    const product = productData(item.id);
 
    return(  
      <TouchableNativeFeedback onPress={() => NavigationService.navigate(RouteNames.ItemDetail, product)}>
        <View style = {styles.item}>
          <View style={styles.temperamentWrapper}>
            <Avatar size="giant" shape = 'rounded' source={{uri:product.image.url}} />
            <Text category="p2" style={styles.temperament}>
              {product.name}
            </Text>
          </View> 
          <Button size = 'giant' appearance={'ghost'} status = 'danger' style = {styles.removeBtn} accessoryRight={RemoveIcon} onPress={() => dispatch(ShoppingCartActions.removeProductFromCart(item.id))}/>
        </View>
      </TouchableNativeFeedback>
    )
  };

  const EmptyShoppingCart = () => {
     
    const imageCart = require('../../../assets/images/emptyCart.png');

    return(
      <View style={[styles.maxFlex, styles.centerContent]}>
        <Text category={'h6'}>Carrinho vazio</Text>
        <Image source={imageCart} style={{ height: 196, width: 196 }} />
        <Text>Selecione itens na loja</Text>
        <View style = {styles.footerSection}>
          <Button style = {styles.btn} onPress={() => NavigationService.navigate(RouteNames.StoreItems)}>Voltar para a loja</Button>
        </View>
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
