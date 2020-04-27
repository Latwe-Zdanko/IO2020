package lz.modelTesting.repositories;

import lz.modelTesting.documents.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UsersRepository extends MongoRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}