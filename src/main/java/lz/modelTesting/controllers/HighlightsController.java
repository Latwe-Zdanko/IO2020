package lz.modelTesting.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
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
        String questionNumber = request.getParameter(QUESTION_NUMBER);
        String width = request.getParameter(WIDTH);
        String height = request.getParameter(HEIGHT);
        String posX = request.getParameter(POS_X);
        String posY = request.getParameter(POS_Y);




        Highlight highlight = new Highlight(mockupId,questionNumber,width,height,posX,posY);

        return highlight;
    }

    @GetMapping(value = "/byMockupId/{mockupId}")
    public List<Highlight> getByMockupId(@PathVariable String mockupId) {
        return highlightsRepository.findByMockupId(mockupId);
    }

    @GetMapping(value = "/byMockupId/{mockupId}/byQuestionNumber/{questionNumber}")
    public List<Highlight> getByMockupId(@PathVariable String mockupId, @PathVariable String questionNumber) {
        return highlightsRepository.findByMockupIdAndQuestionNumber(mockupId, questionNumber);
    }


}
