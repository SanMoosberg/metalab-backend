package SanMosb.Meta.Lab.controllers;

import SanMosb.Meta.Lab.models.Client;
import SanMosb.Meta.Lab.services.ClientServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final ClientServices clientServices;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(ClientServices clientServices,
                          PasswordEncoder passwordEncoder) {
        this.clientServices = clientServices;
        this.passwordEncoder = passwordEncoder;

    }
    @PostMapping("/register")
    public ResponseEntity<Client> registerClient(@RequestBody Client client) {
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        Client savedClient = clientServices.save(client);
        return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
    }
}


