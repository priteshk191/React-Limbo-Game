import React, { createContext, useContext, useState, ReactNode } from 'react'
import { INITIAL_TARGET_MUL } from 'utils/common/common'
import { AppState } from 'utils/common/interface'

interface AppProviderProps {
  children: ReactNode
}

interface AppContextType {
  appState: AppState
  updateState: (
    newState: Partial<AppState> | ((prevState: AppState) => Partial<AppState>)
  ) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: AppProviderProps) {
  const [appState, setAppState] = useState<AppState>({
    betActions: {
      isManual: true,
      betAmount: 0,
      totalProfit: 0,
      targetMultiplier: INITIAL_TARGET_MUL,
      winningChances: 0,
      randomNumber: INITIAL_TARGET_MUL
    },
    betHistory: [],
    isActive: false
  })

  const updateState = (
    newState: Partial<AppState> | ((prevState: AppState) => Partial<AppState>)
  ) => {
    setAppState(prevState => ({
      ...prevState,
      ...(typeof newState === 'function' ? newState(prevState) : newState)
    }))
  }

  return (
    <AppContext.Provider value={{ appState, updateState }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
