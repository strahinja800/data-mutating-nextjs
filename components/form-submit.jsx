'use client'

import { useFormStatus } from 'react-dom'

export default function FormSubmit() {
  const { pending } = useFormStatus()

  return (
    <>
      <button disabled={pending} type='reset'>Reset</button>
      <button disabled={pending}>{pending ? 'Creating post...' : 'Create Post'}</button>
    </>
  )
}
