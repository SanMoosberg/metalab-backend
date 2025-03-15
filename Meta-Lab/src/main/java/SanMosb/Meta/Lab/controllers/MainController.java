package SanMosb.Meta.Lab.controllers;

import SanMosb.Meta.Lab.jwt.JwtUtils;
import SanMosb.Meta.Lab.models.Client;
import SanMosb.Meta.Lab.models.Product;
import SanMosb.Meta.Lab.services.ClientServices;
import SanMosb.Meta.Lab.services.ProductServices;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MainController {

    private final ClientServices clientServices;
    private final ProductServices productServices;
    private final JwtUtils jwtUtils;

    @Autowired
    public MainController(ClientServices clientServices, ProductServices productServices, JwtUtils jwtUtils) {
        this.productServices = productServices;
        this.clientServices = clientServices;
        this.jwtUtils = jwtUtils;
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
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") int id){
        productServices.delete(id);
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

    @PatchMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> editProduct(@RequestBody Product product, @PathVariable("id") int id) {
        productServices.update(product.getName(), product.getDescription(), product.getPrice(), product);
        Product updatedProduct = productServices.findOne(id);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // Убираем "Bearer "
            String username = jwtUtils.getUsernameFromJwtToken(token);
            Client client = clientServices.findByUsername(username);
            if (client != null) {
                return ResponseEntity.ok(client);
            }
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Не удалось авторизоваться");
    }
}