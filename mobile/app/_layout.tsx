import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { styled } from 'nativewind'
import { ImageBackground } from 'react-native'

import blurBgImg from '../src/shared/assets/bg-blur.png'
import Stripes from '../src/shared/assets/stripes.svg'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [hasLoadedFonts] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
    BaiJamjuree_700Bold,
  })

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
      <StatusBar style="light" translucent />
      <StyledStripes className="absolute left-2" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
    </ImageBackground>
  )
}
