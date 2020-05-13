package lz.modelTesting.documents;


import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "mockup_surveys")
@RequiredArgsConstructor
public class MockupSurvey {
    @Id
    private String id;
    @NonNull
    private String name;
    @NotNull
    private String mockupId;
    @NonNull
    private List<String> questions;
    private List<List<String>> answers = new LinkedList<>();

    public void addAnswer(List<String> answer){
        this.answers.add(answer);
    }

}
