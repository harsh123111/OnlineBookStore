package com.api.OnlineBookStore.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.OnlineBookStore.Model.Response;
import com.api.OnlineBookStore.Service.CategoryService;


@RestController
@CrossOrigin(origins = "*")
public class CategoryController {
	
	@Autowired
	CategoryService categoryService;
	
	@RequestMapping(value = "/getCategories", method = RequestMethod.GET)
	public ResponseEntity<Object> getCategories() throws Exception {
		try {
			Object res = categoryService.getCategories();
			return Response.generateResponse("", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/insertCategory", method = RequestMethod.GET)
	public ResponseEntity<Object> insertCategory(String categoryName) throws Exception {
		try {
			Object res = categoryService.insertCategory(categoryName);
			return Response.generateResponse("Category created successfully!", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}

	@RequestMapping(value = "/updateCategory", method = RequestMethod.GET)
	public ResponseEntity<Object> updateCategory(String categoryName, Integer id) throws Exception {
		try {
			Object res = categoryService.updateCategory(categoryName, id);
			return Response.generateResponse("Category updated successfully!", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/deleteCategory", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteCategory(Integer id) throws Exception {
		try {
			Object res = categoryService.deleteCategory(id);
			return Response.generateResponse("Category deleted successfully!", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
}
