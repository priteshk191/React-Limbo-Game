import { useEffect, useState } from 'react'
import { BetActions } from './components/BetActions'
import { BetDashboard } from './components/BetDashboard'
import { getBetData } from 'utils/apis/api'
import { useAppContext } from 'utils/context/AppContext'

export function Game() {
  const { updateState } = useAppContext()
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
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

    fetchData()
  }, [])

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="bg-primary md:w-[35%]">
        <BetActions validationError={validationError} />
      </div>
      <div className="m-0 mt-4 w-full rounded-xl border-primary bg-secondary md:relative md:m-5">
        <BetDashboard
          validationError={validationError}
          setValidationError={setValidationError}
        />
      </div>
    </div>
  )
}
