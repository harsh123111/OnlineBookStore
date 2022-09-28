package com.api.OnlineBookStore.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.OnlineBookStore.DAO.CommentDao;
import com.api.OnlineBookStore.Service.CommentService;

@Service
public class CommentServiceImpl implements CommentService {

	
	@Autowired
	CommentDao dao;
	
	@Override
	public Object addComment(Integer userId, Integer bookId, String comment, String date) throws Exception {
		return dao.addComment(userId, bookId, comment, date);
	}

	@Override
	public Object getComments(Integer bookId) throws Exception {
		return dao.getComments(bookId);
	}

}
