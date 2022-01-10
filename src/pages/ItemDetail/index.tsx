//Importações Externas
import React from 'react';
import {
  Button, 
  Layout,
  Text,
  StyleService,
  useStyleSheet,  
} from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { Image, View } from 'react-native';

//Importações Intearnas
import { useAppSelector } from 'hooks/store'; 
import { Breed, Product } from 'types/interfaces';  
import { NavProps, RouteNames } from 'routes/nav_types'; 
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

  item: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingLeft: 16,
  },

  temperamentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  tags: {
    borderRadius: 24,
    margin: 4,
  },

  descriptionDetail: { 
    marginTop: 8,
  },

  temperament: { 
    paddingLeft: 24,
  },
});


const ItemDetail = ({ route }: NavProps[RouteNames.ItemDetail]) => {
  const dispatch = useDispatch()
  const styles = useStyleSheet(themedStyles); 
  const cart = useAppSelector(state => state.shoppingCartReducer.shoppingCart); 
 
  const item:Breed = route.params;
 
  const shoppingCartData = (id: string) => {  
    let shoppingCartItemData:Product = cart.filter(item => item.id == id)[0]
    return shoppingCartItemData;
  }

  const shoppingCartItem = shoppingCartData(item.id)

  console.log("Item: ", item)
  
  const tagsGenerator = (temperament: string) => { 
    return temperament.split(',') 
  }
 
  const tags = tagsGenerator(item.temperament);
 
  return (
    <Layout style={styles.maxFlex}>  
      <TopNavigationHeader backButton={true} title = {'Detalhe do item'}/>  
      <Image source={{uri: item.image.url}} style={{ height: 196, width: '100%' }} />
      <View style = {styles.itemContainer}>
        <Text category={'h5'}>{item.name}</Text>   
        <View style = {[{flexDirection: 'row', flexWrap: 'wrap'}, styles.descriptionDetail]}>
          {tags.map((temperamentTrait, index) => <Button key = {index} size={'tiny'} style = {styles.tags}>{temperamentTrait}</Button>)}
        </View> 
        <Text style = {styles.descriptionDetail}>{`Origem: ${item.origin}`}</Text>    
        <Text style = {styles.descriptionDetail}>{`Tamanho: ${item.height.metric} cm`}</Text>    
        <Text style = {styles.descriptionDetail}>{`Tempo de vida: ${item.life_span.replace('years', 'anos')}`}</Text>    
        <Text style = {styles.descriptionDetail}>{`Peso: ${item.weight.metric} Kg`}</Text>    
      </View>
      <View style = {{position: 'absolute', bottom: 0, width: '100%'}}>
        {shoppingCartItem ? 
          <Button status = {'danger'} style = {styles.btn} onPress={() => dispatch(ShoppingCartActions.removeProductFromCart(item.id))}>{'remove'}</Button>:
          <Button status = {'success'} style = {styles.btn} onPress={() => dispatch(ShoppingCartActions.addProductToCart(item.id))}>{'Add'}</Button> 
        }
      </View>
    </Layout>
  );
};

// Do this so that sentry can track the name of component names even if the code is minified
// You can also ask metro config to not minify function names but that can increase the file size
ItemDetail.displayName = RouteNames.ItemDetail;

export default ItemDetail;
