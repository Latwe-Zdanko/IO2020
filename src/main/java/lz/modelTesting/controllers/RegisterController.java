package lz.modelTesting.controllers;

import lz.modelTesting.documents.User;
import lz.modelTesting.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RegisterController {
    private final static String EMAIL = "email";
    private final static String FIRST_NAME = "firstName";
    private final static String LAST_NAME = "lastName";
    private final static String PASSWORD = "password";
    private transient UsersRepository usersRepository;

    @Autowired
    public RegisterController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @GetMapping("/add-user")
    public ResponseEntity<String> addUser(HttpServletRequest request) {
        User user = createUserFromRequest(request);
        if (usersRepository.findByEmail(user.getEmail()).isEmpty()) {
            usersRepository.save(user);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    private User createUserFromRequest(HttpServletRequest request) {
        return new User(request.getParameter(FIRST_NAME),
                request.getParameter(LAST_NAME),
                request.getParameter(EMAIL),
                request.getParameter(PASSWORD));
    }
}
