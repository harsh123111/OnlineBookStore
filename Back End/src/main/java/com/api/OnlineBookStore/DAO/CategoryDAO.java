package com.api.OnlineBookStore.DAO;


public interface CategoryDAO {

	Object insertCategory(String categoryName) throws Exception;
	Object updateCategory(String categoryName, Integer id) throws Exception;
	Object deleteCategory(Integer id) throws Exception;
	Object getCategories() throws Exception;

}
