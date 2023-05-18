import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { useFonts } from 'expo-font'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { styled } from 'nativewind'
import * as SecureStore from 'expo-secure-store'

import blurBgImg from '../src/shared/assets/bg-blur.png'
import Stripes from '../src/shared/assets/stripes.svg'
import NlwSpacetimeLogo from '../src/shared/assets/nlw-spacetime-logo.svg'
import { api } from '../src/shared/services/axios'
import { SIGNED_IN_USER_TOKEN } from '../src/shared/configs/secureStorage'

const StyledStripes = styled(Stripes)

// const { GITHUB_CLIENT_ID } = '@env'
// const { GITHUB_CLIENT_ID } = process.env

const GITHUB_CLIENT_ID = 'lorem_ipsum'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${GITHUB_CLIENT_ID}`,
}

export default function App() {
  const router = useRouter()

  const [hasLoadedFonts] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
    BaiJamjuree_700Bold,
  })

  const [request, response, signInWithGitHub] = useAuthRequest(
    {
      clientId: GITHUB_CLIENT_ID,
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'spacetime',
      }),
    },
    discovery,
  )

  async function handleGitHubOAuthCode(code: string) {
    const response = await api.post('/register', { code })

    const { token } = response.data

    await SecureStore.setItemAsync(SIGNED_IN_USER_TOKEN, token)

    router.push('memories')
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params

      handleGitHubOAuthCode(code)
    }
  }, [response])

  if (hasLoadedFonts === false) {
    return null
  }

  return (
    <ImageBackground
      source={blurBgImg}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <StatusBar style="light" translucent />
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <NlwSpacetimeLogo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          disabled={!request}
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signInWithGitHub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </ImageBackground>
  )
}
