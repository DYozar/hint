import { gql, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { getPostsDetail, GetPosts, getRelatedPosts } from '../../../GraphQl/Queries';
import ArticlePage from '../../../components/LandingPage/ArticlePage'
const Url = 'https://serverside-production-41e2.up.railway.app/';

const client = new ApolloClient({
  link: new HttpLink({ uri: Url }),
  cache: new InMemoryCache(),
});

export const updateArticleViews = async (id) => {
  const UPDATE_Views = gql`
    mutation Mutation($postId: ID!) {
      incrementReads(postId: $postId) {
        id
        title
        reads
      }
    }
  `;

  try {
    const response = await client.mutate({
      mutation: UPDATE_Views,
      variables: { postId: id },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating Views:', error);
    return null;
  }
};

export const revalidate = 10;

export async function generateStaticParams() {
  const posts = await GetPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

async function getPost(params) {
  const { slug } = params;
  const post = await getPostsDetail(slug);

  let cSlug;
  console.log("post",post)
  
  if (post.length > 0 && post[0].Categories[0]) {
    const { Categories } = post[0];
    const array = Categories.map((category) => category.cSlug);
    cSlug = array[0];
  }

  const relatedPosts = await getRelatedPosts(slug, cSlug);

  const id = post[0]?.id;

  console.log("id",id)

  if (id) {
    await updateArticleViews(id);
  }
  console.log("relatedPosts",relatedPosts)
  

  return {
    post,
    relatedPosts,
  };
}

export default async function Slug({ params }) {
  const { slug } = params;
  const { post, relatedPosts } = await getPost(params);
  const currentUrl = `http://localhost:3000/post/${slug}`;

  return (
    <div className='relative  mt-20 mx-auto w-full'>
      <ArticlePage detail={post} relatedPosts={relatedPosts} currentUrl={currentUrl} />
    </div>
  );
}