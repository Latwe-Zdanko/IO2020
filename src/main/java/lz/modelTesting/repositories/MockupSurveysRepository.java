package lz.modelTesting.repositories;

import lz.modelTesting.documents.MockupSurvey;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MockupSurveysRepository extends MongoRepository<MockupSurvey, String> {
}
