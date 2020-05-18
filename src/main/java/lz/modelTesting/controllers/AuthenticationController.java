package lz.modelTesting.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    @GetMapping("/auth")
    public String authenticate() {
        return "Authenticated";
    }
}
