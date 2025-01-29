import { useEffect, useState } from "react";
import commentService, { Comment } from "../services/comment-service";
import { CanceledError } from "../services/api-client"; // Correct import

const useComments = (postId: string) => {
  const [comments, setComments] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = commentService.get(postId);
    request
      .then((res: { data: Comment[] }) => {
        setComments(res.data.map(comment => comment.content)); // expects data to be an array of Comment[]
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        setIsLoading(false);
        if (err instanceof CanceledError) return;
        setError("An unexpected error occurred.");
        console.error(err);
      });

    return () => cancel();
  }, [postId]);

  return { comments, setComments, error, setError, isLoading, setIsLoading };
};

export default useComments;
