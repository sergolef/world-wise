import React from 'react'
import { Link } from 'react-router-dom'
import PageNav from '../components/PageNav'
import AppNav from '../components/AppNav'

export default function Home() {
  return (
    <div>
      <AppNav />
      <PageNav/>
      <h1>Test</h1>
    </div>
  )
}
