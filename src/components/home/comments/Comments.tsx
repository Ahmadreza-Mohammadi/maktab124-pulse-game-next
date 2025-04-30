
import { comments } from "@/components/constants/Constants";
import CommentsPagination from "./Pagination";

function Comments() {
  return (
    <section
      className="py-12 bg-gradient-to-b from-blue-950 to-blue-800"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-200 mb-8 text-center">
          نظرات کاربران درباره پالس گیم
        </h2>
        <CommentsPagination comments={comments} />
      </div>
    </section>
  );
}

export default Comments;
