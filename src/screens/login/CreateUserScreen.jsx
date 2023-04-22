import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { styles } from './CreateUserScreen.styles'
import { createUser } from '../../api/user.service'

export const CreateUserScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const handleCreateUser = ({ username, password }) => {
    createUser({ username, password })
      .then(response => {
        console.log('User created:', response)
      })
      .catch(err => console.warn(err))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Usuario</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSubmit(handleCreateUser)}>
        <Text style={styles.buttonText}>Crear Usuario</Text>
      </TouchableOpacity>
    </View>
  )
}
