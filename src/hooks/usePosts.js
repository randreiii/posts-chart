import { useQuery, gql } from "@apollo/client";


const GET_POSTS = gql`
query {
    allPosts(count: 500) {
        id 
        title
        createdAt
    }
}
`

export const usePosts = () => {
    const {data, loading, error} = useQuery(GET_POSTS);
        return {
            data,
            loading,
            error
        }
}