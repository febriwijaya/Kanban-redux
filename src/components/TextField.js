import React from 'react'

export default function TextField({ value, onChange }) {
  return (
    <div>
      <input
        type="text"
        id="inputText"
        placeholder="New Task..."
        value={value}
        onChange={onChange}
        required
      />
    </div>
  )
}