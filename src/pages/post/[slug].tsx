import { useRouter } from 'next/router';
import { Post } from '@/containers/Post';
import { countAllPosts } from '@/data/posts/count-all-posts';
import { getAllPosts } from '@/data/posts/get-all-posts';
import { getPost } from '@/data/posts/get-post';
import { PostData } from '@/domain/posts/post';
import { GetStaticPaths, GetStaticProps } from 'next';
import Error from 'next/error';

export type DynamicPostProps = {
  post: PostData;
};
const DynamicPost = ({ post }: DynamicPostProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Página carregando, aguarde...</div>;
  }
  if (!post) {
    return <Error statusCode={404} />;
  }
  return <Post post={post} />;
};

export default DynamicPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPosts = await countAllPosts();
  const posts = await getAllPosts(
    `/?populate=*&pagination[start]=0&pagination[pagesize]=${numberOfPosts}`,
  );
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.attributes.slug,
        },
      };
    }),
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = await getPost(ctx.params?.slug);

  return {
    props: { post: posts[0] },
    revalidate: 5,
  };
};
