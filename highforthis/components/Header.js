import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 20,
    letterSpacing: 0.5,
  },
});

function Header({ data }) {
  const { loading, settings = {} } = data;

  return (
    <View style={styles.header}>
      <Text style={styles.title}>High for This</Text>
      <Text style={styles.tagline}>{loading ? 'Loading...' : settings.tagline}</Text>
    </View>
  );
}

Header.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Header;
