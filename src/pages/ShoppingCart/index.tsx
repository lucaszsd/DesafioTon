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
import TopNavigationHeader from 'components/TopNavigationHeader';
import React from 'react';
import { Image, ListRenderItemInfo, View, ViewProps } from 'react-native';
import { useFetchBreedsQuery } from '../../features/dogs/dogs_api_slice';
import { NavProps, RouteNames } from '../../routes/nav_types'; 
import { Breed, Product, ShoppingCartReducerState } from 'types/interfaces';
import { useSelector } from 'react-redux';
import { useAppSelector } from 'hooks/store'; 

 
const themedStyles = StyleService.create({
  btn: { margin: 16 },

  itemContainer: { padding: 16},

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
    paddingVertical: 4,
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
    // width: '80%',
    paddingLeft: 8,
  },
});


const ShoppingCart = () => {
  const styles = useStyleSheet(themedStyles);
  const { data = [], isFetching } = useFetchBreedsQuery(20);  
  const cart = useAppSelector(state => state.shoppingCartReducer.shoppingCart); 
 
  if (isFetching) {
    return (
      <Layout style={[styles.maxFlex, styles.centerContent]}>
        <Spinner/>
      </Layout>
    );
  }
  
  const renderItemHeader = (
    headerProps: ViewProps | undefined,
    breed: Breed,
  ) => (
    <View {...headerProps}>
      <Text category="h6">{breed.name}</Text>
    </View>
  );

  const renderItemFooter = (
    footerProps: ViewProps | undefined,
    breed: Breed,
  ) => <Text {...footerProps}>{breed.life_span}</Text>;

  const renderItem = ({ item }: ListRenderItemInfo<Product>) => {

    const imageItem = {uri: 'https://www.fillmurray.com/100/100'};

    return(  
      <View style = {styles.item}>
        <View style={styles.temperamentWrapper}>
          <Avatar size="giant" source={imageItem} />
          <Text category="p2" style={styles.temperament}>
            {item.id}
          </Text>
          <Button>Add</Button>
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
   
  return (
    <Layout style={styles.maxFlex}>  
      <TopNavigationHeader backButton={true} title = {'Carrinho de Compras'}/> 
      <View style = {styles.itemContainer}>
        <Text>{`${cart.length} Items selecionados`}</Text>
      </View>
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
