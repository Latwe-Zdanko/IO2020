package lz.modelTesting.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lz.modelTesting.documents.Mockup;
import lz.modelTesting.documents.Project;
import lz.modelTesting.repositories.MockupsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mockups")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MockupsController {

    private final static String MOCKUP_NAME = "mockupName";
    private final static String SOURCE_LINK = "sourceLink";
    private final static String PROJECT_ID = "projectId";
    private transient MockupsRepository mockupsRepository;
    private transient ObjectMapper objectMapper;


    @Autowired
    public MockupsController(MockupsRepository mockupsRepository, ObjectMapper objectMapper) {
        this.mockupsRepository = mockupsRepository;
        this.objectMapper = objectMapper;
    }

    @GetMapping(value = "/all")
    public List<Mockup> getAll() {
        return mockupsRepository.findAll();
    }

    @GetMapping(value = "/byProjectId/{projectId}")
    public List<Mockup> getNotArchivedByProjectId(@PathVariable String projectId) {
        return mockupsRepository.findByProjectIdAndArchivedIsFalse(projectId);
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<String> getById(@PathVariable String id) {
        try {
            Optional<Mockup> mockup = mockupsRepository.findById(id);

            return mockup.map(this::wrapMockupToString)
                    .orElseThrow()
                    .map(mockupString -> ResponseEntity.ok().body(mockupString))
                    .orElse(ResponseEntity.notFound().build());

        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    private Optional<String> wrapMockupToString(Mockup mockup) {
        try {
            return Optional.of(objectMapper.writeValueAsString(mockup));
        } catch (JsonProcessingException e) {
            return Optional.empty();
        }
    }


    @PostMapping(value = "/add")
    public ResponseEntity<String> addMockup(HttpServletRequest request) {
        Mockup mockup = createMockupFromRequest(request);
        mockupsRepository.save(mockup);
        String id = mockup.getId();
        return ResponseEntity.ok().body(id);
    }

    private Mockup createMockupFromRequest(HttpServletRequest request) {
        String name = request.getParameter(MOCKUP_NAME);
        String src = request.getParameter(SOURCE_LINK);
        String projectId = request.getParameter(PROJECT_ID);
        Mockup mockup = new Mockup(name, src, projectId);

        return mockup;
    }

    @PostMapping(value = "/archive/{id}")
    public ResponseEntity<String> archiveMockup(HttpServletRequest request, @PathVariable String id) {
        Optional<Mockup> optional = mockupsRepository.findById(id);
        if(optional.isPresent())
        {
            Mockup mockup = optional.get();
            mockup.setArchived(true);
            mockupsRepository.save(mockup);
            return ResponseEntity.ok().body(id);
        }
        return ResponseEntity.badRequest().build();
    }
}
