import React from 'react'
import { formatDateString, formatNumber } from 'utils/common/common'
import { BetData } from 'utils/common/interface'
interface BetDetailsModelProps {
  isOpen: boolean
  onClose: () => void
  selectedBetData: BetData
}

function BetDetailsModel({
  isOpen,
  onClose,
  selectedBetData
}: BetDetailsModelProps) {
  if (!isOpen) {
    return null
  }
  const total =
    (selectedBetData?.betAmount ?? 0) * (selectedBetData?.targetMultiplier ?? 0)

  const formattedDate =
    selectedBetData && formatDateString(selectedBetData.date)

  return (
    <div className=" absolute inset-0 z-50 flex items-center justify-center rounded-xl backdrop-blur">
      <div className="w-full rounded-xl bg-primary p-10 md:w-[50%]">
        <div className="mb-4 flex justify-between text-2xl font-semibold text-white">
          <h4>Bet</h4>
          <button onClick={onClose}>×</button>
        </div>
        <div className="text-center text-white">
          <h4 className="text-2xl font-semibold">Limbo</h4>
          <span>ID {selectedBetData?.id}</span>
          <p className="mt-1 text-gray-500">Placed by: You</p>
          <p className="mt-1 text-gray-500">on {formattedDate}</p>

          <h1 className=" justify-center py-3 text-4xl font-bold">Shergames</h1>
          <div className="flex w-full gap-4 bg-secondary p-3">
            <div className="w-full border-r-4 border-white pr-3">
              <h3 className="font-semibold">Bet</h3>
              <span>{formatNumber(selectedBetData?.betAmount)}</span>
            </div>
            <div className="w-full border-r-4 border-white pr-3">
              <p className="font-semibold">Multiplier</p>
              <span>{formatNumber(selectedBetData?.targetMultiplier)}x</span>
            </div>
            <div className="w-full">
              <p className="font-semibold">Payout</p>
              {selectedBetData.randomNumber >
              selectedBetData.targetMultiplier ? (
                <span className="text-green-500"> {formatNumber(total)}</span>
              ) : (
                0
              )}
            </div>
          </div>
          <h3 className="pt-2 font-semibold">Target</h3>
          <span>{formatNumber(selectedBetData?.targetMultiplier)}x</span>
          <h3 className="py-2 font-semibold">Result</h3>
          <p>{formatNumber(selectedBetData?.randomNumber)}X</p>
          <div className="py-4">
            <button
              className="rounded-lg bg-secondary p-2 text-white"
              onClick={onClose}
            >
              Play Limbo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BetDetailsModel
