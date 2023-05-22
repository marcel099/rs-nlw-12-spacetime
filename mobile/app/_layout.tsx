import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { useFonts } from 'expo-font'
import * as SecureStore from 'expo-secure-store'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { styled } from 'nativewind'
import { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'

import blurBgImg from '../src/shared/assets/bg-blur.png'
import Stripes from '../src/shared/assets/stripes.svg'
import { SIGNED_IN_USER_TOKEN } from '../src/shared/configs/secureStorage'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    boolean | null
  >(null)
  const [hasLoadedFonts] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync(SIGNED_IN_USER_TOKEN).then((token) => {
      setIsUserAuthenticated(!!token)
    })
  }, [])

  if (hasLoadedFonts === false) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBgImg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <StatusBar style="light" backgroundColor="#121215" translucent />
      <StyledStripes className="absolute left-2" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  )
}
