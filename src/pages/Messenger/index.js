import React from 'react'
import Contacts from './Contacts'

const Messenger = () => {
  return (
    <div className="px-14 py-4">

      <div className="grid grid-cols-3 space-x-8">
      <div className="col-span-1">
        <Contacts />
      </div>

      <div className="col-span-2">

      </div>
      </div>
    </div>
  )
}
export default Messenger
