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


    private static final String NAME = "name";
    private static final String BODY = "body";
    private static final String ID = "id";
    private static final String ANSWERS = "answers";
    private static final String TEMPLATE = "template";

    private static Boolean template = true;

    private transient SurveysRepository surveysRepository;

    public SurveysController(SurveysRepository surveysRepository) {
        this.surveysRepository = surveysRepository;
    }

    @GetMapping("/all")
    public List<Survey> getAll() {
        return surveysRepository.findAll();
    }

    @GetMapping("/{id}")
    public Survey getSurvey(@PathVariable String id) {
        Optional<Survey> survey = surveysRepository.findByName(id);
        return survey.orElse(null);
    }

    @GetMapping("/getTemplate")
    public Survey getSurveyTemplate() {
        Optional<Survey> survey = surveysRepository.findByName(TEMPLATE);
        return survey.orElse(null);
    }

    @PostMapping(value = "/addTemplate", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addTemplate(@RequestBody String postPayload) {

        if (template) {
            JSONObject jsonObject = new JSONObject(postPayload);
            String name = jsonObject.getString(NAME);
            String body = jsonObject.getJSONObject(BODY).toString();
            Survey survey = new Survey(name, body);
            surveysRepository.save(survey);
        }
        template = false;
    }

    @PostMapping(value = "/addSurvey", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addSurvey(@RequestBody String postPayload) {

        JSONObject jsonObject = new JSONObject(postPayload);
        String name = jsonObject.getString(NAME);
        String body = jsonObject.getJSONObject(BODY).toString();
        Survey survey = new Survey(name, body);

        surveysRepository.save(survey);

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

}
