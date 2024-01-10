import { useParams } from "react-router";

export default function PostView() {
  const { post } = useParams();
  return <div className="mt-28 md:mt-20 min-h-[calc(100dvh-10rem)]">PostView {post}</div>;
}
