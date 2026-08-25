import React from 'react'
import { TimelineMockupSchedule } from '../../components/devopsdays/TimelineMockupSchedule'

export default function Schedule27PmPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '1rem 0.5rem' }}>
      <TimelineMockupSchedule date="2026-08-27" startTime="14:30" endTime="18:15" />
    </div>
  )
}
