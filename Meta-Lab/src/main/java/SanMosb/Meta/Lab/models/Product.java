package SanMosb.Meta.Lab.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class Product {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "description", length = 9000)
    private String description;

    @Column(name = "price")
    private BigDecimal price;

    @ManyToMany(mappedBy = "productList")
    @JsonIgnoreProperties("productList")
    private List<Client> buyers;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return id != 0 && id == product.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
