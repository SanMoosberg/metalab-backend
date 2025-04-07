package SanMosb.Meta.Lab.controllers;

import SanMosb.Meta.Lab.models.Product;
import SanMosb.Meta.Lab.services.ClientService;
import SanMosb.Meta.Lab.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ClientService clientServices;
    private final ProductService productServices;

    @Autowired
    public ProductController(ClientService clientServices, ProductService productServices) {
        this.productServices = productServices;
        this.clientServices = clientServices;
    }

    @GetMapping("/products")
    public List<Product> showProducts() {
        return productServices.findAll();
    }

    @PostMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> newProduct(@RequestBody Product product) {
        Product savedProduct = productServices.save(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @DeleteMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") int id) {
        productServices.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/clients/{id1}/{id2}")
    @PreAuthorize("hasRole('USER')")
    public void buyProduct(@PathVariable("id1") int clientId, @PathVariable("id2") int productId) {
        clientServices.buyProduct(clientId, productId);
    }

    @DeleteMapping("/clients/{id1}/{id2}")
    @PreAuthorize("hasRole('USER')")
    public void removeOrder(@PathVariable("id1") int clientId, @PathVariable("id2") int productId) {
        clientServices.removeOrder(clientId, productId);
    }

    @PatchMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> editProduct(@RequestBody Product product, @PathVariable("id") int id) {
        productServices.update(product.getName(), product.getDescription(), product.getPrice(), product);
        Product updatedProduct = productServices.findOne(id);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
}