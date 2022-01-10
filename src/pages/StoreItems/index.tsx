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
import { FlatList, ListRenderItemInfo, View, ViewProps } from 'react-native'; 
import { useFetchBreedsQuery } from '../../features/dogs/dogs_api_slice';
import { NavProps, RouteNames } from '../../routes/nav_types';
import shoppingActions from 'store/shoppingCart/actions';
import { Breed } from 'types/interfaces';
import { useDispatch } from 'react-redux';

const themedStyles = StyleService.create({
  btn: { margin: 16 },

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
    marginVertical: 16,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  temperamentWrapper: {
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    flexWrap: 'wrap',
  },

  temperament: {
    // width: '80%',
    // paddingLeft: 8,
    marginTop: 8,
    fontWeight: 'bold',
  },
});


const StoreItems = () => {
  const styles = useStyleSheet(themedStyles);
  const { data = [], isFetching } = useFetchBreedsQuery(20);
  // console.log(JSON.stringify(useFetchBreedsQuery(10)));
  if (isFetching) {
    return (
      <Layout style={[styles.maxFlex, styles.centerContent]}>
        <Spinner/>
      </Layout>
    );
  }
  const dispatch = useDispatch()
  
  const renderItemHeader = (
    headerProps: ViewProps | undefined,
    breed: Breed,
  ) => (
    <View {...headerProps}>
      <Text category="h6">{breed.name}</Text>
    </View>
  );

  // const renderItemFooter = (
  //   footerProps: ViewProps | undefined,
  //   breed: Breed,
  // // ) => <Text {...footerProps}>{breed.life_span}</Text>;
  // ) => <Button status = {'success'} style = {styles.btn}>Add</Button>;

  const renderItem = ({ item }: ListRenderItemInfo<Breed>) => (
    // <Card
    //   style={styles.item}
    //   status="basic"
    //   // header={headerProps => renderItemHeader(headerProps, item)}
    //   footer={footerProps => renderItemFooter(footerProps, item)}
    // >
    //   <View style={styles.temperamentWrapper}>
    //     <Avatar size="giant" shape='rounded' style = {{width: 96, height: 96}} source={{ uri: item.image.url }} />
    //     <Text category="s1" style={styles.temperament}>
    //       {item.name}
    //     </Text>
    //   </View>
    // </Card>
    <View
      style={styles.item}
      // status="basic"
      // header={headerProps => renderItemHeader(headerProps, item)}
      // footer={footerProps => renderItemFooter(footerProps, item)}
    >
      <View style={styles.temperamentWrapper}>
        <Avatar size="giant" shape='rounded' style = {{width: 96, height: 96}} source={{ uri: item.image.url }} />
        <Text category="s1" style={styles.temperament}>
          {item.name}
        </Text>
      <Button status = {'success'} style = {styles.btn} onPress={() => dispatch(shoppingActions.addProductToCart(item.id))}>Add</Button>
      </View>
    </View>
  );

  return (
    <Layout style={styles.maxFlex}>  
      <TopNavigationHeader title = {'Produtos'}/> 
      <FlatList
        style={styles.maxFlex}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderItem={renderItem}
      /> 
    </Layout>
  );
};

// Do this so that sentry can track the name of component names even if the code is minified
// You can also ask metro config to not minify function names but that can increase the file size
StoreItems.displayName = RouteNames.StoreItems;

export default StoreItems;
