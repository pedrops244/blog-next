import Head from 'next/head';
import { PostData } from '@/domain/posts/post';
import { Category, Container } from './styles';
import { Header } from '@/components/Header';
import { MainContainer } from '@/components/MainContainer';
import { PostCard } from '@/components/PostCard';
import { Footer } from '@/components/Footer';
import { SITE_NAME } from '@/config/app-config';

export type HomePageProps = {
  posts: PostData[];
  category?: string;
};
export default function HomePage({ posts, category }: HomePageProps) {
  return (
    <>
      <Head>
        <title>{category ? `${category} - ${SITE_NAME}` : SITE_NAME}</title>
        <meta name="description" content="Este é meu blog de tecnologia" />
      </Head>
      <Header />
      {category && <Category>Category: {category}</Category>}
      <MainContainer>
        <Container>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              cover={post.attributes.cover.data.attributes.url}
              slug={post.attributes.slug}
              title={post.attributes.title}
            />
          ))}
        </Container>
      </MainContainer>
      <Footer />
    </>
  );
}
