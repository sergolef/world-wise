import React from 'react'
import styles from './Button.module.css'

export default function Button({ children, onClick, type }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
      type={type}>
      {children}
    </button>
  )
}
