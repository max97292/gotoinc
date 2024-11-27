import Link from "next/link";
import { notFound } from "next/navigation";

interface Post {
  id: number;
  title: string;
  body: string;
}

type Params = Promise<{ id: string }>;

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const post = await getPost(id);

  return {
    title: `Post: ${post.title}`,
    description: post.body.slice(0, 150),
    openGraph: {
      siteName: "Posts App",
      title: `Post: ${post.title}`,
      description: post.body.slice(0, 150),
      url: `https://postsapp.com/posts/${id}`,
    },
  };
}

export default async function PostDetailsPage({ params }: { params: Params }) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex gap-2 items-center mb-2">
        <button type="button" className="h-full">
          <Link href="/" className="flex items-center">
            🏠︎
          </Link>
        </button>
        <h1 className="text-2xl font-bold text-center w-full">{post.title}</h1>
      </div>
      <p className="text-gray-600 mb-4">Post ID: {post.id}</p>
      <p className="text-lg">{post.body}</p>
      <div className="flex justify-between">
        {Number(id) > 1 ? (
          <button type="button">
            <Link href={`/posts/${Number(id) - 1}`}>←</Link>
          </button>
        ) : (
          <div></div>
        )}
        {Number(id) < 100 ? (
          <button type="button">
            <Link href={`/posts/${Number(id) + 1}`}>→</Link>
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
