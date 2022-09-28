package com.api.OnlineBookStore.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.OnlineBookStore.Model.Admin;
import com.api.OnlineBookStore.Model.Response;
import com.api.OnlineBookStore.Model.UpdateAdmin;
import com.api.OnlineBookStore.Model.Users;
import com.api.OnlineBookStore.Service.UsersService;


@RestController
@CrossOrigin(origins = "*")
public class UsersController {
	
	@Autowired
	UsersService userService;
	
	@RequestMapping(value = "/createUser", method = RequestMethod.POST)
	public ResponseEntity<Object> createUser(@RequestBody Users param) throws Exception {
		try {
			Object res = userService.createUser(param);
			return Response.generateResponse("User created successfully!", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	
	@RequestMapping(value = "/getUsers", method = RequestMethod.GET)
	public ResponseEntity<Object> getUsers() throws Exception {
		try {
			Object res = userService.getUsers();
			return Response.generateResponse("", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/addAdmin", method = RequestMethod.POST)
	public ResponseEntity<Object> addAdmin(@RequestBody Admin param) throws Exception {
		try {
			Object res = userService.addAdmin(param);
			return Response.generateResponse("Admin created successfully!", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/getAdmins", method = RequestMethod.GET)
	public ResponseEntity<Object> getAdmins() throws Exception {
		try {
			Object res = userService.getAdmins();
			return Response.generateResponse("", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/updateAdmin", method = RequestMethod.GET)
	public ResponseEntity<Object> updateAdmin(Boolean isDeleted, Integer adminId, Integer accessId) throws Exception {
		try {
			Object res = userService.updateAdmin(isDeleted, adminId, accessId);
			return Response.generateResponse("Category updated successfully!", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ResponseEntity<Object> login(String email, String password, String type) throws Exception {
		try {
			Object res = userService.login(email, password, type);
			return Response.generateResponse("", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/forgotPassword", method = RequestMethod.GET)
	public ResponseEntity<Object> forgotPassword(String email) throws Exception {
		try {
			Object res = userService.forgotPassword(email);
			return Response.generateResponse("!", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@RequestMapping(value = "/updateAdminProfile", method = RequestMethod.POST)
	public ResponseEntity<Object> updateAdminProfile(@RequestBody UpdateAdmin param) throws Exception {
		try {
			Object res = userService.updateAdminProfile(param);
			return Response.generateResponse("Admin created successfully!", HttpStatus.OK, res);
		} catch (Exception e) {
			return Response.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
		}
	}
	
}
