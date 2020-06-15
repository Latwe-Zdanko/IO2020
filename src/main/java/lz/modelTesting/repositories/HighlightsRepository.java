package lz.modelTesting.repositories;

import lz.modelTesting.documents.Highlight;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface HighlightsRepository extends MongoRepository<Highlight, String> {

    List<Highlight> findByMockupId(String mockupId);

    List<Highlight> findByMockupIdAndQuestionNumber(String mockupId, String questionNumber);

}
