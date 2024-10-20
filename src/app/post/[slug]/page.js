
import { gql, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { getPostsDetail, GetPosts, getRelatedPosts } from '../../../GraphQl/Queries';
import ArticlePage from '../../../components/LandingPage/ArticlePage'
const Url = 'https://api.nuttynook.com/';


export async function generateMetadata({ params }) {
  const {slug} = params;
  const posts = await getPostsDetail(slug);

  return {
    title:posts[0]?.title,
    publisher: 'published by hintlr authors',
    openGraph: {
      images: [
        {
          url: posts[0]?.image?.url, // Must be an absolute URL
          width: 2240,
          height: 1260,
          type:'image/jpeg'
        }],
    },
  }
}

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
  
  if (post.length > 0 && post[0].Categories[0]) {
    const { Categories } = post[0];
    const array = Categories.map((category) => category.cSlug);
    cSlug = array[0];
  }

  const relatedPosts = await getRelatedPosts(slug, cSlug);

  const id = post[0]?.id;


  if (id) {
    await updateArticleViews(id);
  }
  

  return {
    post,
    relatedPosts,
  };
}

export default async function Slug({ params }) {
  const { slug } = params;
  const { post, relatedPosts } = await getPost(params);
  const currentUrl = `https://nuttynook.com/post/${slug}`;

  return (
    <div className='relative  mt-20 mx-auto w-full'>
      <ArticlePage detail={post} relatedPosts={relatedPosts} currentUrl={currentUrl} />
    </div>
  );
}
