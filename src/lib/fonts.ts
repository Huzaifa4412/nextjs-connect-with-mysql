// lib/fonts.js
import { Poppins, Urbanist } from 'next/font/google'

export const poppins = Poppins({
  weight: ['400', '500', '600', '700'], // Choose weights you need
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const urbanist = Urbanist({
  weight: ['400', '500', '600', '700'], // Choose weights you need
  subsets: ['latin'],
  variable: '--font-urbanist',
  display: 'swap',
})
