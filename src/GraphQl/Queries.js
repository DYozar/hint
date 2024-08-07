import { gql, request } from 'graphql-request'


const url = 'http://localhost:4000/'


export const GetCategories = async ()=>{
    const GET_CATEGORY = gql`
  query GetCategories {
    Categories {
      id
      title
      cSlug
    }
  }
`;

const result = await request(url, GET_CATEGORY);
return result.Categories; 
}
export const GetSubCategories = async ()=>{
    const GET_SUBCATEGORY = gql`
    query Query {
        SubCategories {
            id
            title
            sSlug
        }
    }
`;

const result = await request(url, GET_SUBCATEGORY);
return result.SubCategories; 
}

export const GetPosts = async ()=>{
    const GET_POSTS = gql`
   query Query{
    Posts(sort:{order:desc , field:"date"}) {
      id
      title
      content
      slug
      imgUrl
      date
      reads
      Categories {
        title
        cSlug
      }
      SubCategories {
        title
        sSlug
        id
      }
    }
  }
`;


const result = await request(url, GET_POSTS);
return result.Posts; 
}
export const GetTrendPosts = async ()=>{
    const GET_POSTS = gql`
    query Query{
    Posts(sort:{order:desc , field:"reads"}) {
      id
      title
      content
      slug
      imgUrl
      date
      reads
      Categories {
        title
        cSlug
      }
      SubCategories {
        title
        sSlug
        id
      }
    }
  }
`;

const result = await request(url, GET_POSTS );
return result.Posts; 
}

export const GetSearchingPosts = async (title)=>{
    const GET_POSTS = gql`
    query Query($title: String!) {
        Posts(filters: { title : {containsi: $title } } ) {
            id
            title
            slug
        }
    }
`;

const result = await request(url, GET_POSTS ,{title});
return result.Posts; 
}





export const GetPostsByCslug = async (cSlug)=>{
    const GET_POSTS = gql`
    query Query($filters: PostFilterInput) {
    Posts(filters: $filters) {
      id
      title
      content
      slug
      imgUrl
      date
      Categories {
        title
        cSlug
      }
      SubCategories {
        title
        sSlug
        id
      }
    }
  }
`;

const variables = {
    filters: {
      category: {
        cSlug: {
          eq: cSlug,
        },
      },
    },
  };
const result = await request(url, GET_POSTS ,variables);
return result.Posts; 
}









