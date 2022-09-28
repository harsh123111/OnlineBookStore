package com.api.OnlineBookStore.Model;

public class Admin {
	
	private String FirstName;
	private String LastName;
	private String Email;
	private String Password;
	private Integer Access;
	
	public String getFirstName() {
		return FirstName;
	}
	public void setFirstName(String fName) {
		FirstName = fName;
	}
	public String getLastName() {
		return LastName;
	}
	public void setLastName(String lName) {
		LastName = lName;
	}
	public String getEmail() {
		return Email;
	}
	public void setEmail(String email) {
		Email = email;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public Integer getAccess() {
		return Access;
	}
	public void setAccess(Integer access) {
		Access = access;
	}
	
}
