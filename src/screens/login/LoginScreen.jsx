import React, { useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from './LoginScreen.styles'
import { useForm, Controller } from 'react-hook-form'
import { getUsers } from '../../api/user.service'
import { UserContext } from '../../contexts/UserContext'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'


export const LoginScreen = () => {
  const navigation = useNavigation()
  const { setCurrentUser } = useContext(UserContext)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const handleLogin = ({ username, password }) => {
    getUsers()
      .then(users => {
        const user = users.find(user => user.username === username && user.password === password)
        if (user) {
          setCurrentUser(user)
          navigation.navigate('Home')
        } else {
          console.log('Usuario no encontrado')
        }
      })
      .catch(err => console.warn(err))
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSubmit(handleLogin)}>
          <LinearGradient
            colors={['#CE3197','#0951B6','#0983B6','#13BDC3']}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.gradient}>
            <Text style={styles.buttonText}>INGRESAR</Text>
          </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('SignUp')}>
    <Text style={styles.linkText}>¿No tienes una cuenta? Regístrate aquí</Text>
  </TouchableOpacity>
    </View>
  )
}
