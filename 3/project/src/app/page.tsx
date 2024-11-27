import Link from "next/link";
import React from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function Page() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=25",
    {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const posts: Post[] = await res.json();

  return (
    <div className="flex flex-col min-h-screen p-6 gap-5">
      <div className="text-2xl flex w-full justify-between">
        <h1 className="text-center">Posts</h1>
        <Link href={"/logout"} replace>
          🚪
        </Link>
      </div>
      <ol className="grid grid-cols-5 gap-4">
        {posts.map((post) => (
          <Link key={post.id} href={`posts/${post.id}`}>
            <li key={post.id} className="h-full">
              <div className="border border-black p-2 flex flex-col h-full">
                <h2 className="text-center text-xl font-bold capitalize">
                  {post.title}
                </h2>
                <p className="max-w-[50ch] break-words truncate">{post.body}</p>
              </div>
            </li>
          </Link>
        ))}
      </ol>
    </div>
  );
}
