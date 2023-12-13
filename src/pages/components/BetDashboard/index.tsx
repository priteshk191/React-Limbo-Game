import React, { useState } from 'react'
import BetDetailsModel from './Model'
import { useAppContext } from 'utils/context/AppContext'
import { BetData } from 'utils/common/interface'
import { INITIAL_TARGET_MUL } from 'utils/common/common'
import { CountDown } from './CountDown/Index'

interface Props {
  validationError: string | null
  setValidationError: (error: string | null) => void
}

export const BetDashboard: React.FC<Props> = ({
  validationError,
  setValidationError
}) => {
  const { appState, updateState } = useAppContext()
  const { betActions, betHistory, isActive } = appState
  const latestBetHistory = betHistory.slice().reverse().slice(0, 4)

  const [modelIsOpen, setModelIsOpen] = useState(false)
  const [selectedBetData, setselectedBetData] = useState<BetData>()

  const handleModelToggle = (selectedData: BetData) => {
    setModelIsOpen(!modelIsOpen)
    setselectedBetData(selectedData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const parsedValue = parseFloat(value)

    const validateTargetMultiplier = () => {
      if (value === '') {
        return 'Cannot be empty'
      } else if (parsedValue < INITIAL_TARGET_MUL) {
        return `Must be at least ${INITIAL_TARGET_MUL}`
      } else if (parsedValue > 5) {
        return 'Must be less than 5'
      } else {
        return null
      }
    }
    if (name === 'targetMultiplier') {
      setValidationError(validateTargetMultiplier())
    }

    const updatedValue = isNaN(parsedValue) ? '' : parsedValue

    updateState({
      betActions: {
        ...appState.betActions,
        randomNumber: INITIAL_TARGET_MUL,
        [name]: updatedValue
      },
      isActive: false
    })
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <div className="container flex justify-end gap-5 pr-20 pt-6">
          {latestBetHistory.reverse().map((item, index) => (
            <span
              key={index}
              onClick={() => handleModelToggle(item)}
              className={`flex cursor-pointer justify-center rounded ${
                item.randomNumber > item.targetMultiplier
                  ? 'bg-green-500'
                  : 'bg-red-500'
              } lg:text  px-2 text-base text-white md:text-lg`}
            >
              {`${item.randomNumber}X`}
            </span>
          ))}
          <input
            type="checkbox"
            id="tw-modal"
            className="peer fixed appearance-none opacity-0"
          />
        </div>
      </div>
      <div className="flex h-[60%] w-full items-center justify-center align-middle">
        <CountDown
          isActive={isActive}
          randomNumber={betActions?.randomNumber}
        />
      </div>

      <div className="m-auto flex w-full flex-col gap-8 rounded-xl bg-primary p-10 md:w-[60%] md:flex-row">
        <div className="w-full md:w-1/2">
          <label htmlFor="targetMultiplier" className="text-white">
            Target Multiplier
          </label>
          <input
            type="number"
            step="0.00000001"
            id="targetMultiplier"
            name="targetMultiplier"
            value={betActions.targetMultiplier}
            onChange={handleInputChange}
            className={`mt-3 w-full rounded-md bg-secondary p-2 text-white focus:outline-none ${
              validationError ? 'border-red-500' : ''
            }`}
          />
          {validationError && (
            <span className="'mt-1 text-red-500">{validationError}</span>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <label htmlFor="winningChances" className=" text-white">
            Winning Chances
          </label>
          <input
            type="number"
            id="winningChances"
            step="0.00000001"
            name="winningChances"
            value={betActions.winningChances}
            onChange={handleInputChange}
            className="mt-3 w-full rounded-md bg-secondary p-2 text-white  focus:outline-none"
          />
        </div>
      </div>
      {selectedBetData && (
        <BetDetailsModel
          isOpen={modelIsOpen}
          onClose={() => setModelIsOpen(!modelIsOpen)}
          selectedBetData={selectedBetData}
        />
      )}
    </>
  )
}
