package com.api.OnlineBookStore.DAOImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import com.api.OnlineBookStore.DAO.CategoryDAO;


@Repository
public class CategoryDAOImpl implements CategoryDAO {

	//@Qualifier("simpleJdbcCall1")
	
	@Autowired
	private JdbcTemplate template;
	
	private SimpleJdbcCall jdbcCall;
	
	@Override
	public Object insertCategory(String categoryName) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("insertCategory");

		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("categoryName", categoryName);
		
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

	@Override
	public Object updateCategory(String categoryName, Integer id) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("updateCategory");

		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("categoryName", categoryName)
				.addValue("id", id);
		
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

	@Override
	public Object deleteCategory(Integer id) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("deleteCategory");

		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("id", id);
		
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

	@Override
	public Object getCategories() throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("getCategories");
		
		Map<String, Object> result = jdbcCall.execute();
		
		return result.get("#result-set-1");
	}


}
