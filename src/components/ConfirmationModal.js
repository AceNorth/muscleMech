import React from 'react';
import { View, Modal } from 'react-native';
import { CardSection } from './common/CardSection';
import { Button } from './common/Button';

const ConfirmationModal = ({ children, visible, onAccept, buttonText, onRequestClose}) => {
  const { containerStyle, cardSectionStyle } = styles;

  return (
    <Modal
      style={{display: 'flex'}}
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          {children}
        </CardSection>

        <CardSection>
          <Button onPress={onAccept}>{buttonText}</Button>
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerStyle: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    justifyContent: 'center'
  }
};

export { ConfirmationModal  };