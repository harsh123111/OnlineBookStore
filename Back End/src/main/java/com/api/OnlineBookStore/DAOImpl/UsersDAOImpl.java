package com.api.OnlineBookStore.DAOImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import com.api.OnlineBookStore.DAO.UsersDAO;
import com.api.OnlineBookStore.Model.Admin;
import com.api.OnlineBookStore.Model.UpdateAdmin;
import com.api.OnlineBookStore.Model.Users;


@Repository
public class UsersDAOImpl implements UsersDAO {

	//@Qualifier("simpleJdbcCall1")
	
	@Autowired
	private JdbcTemplate template;
	
	private SimpleJdbcCall jdbcCall;
	
	@Override
	public Object createUser(Users input) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("userCreate");

		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("inFirstName", input.getFirstName())
				.addValue("inLastName", input.getLastName())
				.addValue("inEmail", input.getEmail())
				.addValue("inPassword", input.getPassword())
				.addValue("inSecurityQuestion", input.getQuestion())
				.addValue("inAnswer", input.getAnswer());
		
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

	@Override
	public Object getUsers() throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("getUsers");

		Map<String, Object> result = jdbcCall.execute();
		
		return result.get("#result-set-1");
	}

	@Override
	public Object addAdmin(Admin param) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("addAdmin");

		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("inFName", param.getFirstName())
				.addValue("inLName", param.getLastName())
				.addValue("inEmail", param.getEmail())
				.addValue("inPass", param.getPassword())
				.addValue("inAccess", param.getAccess());
		
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

	@Override
	public Object getAdmins() throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("getAdmins");

		Map<String, Object> result = jdbcCall.execute();
		
		return result.get("#result-set-1");
	}

	@Override
	public Object updateAdmin(Boolean isDeleted, Integer adminId, Integer accessId) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("updateAdmin");

		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("inAccess", accessId)
				.addValue("inAdminId", adminId)
				.addValue("inIsDeleted", isDeleted);
		
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

	@Override
	public Object login(String email, String password, String type) throws Exception {
		
		if (type.equals("user")) {
			jdbcCall = new SimpleJdbcCall(template)
					.withSchemaName("project").withProcedureName("loggedInUser");	
		} else {
			jdbcCall = new SimpleJdbcCall(template)
					.withSchemaName("project").withProcedureName("loggedInAdmin");
		}
		
		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("inEmail", email)
				.addValue("inPass", password);
		
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

	@Override
	public Object forgotPassword(String email) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("userForgotPassword");

		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("inEmail", email);
				
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}

	@Override
	public Object updateAdminProfile(UpdateAdmin param) throws Exception {
		jdbcCall = new SimpleJdbcCall(template)
				.withSchemaName("project").withProcedureName("updateAdminProfile");

		SqlParameterSource params = new MapSqlParameterSource()
				.addValue("inImg", param.getProfile())
				.addValue("inFirstName", param.getFirstName())
				.addValue("inLastName", param.getLastName())
				.addValue("inEmail", param.getEmail())
				.addValue("inPassword", param.getPassword())
				.addValue("inAdminId", param.getAdminId());
		
		Map<String, Object> result = jdbcCall.execute(params);
		
		return result.get("#result-set-1");
	}


}
