package lz.modelTesting.configuration;

import lz.modelTesting.documents.User;
import lz.modelTesting.repositories.SurveysRepository;
import lz.modelTesting.repositories.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackageClasses = {UsersRepository.class, SurveysRepository.class})
public class MongoDBConfig {
    @Bean
    CommandLineRunner loadSamples(UsersRepository usersRepository, SurveysRepository surveysRepository) {
        return args ->
        {
            usersRepository.save(new User("User 1", "Mail 1"));
            usersRepository.save(new User("User 2", "Mail 2"));
            surveysRepository.deleteAll();
        };
    }
}