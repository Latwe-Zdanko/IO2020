package lz.modelTesting.repositories;

import lz.modelTesting.documents.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsersRepository extends MongoRepository<User, Integer> {
    User findByEmail(String email);
}