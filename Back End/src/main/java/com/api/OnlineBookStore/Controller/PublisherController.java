package com.api.OnlineBookStore.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.OnlineBookStore.Model.Response;
import com.api.OnlineBookStore.Service.PublisherService;


@RestController
@CrossOrigin(origins = "*")
public class PublisherController {
	
	@Autowired
	PublisherService service;
	
	@RequestMapping(value = "/getPublishers", method = RequestMethod.GET)
	public ResponseEntity<Object> getPublishers() throws Exception {
		try {
			Object res = service.getPublishers();
			return Response.generateResponse("", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/insertPublisher", method = RequestMethod.GET)
	public ResponseEntity<Object> insertPublisher(String publisherName) throws Exception {
		try {
			Object res = service.insertPublisher(publisherName);
			return Response.generateResponse("publisher created successfully!", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}

	@RequestMapping(value = "/updatePublisher", method = RequestMethod.GET)
	public ResponseEntity<Object> updatePublisher(String publisherName, Integer id) throws Exception {
		try {
			Object res = service.updatePublisher(publisherName, id);
			return Response.generateResponse("publisher updated successfully!", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/deletePublisher", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deletePublisher(Integer id) throws Exception {
		try {
			Object res = service.deletePublisher(id);
			return Response.generateResponse("publisher deleted successfully!", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
}
