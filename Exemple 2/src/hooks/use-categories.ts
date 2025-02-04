import { siteConfig } from '@/config/config'
import { CustomResponse } from '@/lib/safe-route'
import { Avion } from '@/types/Prisma/Avion'
import useSWR from 'swr'

export function useCategories() {
    const { data, error, isLoading } = useSWR<CustomResponse<Avion[]>>(`${siteConfig.url}/api/categorie`)

    return {
        categories: data?.success ? data.data : [],
        error,
        isLoading
    }
}