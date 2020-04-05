package lz.modelTesting.configuration;

import lz.modelTesting.documents.Mockup;
import lz.modelTesting.documents.User;
import lz.modelTesting.repositories.MockupsRepository;
import lz.modelTesting.repositories.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackageClasses = {UsersRepository.class, MockupsRepository.class})
public class MongoDBConfig {
    @Bean
    CommandLineRunner loadSamples(UsersRepository usersRepository, MockupsRepository mockupsRepository) {
        return args ->
        {
            usersRepository.save(new User("User 1", "Mail 1"));
            usersRepository.save(new User("User 2", "Mail 2"));
            mockupsRepository.save(new Mockup("Axure", "https://2usnmc.axshare.com/"));
            mockupsRepository.save(new Mockup("AdobeXD", "https://xd.adobe.com/embed/e6a0d97b-6bfc-4f07-653f-70a6a2eae5a7-9091/"));
            mockupsRepository.save(new Mockup("Figma", "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/a32Lpn3oXSef2HgPtu5BQx/Course-Dashboard-Copy?node-id=1%3A10&scaling=scale-down-width"));

        };
    }
}