package lz.modelTesting.repositories;

import lz.modelTesting.documents.Mockup;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MockupsRepository extends MongoRepository<Mockup, String> {

    List<Mockup> findByProjectId(String projectId);

    List<Mockup> findAll();

}
