package com.api.OnlineBookStore.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.OnlineBookStore.Model.Books;
import com.api.OnlineBookStore.Model.Response;
import com.api.OnlineBookStore.Service.BookingsService;

@RestController
@CrossOrigin(origins = "*")
public class BookingsController {

	@Autowired
	BookingsService bookingService;
	
	@RequestMapping(value = "/getStoreBookings", method = RequestMethod.GET)
	public ResponseEntity<Object> getStoreBookings() throws Exception {
		try {
			Object res = bookingService.getStoreBookings();
			return Response.generateResponse("", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/getBooks", method = RequestMethod.GET)
	public ResponseEntity<Object> getBooks() throws Exception {
		try {
			Object res = bookingService.getBooks();
			return Response.generateResponse("", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/addStoreBooking", method = RequestMethod.GET)
	public ResponseEntity<Object> addStoreBooking(Integer userId, String address, Integer bookId, Integer rating, String date, Integer amount, String token, Integer quantity) throws Exception {
		try {
			Object res = bookingService.addStoreBooking(userId, address, bookId, rating, date, amount, token, quantity);
			return Response.generateResponse("booking success", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/addBooks", method = RequestMethod.POST)
	public ResponseEntity<Object> addBooks(@RequestBody Books param) throws Exception {
		try {
			Object res = bookingService.addBooks(param);
			return Response.generateResponse("Book added!", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/deleteBook", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteBook(Integer bookId) throws Exception {
		try {
			Object res = bookingService.deleteBook(bookId);
			return Response.generateResponse("book deleted", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/updateBook", method = RequestMethod.POST)
	public ResponseEntity<Object> updateBook(@RequestBody Books param, Integer bookId) throws Exception {
		try {
			Object res = bookingService.updateBook(param, bookId);
			return Response.generateResponse("book updated", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
}
