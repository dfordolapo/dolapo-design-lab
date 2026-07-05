import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Cal, { getCalApi } from '@calcom/embed-react'
import TopBar from './TopBar'

export default function BookingPage({ onBack }) {
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
      <TopBar onBack={onBack} title="BOOK A LAB SESSION" hideBookingCTA />
      
      <div className="booking-page__content">
        <div className="booking-page__header">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Before every polished interface, there was a conversation that made it better.<br/>
            This is where your ideas stop living in your head and start becoming products.
          </motion.p>
        </div>
        
        <motion.div 
          className="booking-page__widget"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Cal 
            calLink="dfordolapo/15min"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: 'month_view', theme: 'dark' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
