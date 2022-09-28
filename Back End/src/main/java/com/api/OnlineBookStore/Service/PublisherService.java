package com.api.OnlineBookStore.Service;


public interface PublisherService {

	Object insertPublisher(String publisherName) throws Exception;
	Object updatePublisher(String publisherName, Integer id) throws Exception;
	Object deletePublisher(Integer id) throws Exception;
	Object getPublishers() throws Exception;
}
