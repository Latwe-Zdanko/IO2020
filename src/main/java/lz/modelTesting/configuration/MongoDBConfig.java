package lz.modelTesting.configuration;

import lz.modelTesting.documents.User;
import lz.modelTesting.repositories.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackageClasses = UsersRepository.class)
public class MongoDBConfig {
    @Bean
    CommandLineRunner loadSamples(UsersRepository usersRepository) {
        return args ->
        {
            usersRepository.save(new User(1, "User 1", "Mail 1"));
            usersRepository.save(new User(2, "User 2", "Mail 2"));
        };
    }
}