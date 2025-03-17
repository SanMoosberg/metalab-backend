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

    @Autowired
    public ClientServices(ClientRepository clientRepository, ProductRepository productRepository) {
        this.clientRepository = clientRepository;
        this.productRepository = productRepository;
    }
    public List<Client> findAll(){
        return clientRepository.findAll();
    }

    public Client findOne(int id){
        Optional<Client> foundClient = clientRepository.findById(id);
        return foundClient.orElse(null);
    }

    public Client findByUsername(String username){
        Optional<Client> foundClient = clientRepository.findByUsername(username);
        return foundClient.orElse(null);
    }

    @Transactional
    public Client save(Client client) {
        clientRepository.save(client);
        return client;
    }

    @Transactional
    public void update(String username, String email, Client updatedClient){
        updatedClient.setUsername(username);
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

