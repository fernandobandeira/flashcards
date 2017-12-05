import React from 'react'
import { Text, TouchableOpacity, TouchableNativeFeedback, Platform, View } from 'react-native'

export default function Button ({ children, onPress, style }) {
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        {children}
      </TouchableOpacity>
    )
  }

  return (
    <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={style}>
        {children}
      </View>
    </TouchableNativeFeedback>
  )
}
