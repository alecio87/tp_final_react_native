import React from 'react'
import { ImageBackground, SafeAreaView, Text } from 'react-native'
import { styles } from './HomeScreen.styles'

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.bgImage} source={{ uri: https://drive.google.com/file/d/18Np38YPjMAwEfUJiz7UrBZ8AoafigTIP/view?usp=sharing }}>
        <Text style={styles.title}>
          dale la vuelta a Jujuy 
        </Text>
      </ImageBackground>
    </SafeAreaView>
  )
}
