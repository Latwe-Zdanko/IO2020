package lz.modelTesting.configuration;

import lz.modelTesting.documents.Mockup;
import lz.modelTesting.documents.Project;
import lz.modelTesting.documents.Survey;
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
    CommandLineRunner loadSamples(UsersRepository usersRepository, MockupsRepository mockupsRepository,
                                  SurveysRepository surveysRepository, ProjectsRepository projectsRepository) {
        return args ->
        {
            // passwords are encrypted by BCrypt
            Optional<User> userOptional = usersRepository.findByEmail("u1@mail.pl");
            if (userOptional.isEmpty()) {
                // password: passuser1
                usersRepository.save(new User("First 1", "Last 1", "u1@mail.pl", "$2y$12$CvynPUYvZqt4p3aiuGaGduG5RU5rIsKDJ2BbcYk7d1nTDAZGP2Woe"));
            }
            userOptional = usersRepository.findByEmail("u2@mail.pl");
            if (userOptional.isEmpty()) {
                // password: passuser2
                usersRepository.save(new User("First 2 ", "Last 2", "u2@mail.pl", "$2y$12$xswpjLRaupJE8y4CHHIbjeba9BvlV.VLfut8q1Gqj5U2JDHgjNmuG"));
            }

            Project[] projects = {new Project("First Project"), new Project("Sample Project"), new Project("Axure Project"), new Project("AdobeXD Project"), new Project("Figma Project")};

            String surveyBody = "{\"questions\":[{\"isRequired\":false,\"enableIf\":true,\"name\":\"Text question?\",\"type\":\"comment\",\"title\":\"Text question?\"},{\"isRequired\":false,\"enableIf\":true,\"name\":\"Radiogroup question\",\"type\":\"radiogroup\",\"title\":\"Radiogroup question\",\"choices\":[\"yes\",\"no\",\"maybe\"]},{\"isRequired\":false,\"enableIf\":true,\"mininumRateDescription\":\"low\",\"name\":\"Rating question\",\"maximumRateDescription\":\"high\",\"type\":\"rating\",\"title\":\"Rating question\"},{\"isRequired\":false,\"enableIf\":true,\"columns\":[{\"text\":\"Strongly Disagree\",\"value\":1},{\"text\":\"Disagree\",\"value\":2},{\"text\":\"Neutral\",\"value\":3},{\"text\":\"Agree\",\"value\":4},{\"text\":\"Strongly Agree\",\"value\":5}],\"name\":\"Please indicate if you agree or disagree with the following statements\",\"type\":\"matrix\",\"title\":\"Please indicate if you agree or disagree with the following statements\",\"rows\":[{\"text\":\"Statement 1\",\"value\":\"Statement 1\"},{\"text\":\"Statement 2\",\"value\":\"Statement 2\"},{\"text\":\"Statement 3\",\"value\":\"Statement 3\"},{\"text\":\"Statement 4\",\"value\":\"Statement 4\"}]}]}";
            surveysRepository.save(new Survey("First Sample Survey", surveyBody, "basic"));
            surveysRepository.save(new Survey("Second Sample Survey", surveyBody, "basic"));
            surveysRepository.save(new Survey("Third Sample Survey", surveyBody, "basic"));

            for (int i = 0; i < 5; i++) {
                projectsRepository.save(projects[i]);
                Mockup mockup1 = new Mockup("Axure", "https://2usnmc.axshare.com/", projects[i].getId());
                mockupsRepository.save(mockup1);
                Survey survey1 = new Survey("Mockup Sample Survey " + (i + 1), surveyBody, "mockup");
                survey1.setMockupId(mockup1.getId());
                surveysRepository.save(survey1);
                mockupsRepository.save(new Mockup("AdobeXD", "https://xd.adobe.com/embed/e6a0d97b-6bfc-4f07-653f-70a6a2eae5a7-9091/", projects[i].getId()));
                mockupsRepository.save(new Mockup("Figma", "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/a32Lpn3oXSef2HgPtu5BQx/Course-Dashboard-Copy?node-id=1%3A10&scaling=scale-down-width", projects[i].getId()));
            }

        };
    }
}
