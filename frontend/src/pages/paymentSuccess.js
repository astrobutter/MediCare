import React from 'react'
import { motion } from '../components/NpmPackages';
export const PaymentSuccess = () => {
  return (
    <motion.div className='profile page' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
      <div className='payment-content'>
        <h1 className='red '>PaymentSuccess</h1>
      </div>
    </motion.div>
  )
}
