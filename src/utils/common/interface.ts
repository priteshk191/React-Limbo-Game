
export interface BetActionsState {
    id?: string
    date?: string
    isManual: boolean;
    betAmount: number;
    totalProfit: number;
    randomNumber: number
    targetMultiplier: number
    winningChances?: number;
}
export interface AppState {
    betActions: BetActionsState
    betHistory: BetData[]
    isActive: boolean
}

export interface BetData {
    randomNumber: number;
    betAmount: number;
    targetMultiplier: number;
    date: string;
    id: string
}

export interface betReqPayload {
    randomNumber: number;
    betAmount: number;
    targetMultiplier: number;
    date: string
}