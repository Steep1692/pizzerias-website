const endpoint: string = 'http://localhost:8000'

export const makeRequest = <T>(url: string, options?: RequestInit) => {
  const urlFinal = endpoint + url

  return fetch(urlFinal, options).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return response.json() as Promise<T>
  })
}