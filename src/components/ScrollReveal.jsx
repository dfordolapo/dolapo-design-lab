import { motion } from 'framer-motion'

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 60, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  stagger: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  },
}

export default function ScrollReveal({ children, variant = 'fadeUp', delay = 0, duration = 0.6, className, style, once = true, amount = 0.15 }) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={variants[variant] || variants.fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className, delay = 0, once = true, amount = 0.15 }) {
  return (
    <motion.div
      className={className}
      variants={variants.stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      style={{ position: 'relative' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, variant = 'fadeUp' }) {
  return (
    <motion.div
      variants={variants[variant] || variants.fadeUp}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
