package com.api.OnlineBookStore.DAO;


public interface PublisherDAO {

	Object insertPublisher(String publisherName) throws Exception;
	Object updatePublisher(String publisherName, Integer id) throws Exception;
	Object deletePublisher(Integer id) throws Exception;
	Object getPublishers() throws Exception;

}
