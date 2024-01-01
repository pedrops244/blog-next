import HomePage from '@/containers/HomePage';
import { getAllPosts } from '@/data/posts/get-all-posts';
import { PostData } from '@/domain/posts/post';
import { GetStaticPaths, GetStaticProps } from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';

export type PageProps = {
  posts: PostData[];
};

export default function Page({ posts }: PageProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Página carregando, aguarde...</div>;
  }
  if (!posts.length) {
    return <Error statusCode={404} />;
  }
  return <HomePage posts={posts}></HomePage>;
}

export const getStaticPath: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log(ctx);
  const posts = await getAllPosts(
    '/?populate=*&sort=id:desc&pagination[start]=0&pagination[limit]=10',
  );

  return {
    props: { posts },
    revalidate: 3,
  };
};
