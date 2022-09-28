package com.api.OnlineBookStore.DAOImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import com.api.OnlineBookStore.DAO.FeedbackDAO;

@Repository
public class FeedbackDAOImpl implements FeedbackDAO {

	@Autowired
	private JdbcTemplate template;
	private SimpleJdbcCall jdbcCall;
	
	@Override
	public Object getFeedbacks() throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("getFeedbacks");

		Map<String, Object> result = jdbcCall.execute();
		
		return result.get("#result-set-1");
	}

	@Override
	public Object deleteFeedback(Integer id) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("deleteFeedback");

		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("inFeedbackId", id);
		
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

	@Override
	public Object addFeedback(Integer userId, String feedback) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("addFeedback");

		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("inUserId", userId)
				.addValue("inFeedback", feedback);
		
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

}
