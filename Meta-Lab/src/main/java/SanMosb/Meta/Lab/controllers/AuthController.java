package SanMosb.Meta.Lab.controllers;

import SanMosb.Meta.Lab.jwt.JwtUtils;
import SanMosb.Meta.Lab.models.Client;

import SanMosb.Meta.Lab.services.ClientService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final ClientService clientServices;

    @Autowired
    public AuthController(JwtUtils jwtUtils, ClientService clientServices) {
        this.clientServices = clientServices;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerClient(@Valid @RequestBody Client client, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        try {
            Client registered = clientServices.save(client);
            return new ResponseEntity<>(registered, HttpStatus.CREATED);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(Map.of("username", e.getMessage()), HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            Client client = clientServices.getClientFromJwt(token.substring(7));
            if (client != null) {
                return ResponseEntity.ok(client);
            }
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Failed to log in");
    }
}
