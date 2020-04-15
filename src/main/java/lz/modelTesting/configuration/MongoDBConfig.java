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
            // passwords are encrypted by BCrypt
            // password: passuser1
            usersRepository.save(new User("User 1", "u1@mail.pl", "$2y$12$CvynPUYvZqt4p3aiuGaGduG5RU5rIsKDJ2BbcYk7d1nTDAZGP2Woe"));
            // password: passuser2
            usersRepository.save(new User("User 2", "u2@mail.pl", "$2y$12$xswpjLRaupJE8y4CHHIbjeba9BvlV.VLfut8q1Gqj5U2JDHgjNmuG"));
        };
    }
}
