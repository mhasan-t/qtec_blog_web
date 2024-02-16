// // Need to use the React-specific entry point to import createApi
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// // import type { Pokemon } from './types'

// // Define a service using a base URL and expected endpoints
// export const authApi = createApi({
//   reducerPath: 'authApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
//   endpoints: (builder) => ({
//     getTokens: builder.query<any, string>({
//       query: (username, password) => `accounts/auth/token`,
//     }),
//   }),
// })

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { useGetPokemonByNameQuery } = authApi
