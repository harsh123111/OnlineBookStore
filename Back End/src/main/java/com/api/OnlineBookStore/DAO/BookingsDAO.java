package com.api.OnlineBookStore.DAO;

import com.api.OnlineBookStore.Model.Books;

public interface BookingsDAO {
	Object getStoreBookings() throws Exception;
	Object getBooks() throws Exception;
	Object addBooks(Books param) throws Exception;
	Object deleteBook(Integer bookId) throws Exception;
	Object updateBook(Books param, Integer bookId) throws Exception;
	Object addStoreBooking(Integer userId, String address, Integer bookId, Integer rating, String date, Integer amount, String token, Integer quantity) throws Exception;
}
