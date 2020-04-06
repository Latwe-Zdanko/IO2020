package lz.modelTesting.controllers;
import lz.modelTesting.documents.Survey;
import lz.modelTesting.repositories.SurveysRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/")
public class AddSurveyController {

    @Autowired
    private SurveysRepository surveysRepository;

    @GetMapping(value = "/addsurvey")
    public String addSurvey(){
        System.out.println("halo");

        return "survey";
    }

    @PostMapping(value = "/addsurvey")
    public void addSurvey(HttpServletRequest request){
        HashMap<Integer,String> questions = new HashMap<>();

        int i=0;
        while(request.getParameter(String.valueOf(i))!= null){
            questions.put(i,request.getParameter(String.valueOf(i)));
            i++;
        }
//        surveysRepository.deleteAll();//temporary
//        Survey survey = new Survey(questions);
//        surveysRepository.save(survey);
//
//        List<Survey> surveys = surveysRepository.findAll();
//
//        surveys.forEach(Survey::getQuestions);

    }

}
