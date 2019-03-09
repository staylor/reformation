import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  shows: {
    height: Dimensions.get('window').height - 250,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  show: {
    marginBottom: 15,
  },
  date: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 13,
    marginVertical: 3,
  },
  venue: {
    fontSize: 11,
    textTransform: 'uppercase',
  },
});

const Show = ({ item }) => {
  const d = new Date(item.date);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return (
    <View key={item.id} style={styles.show}>
      <Text style={styles.date}>{`${m < 10 ? `0${m}` : m}/${
        day < 10 ? `0${day}` : day
      }/${d.getFullYear()}`}</Text>
      <Text style={styles.title}>{item.title || item.artist.name}</Text>
      <Text style={styles.venue}>{item.venue.name}</Text>
    </View>
  );
};
Show.propTypes = {
  item: PropTypes.shape().isRequired,
};

const keyExtractor = item => item.id;

function Shows({ data }) {
  const { loading, shows } = data;

  return loading || !shows ? null : (
    <View style={styles.shows}>
      <Text style={styles.header}>Upcoming Shows</Text>
      <FlatList
        data={shows.edges.map(({ node }) => node)}
        keyExtractor={keyExtractor}
        renderItem={Show}
      />
    </View>
  );
}

Shows.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Shows;
