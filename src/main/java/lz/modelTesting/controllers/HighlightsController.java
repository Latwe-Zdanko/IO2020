package lz.modelTesting.controllers;

import lz.modelTesting.documents.Highlight;
import lz.modelTesting.repositories.HighlightsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/highlights")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class HighlightsController {

    private final static String MOCKUP_ID = "mockupId";
    private final static String SURVEY_ID = "surveyId";
    private final static String QUESTION_NUMBER = "questionNumber";
    private final static String WIDTH = "width";
    private final static String HEIGHT = "height";
    private final static String POS_X = "posX";
    private final static String POS_Y = "posY";
    private transient HighlightsRepository highlightsRepository;

    @Autowired
    public HighlightsController(HighlightsRepository highlightsRepository) {
        this.highlightsRepository = highlightsRepository;
    }

    @PostMapping(value = "/add")
    public ResponseEntity<String> addHighlight(HttpServletRequest request) {
        Highlight highlight = createHighlightFromRequest(request);
        highlightsRepository.save(highlight);
        String id = highlight.getId();
        return ResponseEntity.ok().body(id);
    }

    private Highlight createHighlightFromRequest(HttpServletRequest request) {
        String mockupId = request.getParameter(MOCKUP_ID);
        String surveyId = request.getParameter(SURVEY_ID);
        String questionNumber = request.getParameter(QUESTION_NUMBER);
        String width = request.getParameter(WIDTH);
        String height = request.getParameter(HEIGHT);
        String posX = request.getParameter(POS_X);
        String posY = request.getParameter(POS_Y);

        Highlight highlight = new Highlight(mockupId, surveyId, questionNumber, width, height, posX, posY);

        return highlight;
    }

    @GetMapping(value = "/bySurveyId/{surveyId}")
    public List<Highlight> getBySurveyId(@PathVariable String surveyId) {
        return highlightsRepository.findBySurveyId(surveyId);
    }


}
