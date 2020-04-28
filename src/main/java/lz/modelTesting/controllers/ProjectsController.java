package lz.modelTesting.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lz.modelTesting.documents.Mockup;
import lz.modelTesting.documents.Project;
import lz.modelTesting.repositories.MockupsRepository;
import lz.modelTesting.repositories.ProjectsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProjectsController {

    private transient ProjectsRepository projectsRepository;
    private transient ObjectMapper objectMapper;
    private final static String PROJECT_NAME = "projectName";

    @Autowired
    public ProjectsController(ProjectsRepository projectsRepository, ObjectMapper objectMapper) {
        this.projectsRepository = projectsRepository;
        this.objectMapper = objectMapper;
    }

    @GetMapping(value = "/all")
    public List<Project> getAll() {
        return projectsRepository.findAll();
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<String> getById(@PathVariable String id) {
        try {
            Optional<Project> project = projectsRepository.findById(id);

            return project.map(this::wrapProjectToString)
                    .orElseThrow()
                    .map(projectString -> ResponseEntity.ok().body(projectString))
                    .orElse(ResponseEntity.notFound().build());

        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    private Optional<String> wrapProjectToString(Project project) {
        try {
            return Optional.of(objectMapper.writeValueAsString(project));
        } catch (JsonProcessingException e) {
            return Optional.empty();
        }
    }

    @PostMapping(value = "/add")
    public ResponseEntity<String> addProject(HttpServletRequest request) {
        Project project = createProjectFromRequest(request);
        String id = project.getId();
        return ResponseEntity.ok().body(id);
    }

    private Project createProjectFromRequest(HttpServletRequest request) {
        String name = request.getParameter(PROJECT_NAME);
        Project project = new Project(name);
        projectsRepository.save(project);
        return project;
    }


}
