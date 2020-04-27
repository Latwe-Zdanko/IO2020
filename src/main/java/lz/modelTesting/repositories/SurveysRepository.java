package lz.modelTesting.repositories;

import lz.modelTesting.documents.Survey;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SurveysRepository extends MongoRepository<Survey, Integer> {
    Optional<Survey> findById(String id);

    Optional<Survey> findByName(String name);
}
