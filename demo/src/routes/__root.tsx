import Footer from ':components/Footer'
import { Outlet, createRootRouteWithContext } from '@tanstack/solid-router'

export const Route = createRootRouteWithContext()({
  component: Root,
})

function Root() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}
