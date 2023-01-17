import React, { useState } from 'react'

const useInput = (initialValue = undefined) => {
  const [inputVal, setInputVal] = useState<any>(initialValue)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputVal(e.currentTarget.value)
  }

  return {
    inputVal,
    handleInputChange
  }
}

export default useInput
