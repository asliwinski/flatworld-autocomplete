import React from 'react'
import './App.css'
import useSearch from './hooks/useSearch'

function App() {
  const [value, setValue, autoComplete, highlighted, move, reset] = useSearch()

  const handleChange = (event) => setValue(event.target.value)
  const handleClick = (event) => {
    const val = event.target.dataset['value']
    setValue(val.replace(/#/g, ''), true)
  }

  const handleKeyDown = (event) => {
    const { key } = event

    if (key === 'ArrowUp') {
      event.preventDefault()
      move('up')
    }

    if (key === 'ArrowDown') {
      event.preventDefault()
      move('down')
    }

    if (key === 'Tab' || key === 'Enter') {
      event.preventDefault()
      setValue(autoComplete[highlighted].replace(/#/g, ''), true)
      reset()
    }
  }

  const renderItem = (item) => {
    const chunks = item.split('#')
    let result = []
    let highlight = item.indexOf('#') === 0

    chunks
      .filter((chunk) => chunk.length > 0)
      .forEach((chunk) => {
        result.push({
          text: chunk,
          highlight
        })
        highlight = !highlight
      })

    return result.map((element, index) => (
      <span
        className={'chunk'}
        key={index}
        style={{
          background: element.highlight ? 'yellow' : 'transparent'
        }}
      >
        {element.text}
      </span>
    ))
  }

  return (
    <div className="App">
      <input
        className={'input'}
        type={'text'}
        name={'search'}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {autoComplete.length > 0 && (
        <div className={'container'}>
          {autoComplete.map((item, index) => (
            <div
              className={`item${index === highlighted ? ' highlighted' : ''}`}
              key={item}
              onClick={handleClick}
              data-value={item}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
