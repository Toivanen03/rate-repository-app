import { gql } from '@apollo/client'

export const REPO_DETAILS = gql`
    query GetRepos {
        repositories {
            edges {
                node {
                    id
                    fullName
                    description
                    language
                    forksCount
                    stargazersCount
                    ratingAverage
                    reviewCount
                    ownerAvatarUrl
                }
            }
        }
    }
`

export const SIGN_IN = gql`
    mutation Authenticate($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`

export const ME = gql`
query Me {
    me {
        id
        username
    }
}
`