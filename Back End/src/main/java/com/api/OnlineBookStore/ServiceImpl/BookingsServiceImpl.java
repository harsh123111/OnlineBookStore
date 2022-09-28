package com.api.OnlineBookStore.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.OnlineBookStore.DAO.BookingsDAO;
import com.api.OnlineBookStore.Model.Books;
import com.api.OnlineBookStore.Service.BookingsService;

@Service
public class BookingsServiceImpl implements BookingsService {

	@Autowired
	BookingsDAO bookingdao;
	
	@Override
	public Object getStoreBookings() throws Exception {
		return bookingdao.getStoreBookings();
	}

	@Override
	public Object getBooks() throws Exception {
		return bookingdao.getBooks();
	}

	@Override
	public Object addBooks(Books param) throws Exception {
		return bookingdao.addBooks(param);
	}

	@Override
	public Object deleteBook(Integer bookId) throws Exception {
		return bookingdao.deleteBook(bookId);
	}

	@Override
	public Object updateBook(Books param, Integer bookId) throws Exception {
		return bookingdao.updateBook(param, bookId);
	}

	@Override
	public Object addStoreBooking(Integer userId, String address, Integer bookId, Integer rating, String date,
			Integer amount, String token, Integer quantity) throws Exception {
		return bookingdao.addStoreBooking(userId, address, bookId, rating, date, amount, token, quantity);
	}

}
