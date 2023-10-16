import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

const Test = () => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const shakeAnimation = new Animated.Value(0);

  const handleValidation = () => {
    // Adicione a lógica de validação conforme necessário.
    if (text === 'Texto válido') {
      setIsFocused(false); // Defina isFocused como falso quando o texto for válido
    } else {
      // Iniciar a animação de tremor
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 100,
          easing: Easing.linear,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 100,
          easing: Easing.linear,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 100,
          easing: Easing.linear,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
        }),
      ]).start();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    shakeAnimation.setValue(0);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.inputContainer,
          isFocused ? styles.focusedInputContainer : styles.defaultInputContainer,
          {
            transform: [
              {
                translateX: shakeAnimation,
              },
            ],
          },
        ]}
      >
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Digite aqui"
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
        />
      </Animated.View>
      <TouchableOpacity onPress={handleValidation} style={styles.button}>
        <Text>Validar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
    borderColor: 'gray',
  },
  defaultInputContainer: {
    borderColor: 'gray',
  },
  focusedInputContainer: {
    borderColor: 'blue', // Defina a cor da borda quando o campo está focado
  },
  input: {
    width: '100%',
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default Test;
