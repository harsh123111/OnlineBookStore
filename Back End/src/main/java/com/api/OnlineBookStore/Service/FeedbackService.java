package com.api.OnlineBookStore.Service;

public interface FeedbackService {

	Object getFeedbacks() throws Exception;
	Object deleteFeedback(Integer id) throws Exception;
	Object addFeedback(Integer userId, String feedback) throws Exception;
}
