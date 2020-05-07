package lz.modelTesting.configuration;

import lz.modelTesting.documents.Mockup;
import lz.modelTesting.documents.MockupSurvey;
import lz.modelTesting.documents.User;
import lz.modelTesting.repositories.MockupSurveysRepository;
import lz.modelTesting.repositories.MockupsRepository;
import lz.modelTesting.repositories.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Configuration
@EnableMongoRepositories(basePackageClasses = {UsersRepository.class, MockupsRepository.class, MockupSurveysRepository.class})
public class MongoDBConfig {
    @Bean
    CommandLineRunner loadSamples(UsersRepository usersRepository, MockupsRepository mockupsRepository,
                                  MockupSurveysRepository mockupSurveysRepository) {
        return args ->
        {
            // passwords are encrypted by BCrypt
            Optional<User> userOptional = usersRepository.findByEmail("u1@mail.pl");
            if (userOptional.isEmpty()) {
                // password: passuser1
                usersRepository.save(new User("u1", "u1@mail.pl", "$2y$12$CvynPUYvZqt4p3aiuGaGduG5RU5rIsKDJ2BbcYk7d1nTDAZGP2Woe"));
            }
            userOptional = usersRepository.findByEmail("u2@mail.pl");
            if (userOptional.isEmpty()) {
                // password: passuser2
                usersRepository.save(new User("User 2", "u2@mail.pl", "$2y$12$xswpjLRaupJE8y4CHHIbjeba9BvlV.VLfut8q1Gqj5U2JDHgjNmuG"));
            }

            Mockup mockup1 = new Mockup("Axure", "https://2usnmc.axshare.com/");
            mockupsRepository.save(mockup1);
            mockupsRepository.save(new Mockup("AdobeXD", "https://xd.adobe.com/embed/e6a0d97b-6bfc-4f07-653f-70a6a2eae5a7-9091/"));
            mockupsRepository.save(new Mockup("Figma", "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/a32Lpn3oXSef2HgPtu5BQx/Course-Dashboard-Copy?node-id=1%3A10&scaling=scale-down-width"));

            Map<String, String> map = new HashMap<>();
            map.put("1", "First question?");
            map.put("2", "Second question?");
            map.put("3", "Third question?");
            MockupSurvey mockupSurvey1 = new MockupSurvey("Mockup Survey 1", map);
            mockupSurvey1.setMockupId(mockup1.getId());
            mockupSurveysRepository.save(mockupSurvey1);

        };
    }
}
