package lz.modelTesting.configuration;

import lz.modelTesting.documents.Survey;
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
            String json = "{" +
                    "questions:[" +
                    "{" +
                    "type: \"rating\"," +
                    "name: \"satisfaction\"," +
                    "title: \"How satisfied are you with the Product?\"," +
                    "isRequired: true," +
                    "mininumRateDescription: \"Not Satisfied\"," +
                    "maximumRateDescription: \"Completely satisfied\"" +
                    "}" +
                    "]}";

            String json2 = "{" +
                    "questions:[" +
                    "{" +
                    "type: \"rating\"," +
                    "name: \"Happiness\"," +
                    "title: \"How happy are you?\"," +
                    "isRequired: true," +
                    "mininumRateDescription: \"Not Happy\"," +
                    "maximumRateDescription: \"Completely Happy\"" +
                    "}" +
                    "]}";
            surveysRepository.deleteAll();
            surveysRepository.save(new Survey("survey1", json));
            surveysRepository.save(new Survey("survey2", json2));


        };
    }
}