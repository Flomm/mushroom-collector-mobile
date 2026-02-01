import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  shadowWrapper: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: 'white',
    overflow: 'visible'
  }
});
