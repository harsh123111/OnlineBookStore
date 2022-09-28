package com.api.OnlineBookStore.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.OnlineBookStore.DAO.CategoryDAO;
import com.api.OnlineBookStore.DAO.PublisherDAO;
import com.api.OnlineBookStore.DAO.UsersDAO;
import com.api.OnlineBookStore.Model.Users;
import com.api.OnlineBookStore.Service.CategoryService;
import com.api.OnlineBookStore.Service.PublisherService;
import com.api.OnlineBookStore.Service.UsersService;

@Service
public class PublisherServiceImpl implements PublisherService {

	@Autowired
	PublisherDAO publisherDao;

	@Override
	public Object insertPublisher(String publisherName) throws Exception {
		return publisherDao.insertPublisher(publisherName);
	}

	@Override
	public Object updatePublisher(String publisherName, Integer id) throws Exception {
		return publisherDao.updatePublisher(publisherName, id);
	}

	@Override
	public Object deletePublisher(Integer id) throws Exception {
		return publisherDao.deletePublisher(id);
	}

	@Override
	public Object getPublishers() throws Exception {
		return publisherDao.getPublishers();
	}

}
