import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { useFonts } from 'expo-font'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
    BaiJamjuree_700Bold,
  })

  if (hasLoadedFonts === false) {
    return null
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="font-title text-5xl text-gray-50">Hello World</Text>
      <StatusBar style="light" translucent />
    </View>
  )
}
