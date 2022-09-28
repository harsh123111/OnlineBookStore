package com.api.OnlineBookStore.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.OnlineBookStore.DAO.BookingsDAO;
import com.api.OnlineBookStore.DAO.FeedbackDAO;
import com.api.OnlineBookStore.Service.BookingsService;
import com.api.OnlineBookStore.Service.FeedbackService;

@Service
public class FeedbackServiceImpl implements FeedbackService {

	@Autowired
	FeedbackDAO feedbackdao;
	
	@Override
	public Object getFeedbacks() throws Exception {
		return feedbackdao.getFeedbacks();
	}

	@Override
	public Object deleteFeedback(Integer id) throws Exception {
		return feedbackdao.deleteFeedback(id);
	}

	@Override
	public Object addFeedback(Integer userId, String feedback) throws Exception {
		return feedbackdao.addFeedback(userId, feedback);
	}

}
