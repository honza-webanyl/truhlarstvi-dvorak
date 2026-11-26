import { Configurator } from './components/Configurator'
import { FloatingBadge } from './components/FloatingBadge'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Materials } from './components/Materials'
import { Process } from './components/Process'
import { Showroom } from './components/Showroom'

export default function App() {
  return (
    <>
      <Header />
      <main id="obsah">
        <Hero />
        <Showroom />
        <Materials />
        <Process />
        <Configurator />
      </main>
      <Footer />
      <FloatingBadge />
    </>
  )
}
