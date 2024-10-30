package SanMosb.Meta.Lab.services;

import SanMosb.Meta.Lab.models.Client;
import SanMosb.Meta.Lab.models.Product;
import SanMosb.Meta.Lab.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import SanMosb.Meta.Lab.repositories.ClientRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ClientServices {

    private final ClientRepository clientRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ClientServices(ClientRepository clientRepository, ProductRepository productRepository, PasswordEncoder passwordEncoder) {
        this.clientRepository = clientRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public List<Client> findAll(){
        return clientRepository.findAll();
    }
    public Client findOne(int id){
        Optional<Client> foundClient = clientRepository.findById(id);
        return foundClient.orElse(null);
    }
    public Client findByName(String name){
        Optional<Client> foundClient = clientRepository.findByName(name);
        return foundClient.orElse(null);
    }
    @Transactional
    public Client save(Client client) {
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        clientRepository.save(client);
        return client;
    }
    @Transactional
    public void update(String name, String email, Client updatedClient){
        updatedClient.setName(name);
        updatedClient.setEmail(email);
        clientRepository.save(updatedClient);
    }
    @Transactional
    public void delete(int id){
        clientRepository.deleteById(id);
    }

    @Transactional
    public void buyProduct(int clientId, int productId){
        Optional<Client> clientOpt = clientRepository.findById(clientId);
        Optional<Product> productOpt = productRepository.findById(productId);
        Client client = clientOpt.get();
        Product product = productOpt.get();
        client.buy(product);
        clientRepository.save(client);
    }
    @Transactional
    public void removeOrder(int clientId, int productId){
        Optional<Client> clientOpt = clientRepository.findById(clientId);
        Optional<Product> productOpt = productRepository.findById(productId);
        Client client = clientOpt.get();
        Product product = productOpt.get();
        client.removeOrder(product);
        clientRepository.save(client);
    }
}

