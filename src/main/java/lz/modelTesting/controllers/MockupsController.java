package lz.modelTesting.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lz.modelTesting.documents.Mockup;
import lz.modelTesting.repositories.MockupsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/mockups")
public class MockupsController {

    @Autowired
    private MockupsRepository mockupsRepository;

    @GetMapping(value = "/all")
    public List<Mockup> getAll() {
        return mockupsRepository.findAll();
    }

    @GetMapping(value = "/name/{name}")
    public ResponseEntity<String> getByName(@PathVariable String name) throws JsonProcessingException {
        Mockup res = mockupsRepository.findByName(name).get(0);
        String stringified = new ObjectMapper().writeValueAsString(res);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");

        return ResponseEntity.ok().headers(responseHeaders).body(stringified);
    }


    @PostMapping(value = "/add")
    public ResponseEntity<String> addMockup(HttpServletRequest request) throws IOException {
        String name = request.getParameter("mockupName");
        String src = request.getParameter("sourceLink");
        System.out.println(name + "   " + src);
        Mockup mockup = new Mockup(name, src);
        mockupsRepository.save(mockup);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");

        return ResponseEntity.ok().headers(responseHeaders).body("localhost:3000/mockup/view/" + name);
    }

}
