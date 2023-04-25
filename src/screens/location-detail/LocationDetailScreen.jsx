import React, { useContext } from 'react'
import { View, ScrollView, Image, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { styles } from './LocationDetailScreen.styles'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { COLORS } from '../../utils/theme'
import { Link } from '@react-navigation/native'
import { UserContext } from '../../contexts/UserContext'

export const LocationDetailScreen = ({ route }) => {
  const { item } = route.params
  const { currentUser } = useContext(UserContext)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <ScrollView horizontal pagingEnabled style={styles.imageContainer}>
          {item.images.map((image, idx) => (
            <Image
              key={idx}
              source={{ uri: `https://drive.google.com/uc?id=${image}` }}
              style={styles.image}
              resizeMode='cover'
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name='md-map' size={30} color={COLORS.blue} />
          <Text style={styles.rating}>{item.location}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name='md-card-outline' size={20} color={COLORS.blue} />
          <Text style={styles.rating}>{item.price}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name='md-star' size={20} color={COLORS.blue} />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        {currentUser && (<Link style={styles.webButton} to={{ screen: 'LocationDetailWeb', params: { url: item.url } }}><FontAwesome name="globe" size={18} color={COLORS.white} /><Text style={styles.webButtonText}>Ir a la web</Text></Link>)}<Text style={styles.description}>{item.description}</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: item.locationCoordinates.latitude,
          longitude: item.locationCoordinates.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002
        }}
      >
        <Marker
          coordinate={{
            latitude: item.locationCoordinates.latitude,
            longitude: item.locationCoordinates.longitude
          }}
          title={item.title}
        />
      </MapView>
    </ScrollView>
  )
}
