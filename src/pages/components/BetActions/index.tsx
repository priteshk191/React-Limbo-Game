import React from 'react'
import { placeBet } from 'utils/apis/api'
import { generateRandom } from 'utils/common/common'
import { betReqPayload } from 'utils/common/interface'
import { useAppContext } from 'utils/context/AppContext'

interface Props {
  validationError: string | null
}

export const BetActions: React.FC<Props> = ({ validationError }) => {
  const { appState, updateState } = useAppContext()
  const { betActions } = appState

  const updateFormState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    updateState({
      betActions: {
        ...betActions,
        [name]: (value && parseFloat(value)) || 0
      }
    })
  }

  const toggleManualAuto = (isManual: boolean) => {
    updateState({
      betActions: {
        ...betActions,
        isManual
      }
    })
  }

  const handleBetClick = async () => {
    if (betActions.isManual) {
      const num = generateRandom()
      const betData: betReqPayload = {
        randomNumber: num,
        betAmount: betActions.betAmount,
        targetMultiplier: betActions.targetMultiplier,
        date: new Date().toISOString()
      }

      updateState({
        betActions: { ...betActions, randomNumber: num },
        isActive: true
      })

      await placeBet(betData, updateState)
    }
  }

  return (
    <div className="relative w-full px-4 py-8 md:w-1/2 lg:w-full">
      <div className="flex h-full flex-col gap-4 rounded-md bg-primary p-4 text-text md:justify-between">
        <div className="flex w-full items-center justify-between rounded-md bg-secondary">
          <button
            className={`w-1/2 p-4 ${
              betActions.isManual ? 'rounded-md bg-green-500' : ''
            }`}
            onClick={() => toggleManualAuto(true)}
          >
            Manual
          </button>
          <button
            className={`w-1/2 p-4 ${
              !betActions.isManual ? 'rounded-md bg-green-500' : ''
            }`}
            onClick={() => toggleManualAuto(false)}
          >
            Auto
          </button>
        </div>

        {appState.betActions.isManual && (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-stretch gap-1 md:flex-col">
                <div className="w-full text-sm font-bold md:text-base">
                  <div className="flex flex-1 items-stretch justify-between">
                    <span>Bet Amount</span>
                    <span> $ {betActions.betAmount ?? 0.0}</span>
                  </div>
                  <div className="flex items-stretch justify-center shadow-md">
                    <input
                      type="number"
                      required
                      name="betAmount"
                      step="0.00000001"
                      value={betActions.betAmount}
                      placeholder="0.00000000"
                      onChange={updateFormState}
                      className="w-full rounded-bl-md rounded-tl-md border-2 border-secondary bg-background p-2.5 px-4 font-bold transition-colors placeholder:font-bold placeholder:text-text focus:outline-none md:p-2"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-row items-stretch gap-1 md:flex-col">
                <div className="w-full text-sm font-bold md:text-base">
                  <div className="flex flex-1 items-stretch justify-between">
                    <span>Total Profit</span>
                    <span> $ {betActions.totalProfit ?? 0.0}</span>
                  </div>
                  <div className="flex items-stretch justify-center shadow-md">
                    <input
                      type="number"
                      required
                      name="totalProfit"
                      step="0.00000001"
                      placeholder="0.00000000"
                      value={betActions.totalProfit}
                      onChange={updateFormState}
                      className="w-full rounded-bl-md rounded-tl-md border-2 border-secondary bg-background p-2.5 px-4 font-bold transition-colors placeholder:font-bold placeholder:text-text focus:outline-none md:p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              disabled={!!validationError}
              onClick={handleBetClick}
              className="rounded-md bg-green-500 px-6 py-5 font-bold leading-none text-background transition-colors hover:bg-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1 focus:ring-offset-primary"
            >
              Bet
            </button>
          </>
        )}
      </div>
    </div>
  )
}
