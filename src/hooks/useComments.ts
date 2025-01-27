import { useEffect, useState } from "react";
import commentService, {CanceledError, Comment } from "../services/comment-service";


const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = commentService.get(postId);
    request
      .then((res: { data: Comment[] }) => {
        setComments(res.data); // expects data to be an array of Comment[]
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
