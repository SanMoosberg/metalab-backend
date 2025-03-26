package SanMosb.Meta.Lab.services;

import SanMosb.Meta.Lab.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import SanMosb.Meta.Lab.repositories.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ProductServices {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServices(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findOne(int id) {
        Optional<Product> foundProduct = productRepository.findById(id);
        return foundProduct.orElse(null);
    }

    @Transactional
    public Product save(Product product) {
        productRepository.save(product);
        return product;
    }

    @Transactional
    public void update(String name, String description, BigDecimal price, Product existingProduct) {
        Product updatedProduct = existingProduct.toBuilder()
                .name(name)
                .description(description)
                .price(price)
                .build();
        productRepository.save(updatedProduct);
    }

    @Transactional
    public void delete(int id) {
        productRepository.deleteById(id);
    }
}
