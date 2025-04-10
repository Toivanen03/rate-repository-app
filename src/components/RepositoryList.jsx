import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import {Picker} from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { menuStyle, colors } from '../theme';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const sortOptions = {
  latest: { orderBy: 'CREATED_AT', direction: 'DESC' },
  oldest: { orderBy: 'CREATED_AT', direction: 'ASC' },
  highest: { orderBy: 'RATING_AVERAGE', direction: 'DESC' },
  lowest: { orderBy: 'RATING_AVERAGE', direction: 'ASC' },
};

const Menu = ({ selectedSort, setSelectedSort, search, setSearch }) => {

  return (
    <>
      <View style={menuStyle.searchBarStyle}>
        <Searchbar
          placeholder="Search repository"
          onChangeText={setSearch}
          value={search}
          mode='view'
          showDivider={true}
          style={{ backgroundColor: colors.white }}
        />
      </View>
      <View style={menuStyle.sortStyle}>
        <Text style={menuStyle.text}>Sort by</Text>
        <View style={menuStyle.menu}>
          <Picker
            selectedValue={selectedSort}
            onValueChange={(value) => setSelectedSort(value)}
            >
            <Picker.Item label="Latest repo's" value="latest" />
            <Picker.Item label="Oldest repo's" value="oldest" />
            <Picker.Item label="Highest rated repo's" value="highest" />
            <Picker.Item label="Lowest rated repo's" value="lowest" />
          </Picker>  
        </View>
      </View>
    </>
  )
}

export const RepositoryListContainer = ({ repositories, onEndReach, selectedSort, setSelectedSort, search, setSearch }) => {
  const navigate = useNavigate();
  const ItemSeparator = () => <View style={styles.separator} />;
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      ListHeaderComponent={        
      <Menu
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        search={search}
        setSearch={setSearch}
      />}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem {...item} onPress={() => navigate(`/${item.id}`)} />}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState('latest');
  const { orderBy, direction } = sortOptions[selectedSort];
  const [search, setSearch] = useState('');
  const [query] = useDebounce(search, 500);
  const { repositories, loading, error, fetchMore } = useRepositories(orderBy, direction, query, {first: 5});

    if (loading) {
    return <Text>Loading...</Text>;
  };

  if (error) {
    return <Text>Error: {error.message}</Text>;
  };

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer 
      repositories={repositories}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
      search={search}
      setSearch={setSearch}
      onEndReach={onEndReach}
    />
  )
};

export default RepositoryList;