package SanMosb.Meta.Lab.services;

import SanMosb.Meta.Lab.models.Client;
import SanMosb.Meta.Lab.repositories.ClientRepository;
import SanMosb.Meta.Lab.security.ClientDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientDetailsServices implements UserDetailsService {

    private final ClientRepository clientRepository;

    @Autowired
    public ClientDetailsServices(ClientRepository clientRepository){
        this.clientRepository = clientRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Client> client = clientRepository.findByUsername(username);
        if (client.isEmpty())
            throw new UsernameNotFoundException("User not found!");
        return new ClientDetails(client.get());
    }
}
