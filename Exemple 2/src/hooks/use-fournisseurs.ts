import { siteConfig } from '@/config/config'
import { CustomResponse } from '@/lib/safe-route'
import { Fournisseur } from '@/types/Prisma/Fournisseur'
import useSWR from 'swr'

export function useFournisseurs() {
    const { data, error, isLoading } = useSWR<CustomResponse<Fournisseur[]>>(`${siteConfig.url}/api/fournisseur`)

    return {
        fournisseurs: data?.success ? data.data : [],
        error,
        isLoading
    }
}