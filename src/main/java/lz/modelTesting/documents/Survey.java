package lz.modelTesting.documents;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@Document(collection = "surveys")
public class Survey {

    @Id
    private String id;
    private String name;
    private String type;
    private String body;
    private List<String> answers = new LinkedList<>();
    private String mockupId;

    public Survey(String name, String body, String type) {
        this.name = name;
        this.body = body;
        this.type = type;
    }

    public void addAnswers(String answers) {
        this.answers.add(answers);
    }
}