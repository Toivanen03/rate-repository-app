import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { data, fonts, colors } from '../theme';
import Text from './Text';

const RepositoryItem = ({ fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl, onPress }) => {

  const count = (value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value);

  return (
    <Pressable onPress={onPress} testID="repositoryItem" style={data.container}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', padding: 15 }}>
        <Image source={{ uri: ownerAvatarUrl }} style={data.avatar} />
        <View style={{ marginLeft: 15, flex: 1 }}>
          <Text style={data.title} color={colors.primary}>{fullName}</Text>
          <Text style={data.description} fontSize={fonts.fontsizes.subheading}>{description}</Text>
          <Text style={data.language}>{language}</Text>
        </View>
      </View>

      <View style={data.statsContainer}>
        <View style={data.stat}>
          <Text style={data.statCount}>{count(stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={data.stat}>
          <Text style={data.statCount}>{count(forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={data.stat}>
          <Text style={data.statCount}>{count(reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={data.stat}>
          <Text style={data.statCount}>{count(ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RepositoryItem;