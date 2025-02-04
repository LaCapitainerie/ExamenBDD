import { siteConfig } from '@/config/config'
import { CustomResponse } from '@/lib/safe-route'
import { Avion } from '@/types/Prisma/Avion'
import useSWR from 'swr'

export function useAvions() {
    const { data, error, isLoading } = useSWR<CustomResponse<Avion[]>>(`${siteConfig.url}/api/avion`)

    return {
        avions: data?.success ? data.data : [],
        error,
        isLoading
    }
}