package com.api.OnlineBookStore.Service;

public interface CommentService {
	Object addComment(Integer userId, Integer bookId, String comment, String date) throws Exception;
	Object getComments(Integer bookId) throws Exception;
}
