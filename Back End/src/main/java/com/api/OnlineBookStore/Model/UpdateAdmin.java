package com.api.OnlineBookStore.Model;

public class UpdateAdmin {
	private String FirstName;
	private String LastName;
	private String Email;
	private Integer AdminId;
	private String Profile;
	private String Password;
	
	public String getFirstName() {
		return FirstName;
	}
	public void setFirstName(String firstName) {
		FirstName = firstName;
	}
	public String getLastName() {
		return LastName;
	}
	public void setLastName(String lastName) {
		LastName = lastName;
	}
	public String getEmail() {
		return Email;
	}
	public void setEmail(String email) {
		Email = email;
	}
	public Integer getAdminId() {
		return AdminId;
	}
	public void setAdminId(Integer adminId) {
		AdminId = adminId;
	}
	public String getProfile() {
		return Profile;
	}
	public void setProfile(String profile) {
		Profile = profile;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
}
