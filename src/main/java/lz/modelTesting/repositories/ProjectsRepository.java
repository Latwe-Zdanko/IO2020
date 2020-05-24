package lz.modelTesting.repositories;


import lz.modelTesting.documents.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProjectsRepository  extends MongoRepository<Project, String> {
    @Override
    List<Project> findAll();
}
