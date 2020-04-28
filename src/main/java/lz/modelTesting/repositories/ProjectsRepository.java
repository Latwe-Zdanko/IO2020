package lz.modelTesting.repositories;

import lz.modelTesting.documents.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectsRepository  extends MongoRepository<Project, String> {
}
