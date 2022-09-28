package com.api.OnlineBookStore.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.OnlineBookStore.Model.Response;
import com.api.OnlineBookStore.Service.CommentService;

@RestController
@CrossOrigin(origins = "*")
public class CommentController {

	@Autowired
	CommentService commentService;
	
	@RequestMapping(value = "/addComment", method = RequestMethod.GET)
	public ResponseEntity<Object> addComment(Integer userId, Integer bookId, String comment, String date) throws Exception {
		try {
			Object res = commentService.addComment(userId, bookId, comment, date);
			return Response.generateResponse("", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}

	@RequestMapping(value = "/getComments", method = RequestMethod.GET)
	public ResponseEntity<Object> getComments(Integer bookId) throws Exception {
		try {
			Object res = commentService.getComments(bookId);
			return Response.generateResponse("!", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
}
