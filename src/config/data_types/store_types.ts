import { ResourceStatuses } from "../enum.config"

export interface Store {
    id: number,
    owner_id: number,
    store_name: string,
    store_logo: string | null,
    store_slug: string,
    country_id: number,
    store_address: string | null,
    store_email: string,
    store_telephone: string,
    store_status: ResourceStatuses,
    state: string | null,
    city: string | null,
    store_status_text: string
}

