export default defineNuxtRouteMiddleware(async () => {
  // Get the query params from the URL
  const params = new URLSearchParams(window.location.search)

  // Get 'hash-redirect' and 'hash-query-params' from the query params
  // (backward compat: custom URL controller used to pass these)
  const redirect = params.get('hash-redirect')
  const encodedQueryParams = params.get('hash-query-params')

  // If redirect query param is set, navigate to the clean path
  if (redirect) {
    let url = redirect

    // If hash-query-params exists, decode and append it
    if (encodedQueryParams) {
      const decodedParams = new URLSearchParams(decodeURIComponent(encodedQueryParams))
      const queryString = decodedParams.toString()
      if (queryString) {
        url += `?${queryString}`
      }
    }

    return navigateTo(url, { replace: true })
  }
})
