package lz.modelTesting.repositories;

import lz.modelTesting.documents.Mockup;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MockupsRepository extends MongoRepository<Mockup, String> {

}
