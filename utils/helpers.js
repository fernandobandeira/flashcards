import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const KEY = 'flashcards:notification'

export function clearLocalNotification () {
  return AsyncStorage.removeItem(KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotifiaction () {
  return {
    title: 'Study!',
    body: "👋 don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotifiaction(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(KEY, JSON.stringify(true))
            }
          })
      }
    })
}
