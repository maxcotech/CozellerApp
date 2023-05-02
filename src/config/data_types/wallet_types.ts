import { LedgerTypes, WalletLockStatuses } from "../enum.config"
import { PaginatedData, PaginationParams } from "./general.types"

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

export interface WalletParams extends PaginationParams {
    store_id: number,
    start_date: string ,
    in_range: string,
    end_date: string,
    ledger_type: LedgerTypes
}

export interface WalletViewData extends PaginatedData<WalletRecord[]> {
    total_balance: number,
    locked_credits: number,
    unlocked_credits: number,
    total_debits: number,
    pending_requests: number,
    current_page: number,
}