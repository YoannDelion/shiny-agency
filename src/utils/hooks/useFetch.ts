import { useEffect, useState } from 'react'

export default function useFetch(url: string) {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!url) return

    setLoading(true)

    async function fetchData() {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { data, loading, error }
}
