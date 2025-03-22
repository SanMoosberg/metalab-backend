package SanMosb.Meta.Lab.controllers;

import SanMosb.Meta.Lab.jwt.JwtUtils;
import SanMosb.Meta.Lab.models.Client;

import SanMosb.Meta.Lab.services.ClientServices;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final ClientServices clientServices;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthController(JwtUtils jwtUtils, ClientServices clientServices, PasswordEncoder passwordEncoder) {
        this.jwtUtils = jwtUtils;
        this.clientServices = clientServices;
        this.passwordEncoder = passwordEncoder;
    }
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

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);

            if (jwtUtils.validateJwtToken(token)) {
                String username = jwtUtils.getUsernameFromJwtToken(token);
                Client client = clientServices.findByUsername(username);
                if (client != null) {
                    return ResponseEntity.ok(client);
                }
            }
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Failed to log in");
    }
}
