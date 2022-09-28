package com.api.OnlineBookStore.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.OnlineBookStore.DAO.CategoryDAO;
import com.api.OnlineBookStore.DAO.UsersDAO;
import com.api.OnlineBookStore.Model.Users;
import com.api.OnlineBookStore.Service.CategoryService;
import com.api.OnlineBookStore.Service.UsersService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	CategoryDAO categoryDao;
	
	@Override
	public Object insertCategory(String categoryName) throws Exception {
		return categoryDao.insertCategory(categoryName);
	}

	@Override
	public Object updateCategory(String categoryName, Integer id) throws Exception {
		return categoryDao.updateCategory(categoryName, id);
	}

	@Override
	public Object deleteCategory(Integer id) throws Exception {
		return categoryDao.deleteCategory(id);
	}

	@Override
	public Object getCategories() throws Exception {
		return categoryDao.getCategories();
	}

}
