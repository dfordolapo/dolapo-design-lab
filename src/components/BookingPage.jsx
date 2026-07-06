import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Cal, { getCalApi } from '@calcom/embed-react'
import TopBar from './TopBar'
import usePageSEO from '../hooks/usePageSEO'

export default function BookingPage({ onBack }) {
  usePageSEO({
    title: 'Book a Session',
    description: 'Schedule a 1-on-1 call with Dolapo to discuss design, prototyping, or product building.'
  })

  useEffect(() => {
    (async function () {
      const cal = await getCalApi()
      cal("ui", {
        theme: "dark",
        styles: { 
          branding: { brandColor: "#e879f9" } // using the glow pink color 
        }, 
        hideEventTypeDetails: false, 
        layout: "month_view" 
      })
    })()
  }, [])

  return (
    <motion.div 
      className="booking-page screen-wrapper"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <TopBar onBack={onBack} title="BOOK A SESSION" hideBookingCTA />
      
      <div className="booking-page__content">
        <motion.div 
          className="booking-page__widget"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ pointerEvents: 'auto', touchAction: 'auto' }}
        >
          <Cal 
            calLink="dfordolapo/15min"
            style={{ width: "100%" }}
            config={{ layout: 'month_view', theme: 'dark' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
