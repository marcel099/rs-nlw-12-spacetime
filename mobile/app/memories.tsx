import Icon from '@expo/vector-icons/Feather'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { Link, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import NlwSpacetimeLogo from '../src/shared/assets/nlw-spacetime-logo.svg'
import { Memory } from '../src/shared/dtos/Memory'
import { SIGNED_IN_USER_TOKEN } from '../src/shared/configs/secureStorage'
import { api } from '../src/shared/services/axios'

dayjs.locale(ptBr)

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  const [memories, setMemories] = useState<Memory[]>([])

  async function fetchMemories() {
    try {
      const token = await SecureStore.getItemAsync(SIGNED_IN_USER_TOKEN)

      const response = await api.get('/memories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setMemories(response.data)
    } catch (error) {
      Alert.alert('Erro ao buscar memórias')
    }
  }

  useEffect(() => {
    fetchMemories()
  }, [])

  async function signOut() {
    try {
      await SecureStore.deleteItemAsync(SIGNED_IN_USER_TOKEN)

      router.push('/')
    } catch (error) {
      Alert.alert('Falha ao tentar sair')
    }
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom + 48, paddingTop: top }}
    >
      <View className="flex-row items-center justify-between px-8">
        <NlwSpacetimeLogo />

        <View className="flex-row gap-2">
          <Link href="/memories" asChild>
            <TouchableOpacity
              onPress={signOut}
              className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
            >
              <Icon name="log-out" size={16} color="#000" />
            </TouchableOpacity>
          </Link>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      <View className="mt-6 space-y-10">
        {memories.map((memory) => (
          <View key={memory.id} className="space-y-4">
            <View className="flex-row items-center gap-2">
              <View className="h-px w-5 bg-gray-50" />
              <Text className="font-body text-xs text-gray-100">
                {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
              </Text>
            </View>
            <View className="space-y-4 px-8">
              <Image
                source={{
                  uri: memory.coverUrl,
                }}
                className="aspect-video w-full rounded-lg"
                alt=""
              />
              <Text className="font-body text-base leading-relaxed text-gray-100">
                {memory.excerpt}
              </Text>
              {/* <Link href="/memories/id" asChild> */}
              <TouchableOpacity className="flex-row items-center gap-2">
                <Text className="font-body text-sm text-gray-200">
                  Ler mais
                </Text>
                <Icon name="arrow-right" size={16} color="#9e9ea0" />
              </TouchableOpacity>
              {/* </Link> */}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
