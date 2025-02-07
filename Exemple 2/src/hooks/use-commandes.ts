import { siteConfig } from '@/config/config'
import { CustomResponse, fetcher } from '@/lib/safe-route'
import { AvionAchete } from '@/types/Prisma/Avion'
import { Commande } from '@/types/Prisma/Commande'
import useSWR from 'swr'

export function useCommandes(token: string) {
    const { data, error, isLoading } = useSWR<CustomResponse<(Commande & { avions: AvionAchete[] })[]>>(`${siteConfig.url}/api/commande`, (url: string) => fetcher(url, token))

    return {
        commandes: data?.success ? data.data : [],
        commandesError: error,
        isCommandesLoading: isLoading
    }
}