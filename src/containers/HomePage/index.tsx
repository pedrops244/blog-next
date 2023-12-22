import { PostData } from '@/domain/posts/post';
import { Container } from './styles';
import { Header } from '@/components/Header';
import { MainContainer } from '@/components/MainContainer';
import { PostCard } from '@/components/PostCard';

export type HomePageProps = {
  posts: PostData[];
};
export default function HomePage({ posts }: HomePageProps) {
  console.log(posts.map((post) => post.attributes.cover.data.attributes.url));
  return (
    <>
      <Header />
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
    </>
  );
}
