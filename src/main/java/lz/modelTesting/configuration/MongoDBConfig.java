package lz.modelTesting.configuration;

import lz.modelTesting.documents.Mockup;
import lz.modelTesting.documents.Project;
import lz.modelTesting.documents.User;
import lz.modelTesting.repositories.MockupsRepository;
import lz.modelTesting.repositories.ProjectsRepository;
import lz.modelTesting.repositories.SurveysRepository;
import lz.modelTesting.repositories.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.Optional;

@Configuration
@EnableMongoRepositories(basePackageClasses = {UsersRepository.class, MockupsRepository.class, SurveysRepository.class})
public class MongoDBConfig {
    @Bean
    CommandLineRunner loadSamples(UsersRepository usersRepository, MockupsRepository mockupsRepository, SurveysRepository surveysRepository,ProjectsRepository projectsRepository) {
        return args ->
        {
            // passwords are encrypted by BCrypt
            Optional<User> userOptional = usersRepository.findByEmail("u1@mail.pl");
            if (userOptional.isEmpty()) {
                // password: passuser1
                usersRepository.save(new User("First 1","Last 1", "u1@mail.pl", "$2y$12$CvynPUYvZqt4p3aiuGaGduG5RU5rIsKDJ2BbcYk7d1nTDAZGP2Woe"));
            }
            userOptional = usersRepository.findByEmail("u2@mail.pl");
            if (userOptional.isEmpty()) {
                // password: passuser2
                usersRepository.save(new User("First 2 ", "Last 2", "u2@mail.pl", "$2y$12$xswpjLRaupJE8y4CHHIbjeba9BvlV.VLfut8q1Gqj5U2JDHgjNmuG"));
            }
            Project project = new Project("project 1");
            projectsRepository.save(project);
            mockupsRepository.save(new Mockup("Axure", "https://2usnmc.axshare.com/",project.getId()));
            mockupsRepository.save(new Mockup("AdobeXD", "https://xd.adobe.com/embed/e6a0d97b-6bfc-4f07-653f-70a6a2eae5a7-9091/",project.getId()));
            mockupsRepository.save(new Mockup("Figma", "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/a32Lpn3oXSef2HgPtu5BQx/Course-Dashboard-Copy?node-id=1%3A10&scaling=scale-down-width",project.getId()));
        };
    }
}
