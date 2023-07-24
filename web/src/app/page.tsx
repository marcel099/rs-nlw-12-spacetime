import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

import { EmptyMemories } from '@/components/EmptyMemories'
import { auth } from '@/config/auth'
import { api } from '@/services/api'
import { isUserAuthenticated } from '@/utils/auth'

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

dayjs.locale(ptBr)

export default async function Home() {
  const isAuthenticated = isUserAuthenticated()

  if (isAuthenticated === false) {
    return <EmptyMemories />
  }

  const token = cookies().get(auth.cookie_name)?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
          </time>
          <Image
            src={memory.coverUrl}
            unoptimized
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
            alt=""
          />
          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>

          <a
            href={`/memories/${memory.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            Ler mais
            <ArrowLeft className="h-4 w-4" />
          </a>
        </div>
      ))}
    </div>
  )
}
