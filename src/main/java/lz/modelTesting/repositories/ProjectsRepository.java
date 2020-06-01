package lz.modelTesting.repositories;


import lz.modelTesting.documents.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectsRepository extends MongoRepository<Project, String> {
    @Override
    List<Project> findAll();

    Optional<Project> findByName(String name);
}
