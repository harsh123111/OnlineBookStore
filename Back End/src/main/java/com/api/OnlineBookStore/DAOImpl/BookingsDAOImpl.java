package com.api.OnlineBookStore.DAOImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;
import com.api.OnlineBookStore.DAO.*;
import com.api.OnlineBookStore.Model.*;

@Repository
public class BookingsDAOImpl implements BookingsDAO {

	@Autowired
	private JdbcTemplate template;
	private SimpleJdbcCall jdbcCall;
	
	@Override
	public Object getStoreBookings() throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("getStoreBookings");

		Map<String, Object> result = jdbcCall.execute();
		
		return result.get("#result-set-1");
	}

	@Override
	public Object getBooks() throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("getBooks");

		Map<String, Object> result = jdbcCall.execute();
		
		return result.get("#result-set-1");
	}

	@Override
	public Object addBooks(Books param) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("addBook");

		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("inName", param.getName())
				.addValue("inDesc", param.getDescription())
				.addValue("inAuthor", param.getAuthor())
				.addValue("inPrice", param.getPrice())
				.addValue("inRating", param.getRating())
				.addValue("inCategoryId", param.getCategoryId())
				.addValue("inCover", param.getCoverImg())
				.addValue("inPublisherId", param.getPublisherId());
				
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

	@Override
	public Object deleteBook(Integer bookId) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("deleteBook");

		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("inBookId", bookId);
		
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

	@Override
	public Object updateBook(Books param, Integer bookId) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("updateBook");

		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("inName", param.getName())
				.addValue("inDesc", param.getDescription())
				.addValue("inAuthor", param.getAuthor())
				.addValue("inPrice", param.getPrice())
				.addValue("inRating", param.getRating())
				.addValue("inCategoryId", param.getCategoryId())
				.addValue("inBookId", bookId)
				.addValue("inCover", param.getCoverImg())
				.addValue("inPublisherId", param.getPublisherId());
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

	@Override
	public Object addStoreBooking(Integer userId, String address, Integer bookId, Integer rating, String date,
			Integer amount, String token, Integer quantity) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("addStoreBooking");

		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("inUserId", userId)
				.addValue("inAddress", address)
				.addValue("inBookId", bookId)
				.addValue("inRating", rating)
				.addValue("inDate", date)
				.addValue("inAmount", amount)
				.addValue("inToken", token)
				.addValue("inQuantity", quantity);
		
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

}
