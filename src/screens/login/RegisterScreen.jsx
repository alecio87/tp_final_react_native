import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from './RegisterScreen.styles'

export default function RegisterScreen() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = () => {
    fetch('https://644597500431e885f000c153.mockapi.io/users', {
      
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // Guardar el token de autenticación en AsyncStorage
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>      
      <TextInput style={styles.input} placeholder='Nombre de usuario' value={name} onChangeText={setName} />      
      <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleRegister} >
          <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

    </View>
  )
}