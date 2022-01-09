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
import { ListRenderItemInfo, View, ViewProps } from 'react-native';
import { Breed, useFetchBreedsQuery } from '../../features/dogs/dogs_api_slice';
import { NavProps, RouteNames } from '../../routes/nav_types';

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
    marginVertical: 4,
  },

  temperamentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  temperament: {
    width: '80%',
    paddingLeft: 8,
  },
});


const StoreItems = () => {
  const styles = useStyleSheet(themedStyles);
  const { data = [], isFetching } = useFetchBreedsQuery(20);
 
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

  const renderItem = ({ item }: ListRenderItemInfo<Breed>) => (
    <Card
      style={styles.item}
      status="basic"
      header={headerProps => renderItemHeader(headerProps, item)}
      footer={footerProps => renderItemFooter(footerProps, item)}
    >
      <View style={styles.temperamentWrapper}>
        <Avatar size="giant" source={{ uri: item.image.url }} />
        <Text category="p2" style={styles.temperament}>
          {item.temperament}
        </Text>
      </View>
    </Card>
  );

  return (
    <Layout style={styles.maxFlex}>  
      <TopNavigationHeader title = {'Produtos'}/> 
      <List
        style={styles.maxFlex}
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
