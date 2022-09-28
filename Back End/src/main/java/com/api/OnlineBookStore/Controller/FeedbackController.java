package com.api.OnlineBookStore.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.OnlineBookStore.Model.Response;
import com.api.OnlineBookStore.Service.FeedbackService;

@RestController
@CrossOrigin(origins = "*")
public class FeedbackController {

	@Autowired
	FeedbackService feedback;
	
	@RequestMapping(value = "/getFeedbacks", method = RequestMethod.GET)
	public ResponseEntity<Object> getFeedbacks() throws Exception {
		try {
			Object res = feedback.getFeedbacks();
			return Response.generateResponse("", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}

	@RequestMapping(value = "/deleteFeedback", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteFeedback(Integer id) throws Exception {
		try {
			Object res = feedback.deleteFeedback(id);
			return Response.generateResponse("Feedback deleted successfully!", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/addFeedback", method = RequestMethod.GET)
	public ResponseEntity<Object> addFeedback(Integer userId, String feedback) throws Exception {
		try {
			Object res = this.feedback.addFeedback(userId, feedback);
			return Response.generateResponse("", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
}
