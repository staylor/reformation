import React from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
  },
});

const SocialLink = ({ url, label }) => {
  const onPress = () => {
    Linking.openURL(url);
  };

  return <Button color="#000" onPress={onPress} title={label} />;
};
SocialLink.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

function Footer({ data }) {
  const { socialSettings = {} } = data;

  return (
    <View style={styles.footer}>
      {socialSettings.instagramUsername && (
        <SocialLink
          url={`https://instagram.com/${socialSettings.instagramUsername}`}
          label="Instagram"
        />
      )}
      {socialSettings.twitterUsername && (
        <SocialLink url={`https://twitter.com/${socialSettings.twitterUsername}`} label="Twitter" />
      )}
      {socialSettings.facebookUrl && (
        <SocialLink url={`https://twitter.com/${socialSettings.facebookUrl}`} label="Facebook" />
      )}
    </View>
  );
}

Footer.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Footer;
