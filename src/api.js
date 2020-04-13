import data from './data'

async function get(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reg = new RegExp(value, 'g')
      // Assuming source data is plain text it uses # as a delimiter to highlight matching substrings
      const result = data
        .filter((item) => item.includes(value))
        .map((item) => item.replace(reg, `#${value}#`))
      resolve(result)
    }, 500)
  })
}

export default { get }
