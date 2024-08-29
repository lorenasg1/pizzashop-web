export interface SignInBody {
  email: string
}

export async function signIn({ email }: SignInBody) {
  return fetch('http://localhost:50789/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
}
