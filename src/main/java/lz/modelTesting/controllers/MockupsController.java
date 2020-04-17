package lz.modelTesting.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import lz.modelTesting.documents.Mockup;
import lz.modelTesting.repositories.MockupsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/mockups")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MockupsController {

    private final MockupsRepository mockupsRepository;
    private final ObjectMapper objectMapper;
    private final static String mockupName = "mockupName";
    private final static String mockupSource = "sourceLink";

    @Autowired
    public MockupsController(MockupsRepository mockupsRepository, ObjectMapper objectMapper) {
        this.mockupsRepository = mockupsRepository;
        this.objectMapper = objectMapper;
    }

    @GetMapping(value = "/all")
    public List<Mockup> getAll() {
        return mockupsRepository.findAll();
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<String> getById(@PathVariable String id) {
        try {
            Mockup mockup = mockupsRepository.findById(id).get();
            String mockupAsString = objectMapper.writeValueAsString(mockup);

            return ResponseEntity.ok().body(mockupAsString);

        } catch (NoSuchElementException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }


    @PostMapping(value = "/add")
    public ResponseEntity<String> addMockup(HttpServletRequest request) throws IOException {
        String name = request.getParameter(mockupName);
        String src = request.getParameter(mockupSource);
        Mockup mockup = new Mockup(name, src);
        mockupsRepository.save(mockup);
        String id = mockup.getId();

        return ResponseEntity.ok().body(id);
    }

}
