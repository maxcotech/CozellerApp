import { WalletLockStatuses } from "../enum.config"

export interface WalletRecord {
        id: number,
        store_id: number,
        previous_row_hash: string | null,
        next_row_hash: null | string,
        amount: number,
        sender_id: number | null,
        sender_type: string | null,
        ledger_type: number,
        transaction_type: string,
        transaction_id: number,
        created_at: string,
        updated_at: string,
        sender_type_text: string | null,
        sender_email: string | null,
        ledger_type_text: string,
        transaction_type_text: string,
        lock: WalletLock | null
}

export interface WalletLock {
    id: number,
    status: WalletLockStatuses,
    wallet_fund_id: number,
    status_text: string
}