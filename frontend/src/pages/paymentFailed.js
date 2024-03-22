import React from 'react'
import { motion } from '../components/NpmPackages';
export const PaymentFailed = () => {
  return (
    <motion.div className='profile page' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
        <h1 className='red '>PaymentFailed</h1>

    </motion.div>
  )
}
