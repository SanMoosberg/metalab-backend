package SanMosb.Meta.Lab.services;

import SanMosb.Meta.Lab.jwt.JwtUtils;
import SanMosb.Meta.Lab.models.Client;
import SanMosb.Meta.Lab.models.Product;
import SanMosb.Meta.Lab.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import SanMosb.Meta.Lab.repositories.ClientRepository;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ClientServices {

    private final ClientRepository clientRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public ClientServices(ClientRepository clientRepository, ProductRepository productRepository, PasswordEncoder passwordEncoder
            , JwtUtils jwtUtils) {
        this.clientRepository = clientRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public Client findByUsername(String username) {
        Optional<Client> foundClient = clientRepository.findByUsername(username);
        return foundClient.orElse(null);
    }

    public Client getClientFromJwt(String token) {
        if (!jwtUtils.validateJwtToken(token)) return null;
        String username = jwtUtils.getUsernameFromJwtToken(token);
        return findByUsername(username);
    }

    @Transactional
    public Client save(Client client) {
        if (findByUsername(client.getUsername()) != null) {
            throw new IllegalStateException("Username already exists");
        }

        String encodedPassword = passwordEncoder.encode(client.getPassword());
        client.setPassword(encodedPassword);
        client.setRole("USER");

        return clientRepository.save(client);
    }

    @Transactional
    public void buyProduct(int clientId, int productId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (!client.getProductList().contains(product)) {
            client.getProductList().add(product);
            clientRepository.save(client);
        } else {
            throw new IllegalStateException("Product already bought");
        }
    }

    @Transactional
    public void removeOrder(int clientId, int productId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (client.getProductList().contains(product)) {
            client.getProductList().remove(product);
            clientRepository.save(client);
        } else {
            throw new IllegalStateException("Product not in order list");
        }
    }
}

