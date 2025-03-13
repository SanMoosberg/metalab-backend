package SanMosb.Meta.Lab.controllers;

import SanMosb.Meta.Lab.models.Client;

import SanMosb.Meta.Lab.services.ClientServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ClientServices clientServices;

    @PostMapping("/register")
    public ResponseEntity<?> registerClient(@Valid @RequestBody Client client, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        String rawPassword = client.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        client.setPassword(encodedPassword);
        Client savedClient = clientServices.save(client);
        return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
    }
}
