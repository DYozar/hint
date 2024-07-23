
import { gql, request } from 'graphql-request'

const GetCategories = gql`
  query GetCategories {
    Categories {
      id
      title
      cSlug
    }
  }
`;
async function getData() {
  try {
    const result = await request('http://localhost:4000/', GetCategories);
    return result.Categories;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch categories. Please check the server and network settings.');
  }
}



export default async function Home() {
 const Categories =  await getData()
console.log(Categories)

  return (
    <>
      test
    </>
  );
}
