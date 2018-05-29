import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, disabled, style }) => {
  const { buttonStyle, textStyle, disabledStyle, disabledText } = styles;

  if (disabled) {
    return (
      <View style={disabledStyle}>
        <Text style={disabledText}>
          {children}
        </Text>
      </View>
      )
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
        <Text style={textStyle}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8
  },
  disabledText: {
    alignSelf: 'center',
    color: '#a3a3a3',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#000',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 5,
    marginRight: 5
  },
  disabledStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#a3a3a3',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
