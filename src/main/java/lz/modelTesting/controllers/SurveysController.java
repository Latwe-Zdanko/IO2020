package lz.modelTesting.controllers;

import lz.modelTesting.documents.Survey;
import lz.modelTesting.repositories.SurveysRepository;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/surveys")
public class SurveysController {

    private static final String NAME = "name";
    private static final String BODY = "body";
    private static final String ID = "id";
    private static final String ANSWERS = "answers";
    private static final String MOCKUP_ID = "mockupId";

    private transient SurveysRepository surveysRepository;

    public SurveysController(SurveysRepository surveysRepository) {
        this.surveysRepository = surveysRepository;
    }

    @GetMapping("/all")
    public List<Survey> getAll() {
        return surveysRepository.findAll();
    }

    @GetMapping(value = "/recent")
    public List<Survey> getRecent(){
        List<Survey> surveyList =  surveysRepository.findAll();
        int numberOfSurveys = 3;
        if (surveyList.size() <= numberOfSurveys) return surveyList;
        return surveyList.subList(surveyList.size() - numberOfSurveys, surveyList.size());
    }

    @GetMapping("/{id}")
    public Survey getSurvey(@PathVariable String id) {
        Optional<Survey> survey = surveysRepository.findById(id);
        return survey.orElse(null);
    }

    @PostMapping(value = "/addSurvey", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addSurvey(@RequestBody String postPayload) {
        Survey survey = getSurveyFromJson(postPayload, "basic");
        surveysRepository.save(survey);
    }

    @PostMapping(value = "/addMockupSurvey", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addMockupSurvey(@RequestBody String postPayload) {
        Survey survey = getSurveyFromJson(postPayload, "mockup");
        surveysRepository.save(survey);
        return ResponseEntity.ok().body(survey.getId());
    }

    @PostMapping(value = "/addResponse", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addAnswersToSurvey(@RequestBody String postPayload) {
        JSONObject jsonObject = new JSONObject(postPayload);
        String id = jsonObject.getString(ID);
        String answers = jsonObject.getJSONObject(ANSWERS).toString();
        Optional<Survey> survey = surveysRepository.findById(id);

        survey.ifPresent(survey1 -> {
                    survey1.addAnswers(answers);
                    surveysRepository.save(survey1);
                }
        );
    }

    private Survey getSurveyFromJson(String json, String type) {
        JSONObject jsonObject = new JSONObject(json);
        String name = jsonObject.getString(NAME);
        String body = jsonObject.getJSONObject(BODY).toString();
        Survey survey = new Survey(name, body, type);
        if ("mockup".equals(type)){
            String mockupId = jsonObject.getString(MOCKUP_ID);
            survey.setMockupId(mockupId);
        }
        return survey;
    }
}
