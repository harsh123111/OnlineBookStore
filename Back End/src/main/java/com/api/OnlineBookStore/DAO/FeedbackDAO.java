package com.api.OnlineBookStore.DAO;

public interface FeedbackDAO {
	Object getFeedbacks() throws Exception;
	Object deleteFeedback(Integer id) throws Exception;
	Object addFeedback(Integer userId, String feedback) throws Exception;
}
