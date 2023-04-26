import React, { useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from './RegisterForm.styles'
import { useForm, Controller } from 'react-hook-form'
import { UserContext } from '../../contexts/UserContext'
import { useNavigation } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
import { addUser } from '../../api/user.service'

export const RegisterForm = () => {
  const navigation = useNavigation()
  const { setCurrentUser } = useContext(UserContext)
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const handleRegistration = async ({ username, password }) => {
    try {
      const newUser = await addUser({ username, password })
      setCurrentUser(newUser)
      navigation.navigate('Home')
      reset() // Limpiar los campos después de registrarse
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder='Nombre de usuario'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize='none'
          />
        )}
        name='username'
        rules={{ required: 'El nombre de usuario es requerido' }}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder='Contraseña'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
        name='password'
        rules={{ required: 'La constraseña es requerida' }}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}      
      <TouchableOpacity style={styles.button} onPress={handleSubmit(handleRegistration)}><Text style={styles.buttonText}><Entypo name="user" size={24} color="white"/>Registrarse</Text></TouchableOpacity>
    </View>
  )
}