package lz.modelTesting.repositories;

import lz.modelTesting.documents.Mockup;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MockupsRepository extends MongoRepository<Mockup,Integer> {

    @Query("{ 'name' : ?0 }")
    List<Mockup> findByName(String name);

}
