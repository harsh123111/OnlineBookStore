package com.api.OnlineBookStore.DAO;

public interface CommentDao {

	Object addComment(Integer userId, Integer bookId, String comment, String date) throws Exception;
	Object getComments(Integer bookId) throws Exception;

}
