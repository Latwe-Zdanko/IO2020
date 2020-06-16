package lz.modelTesting.repositories;

import lz.modelTesting.documents.Mockup;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MockupsRepository extends MongoRepository<Mockup, String> {


    @Override
    List<Mockup> findAll();

    List<Mockup> findByProjectIdAndArchivedIsFalse(String projectId);
}
