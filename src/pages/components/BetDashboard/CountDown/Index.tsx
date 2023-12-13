import React, { useEffect, useState } from 'react'
import { getBetData } from 'utils/apis/api'
import { INITIAL_TARGET_MUL } from 'utils/common/common'
import { useAppContext } from 'utils/context/AppContext'

interface Props {
  isActive: boolean
  randomNumber: number
}

export const CountDown: React.FC<Props> = ({ isActive, randomNumber }) => {
  const [count, setCount] = useState(randomNumber)
  const { appState, updateState } = useAppContext()
  const { betActions } = appState

  const fetchData = async () => {
    try {
      const data = await getBetData()
      if (data) {
        updateState({ betHistory: data })
      }
    } catch (error) {
      console.error('Error fetching bet data:', error)
    }
  }

  useEffect(() => {
    let interval: any

    if (isActive) {
      interval = setInterval(() => {
        if (count >= randomNumber) {
          clearInterval(interval)
          fetchData()
          return
        }
        setCount(prevCount => prevCount + 0.001)
      }, 5)
    }

    return () => clearInterval(interval)
  }, [isActive, count, randomNumber])

  useEffect(() => {
    if (!isActive || count !== INITIAL_TARGET_MUL) {
      setCount(INITIAL_TARGET_MUL)
    }
  }, [randomNumber])

  const resultColor = isActive
    ? count && count > betActions.targetMultiplier
      ? 'text-green-500'
      : 'text-red-600'
    : 'text-white'

  return (
    <div className={`${resultColor} text-9xl font-bold`}>
      {count.toFixed(2)}x
    </div>
  )
}
