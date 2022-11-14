import Link from "next/link";
import Avatar from "../Avatar";
import Image from 'next/image';

export default function PostCard({ post }) {
  console.log(post);
  return (
    <div className="w-full my-4 overflow-hidden bg-white border border-gray-300 md:rounded-lg dark:border-gray-700 dark:bg-gray-900">
      {
        post.featuredImage && (
          <Image className="object-cover w-full" src={post.featuredImage.url} layout="responsive" width={720} height={400} />
        )
      }
      <div className="p-4">
        <Link href={`/${post.author.username}/${post.slug}`}>
          <a><h1 className="text-2xl font-semibold hover:text-indigo-600">{post.title}</h1></a>
        </Link>
        {/* Author box */}
        <div className="flex mt-4">
          <Avatar image={'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} />
          <div className="flex flex-col ml-1">
            <Link href={`/${post.author.username}`}>
              <a>
                <span className="block text-sm font-medium truncate hover:text-indigo-500">{post.author.firstname + " " + (post.author.lastname ? post.author.lastname : "")}</span>
              </a>
            </Link>
            <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">@{post.author.username} • {post.createdAt}</span>
          </div>
        </div>
        {/* Author box ends */}
      </div>
    </div>
  );
}