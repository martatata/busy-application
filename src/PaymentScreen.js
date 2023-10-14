import React from 'react';
import { View, Text, Button } from 'react-native';


export default function PaymentScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Payment Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
    </View>
  );
}