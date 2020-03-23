package io2020.latwezdanko.repositories;

import io2020.latwezdanko.documents.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsersRepository extends MongoRepository<User, Integer> {}