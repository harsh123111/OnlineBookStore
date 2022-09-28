package com.api.OnlineBookStore.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.OnlineBookStore.DAO.UsersDAO;
import com.api.OnlineBookStore.Model.Admin;
import com.api.OnlineBookStore.Model.UpdateAdmin;
import com.api.OnlineBookStore.Model.Users;
import com.api.OnlineBookStore.Service.UsersService;

@Service
public class UsersServiceImpl implements UsersService {

	@Autowired
	UsersDAO usersDao;
	
	@Override
	public Object createUser(Users param) throws Exception {
		return usersDao.createUser(param);
	}

	@Override
	public Object getUsers() throws Exception {
		return usersDao.getUsers();
	}

	@Override
	public Object addAdmin(Admin param) throws Exception {
		return usersDao.addAdmin(param);
	}

	@Override
	public Object getAdmins() throws Exception {
		return usersDao.getAdmins();
	}

	@Override
	public Object updateAdmin(Boolean isDeleted, Integer adminId, Integer accessId) throws Exception {
		return usersDao.updateAdmin(isDeleted, adminId, accessId);
	}

	@Override
	public Object login(String email, String password, String type) throws Exception {
		return usersDao.login(email, password, type);
	}

	@Override
	public Object forgotPassword(String email) throws Exception {
		return usersDao.forgotPassword(email);
	}

	@Override
	public Object updateAdminProfile(UpdateAdmin param) throws Exception {
		return usersDao.updateAdminProfile(param);
	}


}
