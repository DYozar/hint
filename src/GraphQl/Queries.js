import { gql, request } from 'graphql-request'


const url = 'https://serverside-production-41e2.up.railway.app/'


export const GetCategories = async ()=>{
    const GET_CATEGORY = gql`
  query GetCategories {
    Categories {
      id
      title
      cSlug
       SubCategories {
            id
            title
            sSlug
        }
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

const result = await request(url, GET_POSTS ,{title});
return result.Posts; 
}





export const GetPostsByCslug = async (cSlug)=>{
    const GET_POSTS = gql`
    query Query($filters: PostFilterInput , $sort: SortInput) {
    Posts(filters: $filters ,sort: $sort) {
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
    sort:{
      order :"desc",
      field :"date"
    }
  };
const result = await request(url, GET_POSTS ,variables);
return result.Posts.slice(0,4); 
}









export const getPostsDetail = async (slug)=>{
  const GET_POSTS = gql`
 query Posts($filters: PostFilterInput) {
  Posts(filters: $filters) {
    id
    title
    content
    imgUrl
    slug
    date
imgAuthor
    reads
    Categories {
      id
      title
      cSlug
    }
    
  }
}
`;

const variables = {
  filters: {
    slug: {
      eq: slug,
    },
  },
};
const result = await request(url, GET_POSTS ,variables);
return result.Posts; 
}

export const getRelatedPosts = async (slug,cSlug)=>{
  const GET_POSTS = gql`
 query Posts($filters: PostFilterInput) {
  Posts(filters: $filters) {
    id
    title
    content
    imgUrl
    date
    slug
    reads
    Categories {
      id
      title
      cSlug
    }
  }
}
`;

const variables = {
  filters: {
    slug: {
      ne: slug,
    },
    category: {
      cSlug: {
        eq: cSlug,
      },
  },
}
}


const result = await request(url, GET_POSTS ,variables);
return result.Posts; 
}







export const getPostsByCategory = async (cSlug)=>{
  const GET_POSTS = gql`
 query Posts($filters: PostFilterInput) {
  Posts(filters: $filters ,sort:{order:desc , field:"date"}) {
    id
    title
    content
    imgUrl
    date
    slug
    reads
    Categories {
      id
      title
      cSlug
    }
    SubCategories {
        id
        title
        sSlug
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
}
}


const result = await request(url, GET_POSTS ,variables);
return result.Posts; 
}

export const getSubBasedOnCat = async (cSlug)=>{
  const GET_POSTS = gql`
query SubCategories($filters: SubCategoryFilterInput) {
  SubCategories(filters: $filters) {
    title
    sSlug
    Categories {
      title
      cSlug
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
}
}


const result = await request(url, GET_POSTS ,variables);
return result.SubCategories; 
}


export const getPostBySubcategory = async (sSlug)=>{
  const GET_POSTS = gql`
 query Posts($filters: PostFilterInput) {
  Posts(filters: $filters) {
    id
    title
    content
    imgUrl
    date
    slug
    reads
    Categories {
      id
      title
      cSlug
    }
    SubCategories {
        id
        title
        sSlug
    }
  }
}
`;

const variables = {
  filters: {
    subCategory: {
      sSlug: {
        eq: sSlug,
        
      },
  },
}
}


const result = await request(url, GET_POSTS ,variables);
return result.Posts.slice(0,4); 
}



export const GetTrendPostsByCat = async (cSlug)=>{
  const GET_POSTS = gql`
 query Posts($filters: PostFilterInput) {
  Posts(filters: $filters) {
    id
    title
    content
    imgUrl
    date
    slug
    reads
    Categories {
      id
      title
      cSlug
    }
    SubCategories {
        id
        title
        sSlug
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
  sort:{
    order :"desc",
    field :"reads"
  }
}
const result = await request(url, GET_POSTS ,variables);


return result.Posts; 
}