package SanMosb.Meta.Lab.controllers;

import SanMosb.Meta.Lab.models.Client;
import SanMosb.Meta.Lab.models.Product;
import SanMosb.Meta.Lab.services.ClientServices;
import SanMosb.Meta.Lab.services.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MainController {

    private final ClientServices clientServices;
    private final ProductServices productServices;

    @Autowired
    public MainController(ClientServices clientServices, ProductServices productServices) {
        this.productServices = productServices;
        this.clientServices = clientServices;
    }

    @GetMapping("/products")
    public List<Product> showProducts() {
        return productServices.findAll();
    }

    @GetMapping("/clients")
    public List<Client> showClients() {
        return clientServices.findAll();
    }

    @PostMapping("/products")
    public ResponseEntity<Product> newProduct(@RequestBody Product product) {
        Product savedProduct = productServices.save(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }
    @DeleteMapping("/products/{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") int id){
        productServices.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @DeleteMapping("/clients/{id}")
    public ResponseEntity<HttpStatus> deleteClient(@PathVariable("id") int id) {
        clientServices.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @PostMapping("/clients/{id1}/{id2}")
    public void buyProduct(@PathVariable("id1") int clientId, @PathVariable("id2") int productId){
        clientServices.buyProduct(clientId, productId);
    }
    @DeleteMapping("/clients/{id1}/{id2}")
    public void removeOrder(@PathVariable("id1") int clientId, @PathVariable("id2") int productId){
        clientServices.removeOrder(clientId, productId);
    }
    @PatchMapping("/clients/{id}")
    public ResponseEntity<Client> editClient(@RequestBody Client client, @PathVariable("id") int id){
        clientServices.update(client.getName(), client.getEmail(), client);
        Client editedClient = clientServices.findOne(id);
        return new ResponseEntity<>(editedClient, HttpStatus.OK);
    }
    @PatchMapping("/products/{id}")
    public ResponseEntity<Product> editProduct(@RequestBody Product product, @PathVariable("id") int id){
        productServices.update(product.getName(), product.getDescription(), product.getPrice(), product);
        Product updatedProduct = productServices.findOne(id);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
}