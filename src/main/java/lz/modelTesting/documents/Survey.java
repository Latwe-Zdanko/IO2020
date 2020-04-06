package lz.modelTesting.documents;
import com.mongodb.util.JSON;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.*;

@Getter
@Setter
@Document(collection = "surveys")
public class Survey {

    @Id
    private String id;
    private String name;
    private String body;
    private HashMap<Integer,String> questions = new HashMap<>();
    private HashMap<Integer,String> answers = new HashMap<>();

    public Survey(String name, String body){
        this.name = name;
//        for (Integer questionId : questions.keySet()) {
//            this.questions.put(questionId,questions.get(questionId));
//        }
    }

    public void addAnswers(HashMap<Integer, String> answers){

    }

    public void getQuestions(){
        questions.forEach((id,question) -> System.out.println(question));
    }
}