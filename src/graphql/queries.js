import { gql } from '@apollo/client'

export const REPO_FIELDS = gql`
  fragment RepoFields on Repository {
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
`

export const PAGE_INFO_FIELDS = gql`
  fragment PageInfoFields on PageInfo {
    endCursor
    startCursor
    hasNextPage
  }
`

export const REPO_EDGE_FIELDS = gql`
  ${REPO_FIELDS}
  fragment RepoEdgeFields on RepositoryEdge {
    node {
      ...RepoFields
    }
    cursor
  }
`

export const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repository {
      id
      fullName
    }
  }
`

export const REPO_DETAILS = gql`
  ${REPO_EDGE_FIELDS}
  ${PAGE_INFO_FIELDS}
  query GetRepos($first: Int, $after: String) {
    repositories(first: $first, after: $after) {
      totalCount
      pageInfo {
        ...PageInfoFields
      }
      edges {
        ...RepoEdgeFields
      }
    }
  }
`

export const FILTERED_REPOS = gql`
  ${REPO_EDGE_FIELDS}
  ${PAGE_INFO_FIELDS}
  query Repositories(
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $first: Int,
    $after: String
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, first: $first, after: $after) {
      totalCount
      pageInfo {
        ...PageInfoFields
      }
      edges {
        ...RepoEdgeFields
      }
    }
  }
`

export const SEARCH_REPOS = gql`
  ${REPO_EDGE_FIELDS}
  ${PAGE_INFO_FIELDS}
  query SearchRepos($searchKeyword: String!, $first: Int, $after: String) {
    repositories(searchKeyword: $searchKeyword, first: $first, after: $after) {
      totalCount
      pageInfo {
        ...PageInfoFields
      }
      edges {
        ...RepoEdgeFields
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
  ${REVIEW_FIELDS}
  query Me($includeReviews: Boolean = false) {
    me {
      id
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFields
          }
        }
      }
    }
  }
`

export const REPO_URL = gql`
  query Repo($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      url
    }
  }
`

export const REPO_REVIEWS = gql`
  ${REVIEW_FIELDS}
  query Reviews($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews {
        edges {
          node {
            ...ReviewFields
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

export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
    }
  }
`