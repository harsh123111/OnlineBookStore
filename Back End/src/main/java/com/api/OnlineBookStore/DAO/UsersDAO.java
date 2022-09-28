package com.api.OnlineBookStore.DAO;

import com.api.OnlineBookStore.Model.Admin;
import com.api.OnlineBookStore.Model.UpdateAdmin;
import com.api.OnlineBookStore.Model.Users;

public interface UsersDAO {

	Object createUser(Users param) throws Exception;
	Object getUsers() throws Exception;
	Object addAdmin(Admin param) throws Exception;
	Object getAdmins() throws Exception;
	Object updateAdmin(Boolean isDeleted, Integer adminId, Integer accessId) throws Exception;
	Object login(String email, String password, String type) throws Exception;
	Object forgotPassword(String email) throws Exception;
	Object updateAdminProfile(UpdateAdmin param) throws Exception;

}
