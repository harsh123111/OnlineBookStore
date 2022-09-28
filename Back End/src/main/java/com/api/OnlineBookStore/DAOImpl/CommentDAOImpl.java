package com.api.OnlineBookStore.DAOImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import com.api.OnlineBookStore.DAO.CommentDao;

@Repository
public class CommentDAOImpl implements CommentDao {

	
	@Autowired
	private JdbcTemplate template;
	private SimpleJdbcCall jdbcCall;
	
	@Override
	public Object addComment(Integer userId, Integer bookId, String comment, String date) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("addComment");
		
		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("inUserId", userId)
				.addValue("inBookId", bookId)
				.addValue("inComment", comment)
				.addValue("inDate", date);
		
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

	@Override
	public Object getComments(Integer bookId) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("getComments");
		
		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("inBookId", bookId);
		
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

}
