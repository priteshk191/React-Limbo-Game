import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between bg-background">
      <div className="flex h-full w-full flex-1 overflow-auto overflow-x-hidden">
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
