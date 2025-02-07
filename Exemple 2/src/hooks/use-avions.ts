import { siteConfig } from '@/config/config'
import { CustomResponse, fetcher } from '@/lib/safe-route'
import { Produit, Fournisseur } from '@prisma/client'
import useSWR from 'swr'

export function useAvions(token: string) {
    const { data, error, isLoading } = useSWR<CustomResponse<(Produit & { fournisseurs: Fournisseur[] })[]>>(`${siteConfig.url}/api/avion`, (url: string) => fetcher(url, token))

    return {
        avions: data?.success ? data.data : [],
        avionsError: error,
        isAvionsLoading: isLoading
    }
}