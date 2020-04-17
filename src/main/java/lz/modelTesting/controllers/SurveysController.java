package lz.modelTesting.controllers;

import lz.modelTesting.documents.Survey;
import lz.modelTesting.repositories.SurveysRepository;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/surveys")
public class SurveysController {

    private SurveysRepository surveysRepository;

    public SurveysController(SurveysRepository surveysRepository) {
        this.surveysRepository = surveysRepository;
    }

    @GetMapping("/all")
    public List<Survey> getAll() {
        return surveysRepository.findAll();
    }

    @RequestMapping(value = "/addsurvey", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addSurvey(@RequestBody String postPayload) {

        JSONObject jsonObject = new JSONObject(postPayload);
        String name = jsonObject.getString("name");
        String body = jsonObject.getJSONObject("body").toString();
        Survey survey = new Survey(name, body);
        surveysRepository.save(survey);
    }

    @RequestMapping(value = "/addanswers", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addAnswersToSurvey(@RequestBody String postPayload) {
        JSONObject jsonObject = new JSONObject(postPayload);
        String id = jsonObject.getString("id");
        String answers = jsonObject.getJSONObject("answers").toString();
        Optional<Survey> survey = surveysRepository.findById(id);
        survey.ifPresent(survey1 -> {
                    survey1.addAnswers(answers);
                    surveysRepository.save(survey1);
                }
        );
    }

}
