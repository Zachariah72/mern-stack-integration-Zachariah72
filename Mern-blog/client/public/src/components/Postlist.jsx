// path: client/src/components/PostList.jsx
import PostCard from "./PostCard";

export default function PostList({ posts }) {
  if (!posts.length) return <p>No posts found.</p>;

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
