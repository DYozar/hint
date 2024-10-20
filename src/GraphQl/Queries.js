import { gql, request } from "graphql-request";

const url = "http://localhost:4000";

export const GetCategories = async () => {
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
          isGenre
        }
      }
    }
  `;

  const result = await request(url, GET_CATEGORY);
  return result.Categories;
};

export const GetSubCategories = async () => {
  const GET_SUBCATEGORY = gql`
    query Query {
      SubCategories {
        id
        title
        sSlug
        isGenre
      }
    }
  `;

  const result = await request(url, GET_SUBCATEGORY);
  return result.SubCategories;
};

export const GetPosts = async () => {
  const GET_POSTS = gql`
    query Query {
      Posts(sort: { order: desc, field: "date" }) {
        id
        title
        content
        slug
        image {
          url
        }
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
          isGenre
        }
      }
    }
  `;

  const result = await request(url, GET_POSTS);
  return result.Posts;
};
export const GetTrendPosts = async () => {
  const GET_POSTS = gql`
    query Query {
      Posts(sort: { order: desc, field: "reads" }) {
        id
        title
        content
        slug
        image {
          url
        }

        date
        reads
        Categories {
          title
          cSlug
        }
        SubCategories {
          title
          sSlug
          isGenre
          id
        }
      }
    }
  `;

  const result = await request(url, GET_POSTS);
  return result.Posts;
};

export const GetSearchingPosts = async (title) => {
  const GET_POSTS = gql`
    query Posts($filters: PostFilterInput) {
      Posts(filters: $filters) {
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
          isGenre
          id
        }
      }
    }
  `;
  const variables = {
    filters: {
      title: {
        containsi: title
      }
    }
  };
  const result = await request(url, GET_POSTS, variables);
  return result.Posts;
};

export const GetPostsByCslug = async (cSlug) => {
  const GET_POSTS = gql`
    query Query($filters: PostFilterInput, $sort: SortInput) {
      Posts(filters: $filters, sort: $sort) {
        id
        title
        content
        slug
        image {
          url
        }
        date
        Categories {
          title
          cSlug
        }
        SubCategories {
          title
          sSlug
          isGenre
          id
        }
      }
    }
  `;

  const variables = {
    filters: {
      category: {
        cSlug: {
          eq: cSlug
        }
      }
    },
    sort: {
      order: "desc",
      field: "date"
    }
  };
  const result = await request(url, GET_POSTS, variables);
  return result.Posts.slice(0, 4);
};

export const getPostsDetail = async (slug) => {
  const GET_POSTS = gql`
    query Posts($filters: PostFilterInput) {
      Posts(filters: $filters) {
        id
        title
        content
        image {
          url
        }
        slug
        date
        imgAuthor
        reads
        items {
          id
          name
          description
          price
          content
          media {
            url
            public_id
          }
          links {
            name
            url
          }
        }
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
        eq: slug
      }
    }
  };
  const result = await request(url, GET_POSTS, variables);
  return result.Posts;
};

export const getRelatedPosts = async (slug, cSlug) => {
  const GET_POSTS = gql`
    query Posts($filters: PostFilterInput) {
      Posts(filters: $filters) {
        id
        title
        content
        image {
          url
        }
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
        ne: slug
      },
      category: {
        cSlug: {
          eq: cSlug
        }
      }
    }
  };

  const result = await request(url, GET_POSTS, variables);
  return result.Posts;
};

export const getPostsByCategory = async (cSlug) => {
  const GET_POSTS = gql`
    query Posts($filters: PostFilterInput) {
      Posts(filters: $filters, sort: { order: desc, field: "date" }) {
        id
        title
        content
        image {
          url
        }
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
          isGenre
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
          eq: cSlug
        }
      }
    }
  };

  const result = await request(url, GET_POSTS, variables);
  return result.Posts;
};

export const getSubBasedOnCat = async (cSlug) => {
  const GET_POSTS = gql`
    query SubCategories($filters: SubCategoryFilterInput) {
      SubCategories(filters: $filters) {
        id
        title
        isGenre

        sSlug
        Categories {
          title
          cSlug
        }
        Posts {
          title
        }
      }
    }
  `;

  const variables = {
    filters: {
      category: {
        cSlug: {
          eq: cSlug
        }
      }
    }
  };

  try {
    const result = await request(url, GET_POSTS, variables);
    return result.SubCategories;
  } catch (error) {
    console.error("GraphQL Error:", error); // Log error for debugging
    // Handle the error gracefully, e.g., show a message to the user
    return { message: "An error occurred while fetching subcategories." };
  }
};

export const getPostBySubcategory = async (sSlug) => {
  const GET_POSTS = gql`
    query Posts($filters: PostFilterInput) {
      Posts(filters: $filters) {
        id
        title
        content
        image {
          url
        }
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
          isGenre
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
          eq: sSlug
        }
      }
    }
  };

  const result = await request(url, GET_POSTS, variables);
  return result.Posts.slice(0, 4);
};

export const GetTrendPostsByCat = async (cSlug) => {
  const GET_POSTS = gql`
    query Posts($filters: PostFilterInput) {
      Posts(filters: $filters) {
        id
        title
        content
        image {
          url
        }
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
          isGenre
        }
      }
    }
  `;

  const variables = {
    filters: {
      category: {
        cSlug: {
          eq: cSlug
        }
      }
    },
    sort: {
      order: "desc",
      field: "reads"
    }
  };
  const result = await request(url, GET_POSTS, variables);

  return result.Posts;
};

export const GetGenre = async () => {
  const GET_GENRE = gql`
    query Query {
      genres {
        id
        genre
        title
      }
    }
  `;

  const result = await request(url, GET_GENRE);
  return result.genres;
};

export const getItemsByGenre = async (sSlug, genre) => {
  const GET_ITEMS = gql`
    query GetItem($filters: ItemFilterInput) {
      Items(filters: $filters) {
        id
        name
        description
        price
        date
        slug
        date
        content
        genres {
          title
        }
        SubCategories {
          title
        }
        media {
          url
          public_id
        }
        links {
          name
          url
        }
      }
    }
  `;

  const variables = {
    filters: {
      subCategory: {
        sSlug: {
          eq: sSlug
        }
      },
      genres: {
        genre: {
          eq: genre
        }
      }
    }
  };

  const result = await request(url, GET_ITEMS, variables);
  return result.Items
};
