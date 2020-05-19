package lz.modelTesting.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lz.modelTesting.documents.MockupSurvey;
import lz.modelTesting.repositories.MockupSurveysRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mockupsurvey")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MockupSurveysController {

    private final static String SURVEY_NAME = "surveyName";
    private final static String QUESTIONS = "questions";
    private final static String MOCKUP_ID = "mockupId";
    private final static String SURVEY_ID = "surveyId";
    private final static String ANSWERS = "answers";

    private transient MockupSurveysRepository mockupSurveysRepository;
    private transient ObjectMapper objectMapper;

    @Autowired
    public MockupSurveysController(MockupSurveysRepository mockupSurveysRepository, ObjectMapper objectMapper) {
        this.mockupSurveysRepository = mockupSurveysRepository;
        this.objectMapper = objectMapper;
    }

    @GetMapping(value = "/all")
    public List<MockupSurvey> getAll() {
        return mockupSurveysRepository.findAll();
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<String> getById(@PathVariable String id) {
        try {
            Optional<MockupSurvey> mockupSurvey = mockupSurveysRepository.findById(id);
            return mockupSurvey.map(this::wrapMockupSurveyToString)
                    .orElseThrow()
                    .map(mockupSurveyString -> ResponseEntity.ok().body(mockupSurveyString))
                    .orElse(ResponseEntity.notFound().build());

        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    private Optional<String> wrapMockupSurveyToString(MockupSurvey mockupSurvey) {
        try {
            return Optional.of(objectMapper.writeValueAsString(mockupSurvey));
        } catch (JsonProcessingException e) {
            return Optional.empty();
        }
    }

    @PostMapping(value = "/add")
    public ResponseEntity<String> addMockupSurvey(HttpServletRequest request) throws JsonProcessingException {
        MockupSurvey mockupSurvey = createMockupSurveyFromRequest(request);
        String id = mockupSurvey.getId();
        return ResponseEntity.ok().body(id);
    }

    private MockupSurvey createMockupSurveyFromRequest(HttpServletRequest request) throws JsonProcessingException {
        String name = request.getParameter(SURVEY_NAME);
        String questionsString = request.getParameter(QUESTIONS);
        String mockupId = request.getParameter(MOCKUP_ID);
        List<String> questions = Arrays.asList(questionsString.split(","));

        MockupSurvey mockupSurvey = new MockupSurvey(name, questions);
        mockupSurvey.setMockupId(mockupId);
        mockupSurveysRepository.save(mockupSurvey);
        return mockupSurvey;
    }

    @PostMapping(value = "/addAnswer")
    private ResponseEntity<String> addAnswer(HttpServletRequest request) throws JsonProcessingException {
        String id = request.getParameter(SURVEY_ID);
        String answersString = request.getParameter(ANSWERS);
        List<String> answers = Arrays.asList(answersString.split(","));
        Optional<MockupSurvey> mockupSurvey = mockupSurveysRepository.findById(id);

        if (mockupSurvey.isPresent()) {
            MockupSurvey mockup = mockupSurvey.get();
            mockup.addAnswer(answers);
            mockupSurveysRepository.save(mockup);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
