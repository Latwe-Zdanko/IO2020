package lz.modelTesting.repositories;

import lz.modelTesting.documents.Survey;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SurveysRepository extends MongoRepository<Survey,Integer> {
}
