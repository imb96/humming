export type UserAuth = {
  email: string
  password: string
}

export interface UserRoot {
  user: User
  providerId: any
  _tokenResponse: TokenResponse
  operationType: string
}

export interface User {
  uid: string
  email: string
  emailVerified: boolean
  isAnonymous: boolean
  providerData: ProviderDaum[]
  stsTokenManager: StsTokenManager
  createdAt: string
  lastLoginAt: string
  apiKey: string
  appName: string
}

export interface ProviderDaum {
  providerId: string
  uid: string
  displayName: any
  email: string
  phoneNumber: any
  photoURL: any
}

export interface StsTokenManager {
  refreshToken: string
  accessToken: string
  expirationTime: number
}

export interface TokenResponse {
  kind: string
  localId: string
  email: string
  displayName: string
  idToken: string
  registered: boolean
  refreshToken: string
  expiresIn: string
}
