package lz.modelTesting.controllers;

import lz.modelTesting.documents.Survey;
import lz.modelTesting.repositories.SurveysRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/surveys")
public class SurveysController {

    private SurveysRepository surveysRepository;

    public SurveysController(SurveysRepository surveysRepository) {
        this.surveysRepository= surveysRepository;
    }

    @GetMapping("/all")
    public List<Survey> getAll() {
        return surveysRepository.findAll();
    }

    @PostMapping(value = "/addsurvey")
    public void addSurvey(HttpServletRequest request) {
        HashMap<Integer, String> questions = new HashMap<>();

        int i = 0;
        while (request.getParameter(String.valueOf(i)) != null) {
            questions.put(i, request.getParameter(String.valueOf(i)));
            i++;
        }

    }

}
