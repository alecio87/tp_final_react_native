import React from 'react'
import { StyleSheet } from 'react-native'
import { LocationListScreen } from './LocationListScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS, SPACING } from '../../utils/theme'
import { Ionicons } from '@expo/vector-icons'
import { HomeScreen } from '../home/HomeScreen'
import { ProfileScreen } from '../profile/ProfileScreen'
import { RegisterForm } from '../register/RegisterForm'

const Tab = createBottomTabNavigator()

const TAB_ICON = {
  Home: 'home',
  Profile: 'person',
  Search: 'search',
  RegisterForm: 'people'
}

const screenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name]// TAB_ICON[Home]
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: COLORS.red,
    tabBarInactiveTintColor: COLORS.blue,
    headerShown: false,
    tabBarStyle: styles.tabBar

  }
}
export const MainStackScreen = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name='Home' options={{ title: 'Inicio' }} component={HomeScreen} />
      <Tab.Screen name='Search' options={{ title: 'Explorar' }} component={LocationListScreen} />
      <Tab.Screen name='Profile' options={{ title: 'Perfil' }} component={ProfileScreen} />
      <Tab.Screen name='RegisterForm' options={{ title: 'Registrar' }} component={RegisterForm} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    height: SPACING.xxxl,
    paddingBottom: SPACING.xs,
    paddingTop: SPACING.xs
  }
})
