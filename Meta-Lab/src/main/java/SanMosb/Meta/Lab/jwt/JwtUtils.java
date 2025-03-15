package SanMosb.Meta.Lab.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;


import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtils {

    private final String secret = "YourSuperSecretKeyThatShouldBeAtLeast64BytesLongForHS512Algorithm!";
    private final SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

    public String generateJwtToken(String username) {
        try {
            String token = Jwts.builder()
                    .subject(username)
                    .issuedAt(new Date())
                    .expiration(new Date(System.currentTimeMillis() + 3600000)) // Токен истекает через 1 час
                    .signWith(key) // Подписываем с помощью SecretKey
                    .compact();
            return token;
        } catch (Exception e) {
            e.printStackTrace();
            throw e; // Перебрасываем исключение, чтобы оно могло быть обработано выше
        }
    }


    public String getUsernameFromJwtToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(key) // Используем verifyWith для проверки подписи
                .build() // Создаем JwtParser
                .parseSignedClaims(token) // Извлекаем подпись
                .getPayload(); // Получаем полезную нагрузку

        return claims.getSubject();
    }


    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(key) // Проверяем подпись токена
                    .build()
                    .parseSignedClaims(token); // Если токен неверный, произойдет исключение

            return true;
        } catch (Exception e) {
            return false;
        }
    }
}