package com.api.OnlineBookStore.Model;

public class Users {
	
	private Integer Id;
	private String Email;
	private String Password;
	private String Question;
	private String Answer;
	private String FirstName;
	private String LastName;
	
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
	public Integer getId() {
		return Id;
	}
	public void setId(Integer id) {
		Id = id;
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
	public String getAnswer() {
		return Answer;
	}
	public void setAnswer(String answer) {
		Answer = answer;
	}
	public String getQuestion() {
		return Question;
	}
	public void setQuestion(String question) {
		Question = question;
	}
	
}
