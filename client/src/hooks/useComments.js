import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useComments = (cardId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    if (!cardId) return;

    try {
      setLoading(true);
      const data = await api.getComments(cardId);
      setComments(data);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [cardId]);

  const addComment = async (commentData) => {
    try {
      const newComment = await api.createComment({ ...commentData, cardId });
      setComments(prev => [newComment, ...prev]);
      return newComment;
    } catch (err) {
      console.error('Error creating comment:', err);
      setError('Failed to create comment');
      throw err;
    }
  };

  const updateComment = async (commentId, commentData) => {
    try {
      const updatedComment = await api.updateComment(commentId, commentData);
      setComments(prev => prev.map(comment =>
        comment.id === commentId ? updatedComment : comment
      ));
      return updatedComment;
    } catch (err) {
      console.error('Error updating comment:', err);
      setError('Failed to update comment');
      throw err;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await api.deleteComment(commentId);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Failed to delete comment');
      throw err;
    }
  };

  return {
    comments,
    loading,
    error,
    addComment,
    updateComment,
    deleteComment,
    refetch: fetchComments
  };
};
