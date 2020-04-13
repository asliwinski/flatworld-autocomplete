import { useState } from 'react'
import api from '../api'

let timer

async function fetchData(value, setValue) {
  const result = await api.get(value)
  setValue(result)
}

const useSearch = () => {
  const [value, setValue] = useState('')
  const [autoComplete, setAutoComplete] = useState([])
  const [highlighted, setHighlighted] = useState(0)

  const move = (direction) => {
    // eslint-disable-next-line default-case
    switch (direction) {
      case 'up':
        if (highlighted > 0) setHighlighted((prevState) => prevState - 1)
        break
      case 'down':
        if (highlighted < autoComplete.length - 1)
          setHighlighted((prevState) => prevState + 1)
        break
    }
  }

  const setValueWithSearch = (val, finish) => {
    setValue(val)

    if (timer) {
      clearTimeout(timer)
    }

    if (!finish) {
      timer = setTimeout(() => fetchData(val, setAutoComplete), 500)
    } else {
      setAutoComplete([])
    }
  }

  const reset = () => setHighlighted(0)

  return [value, setValueWithSearch, autoComplete, highlighted, move, reset]
}

export default useSearch
