package lz.modelTesting.documents;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;

@Getter
@Setter
@Document(collection = "surveys")
public class Survey {

    @Id
    private String id;
    private String name;
    private String body;
    private HashMap<Integer, String> questions = new HashMap<>();
    private HashMap<Integer, String> answers = new HashMap<>();

    public Survey(String name, String body) {
        this.name = name;
        this.body = body;

    }

    public void addAnswers(HashMap<Integer, String> answers) {

    }

    public void getQuestions() {
        questions.forEach((id, question) -> System.out.println(question));
    }
}