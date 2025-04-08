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

export const REPO_URL = gql`
    query Repo ($repositoryId: ID!) {
        repository(id: $repositoryId) {
            id
            url
        }
    }
`

export const REPO_REVIEWS = gql`
    query Reviews($repositoryId: ID!) {
        repository(id: $repositoryId) {
            id
            fullName
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`

export const CREATE_REVIEW = gql`
    mutation CreateReview($review: CreateReviewInput) {
        createReview(review: $review) {
            repositoryId
        }
    }
`

export const CREATE_USER = gql`
    mutation CreateUser($user: CreateUserInput) {
        createUser(user: $user) {
            id
        }
    }
`