package SanMosb.Meta.Lab.client;

import SanMosb.Meta.Lab.dto.Booking;
import SanMosb.Meta.Lab.dto.TimeSlot;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class BookingApiClient {

    private final RestTemplate restTemplate;
    private final String baseUrl = "http://localhost:8081/api";

    public BookingApiClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<TimeSlot> getSlotsByDate(String date) {
        String url = baseUrl + "/slots?date=" + date;
        ResponseEntity<List<TimeSlot>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<TimeSlot>>() {}
        );
        return response.getBody();
    }

    public Booking bookSlot(Long slotId, int clientId) {
        String url = baseUrl + "/bookings/book?slotId=" + slotId + "&clientId=" + clientId;
        return restTemplate.postForObject(url, null, Booking.class);
    }

    public void cancelBooking(Long bookingId) {
        String url = baseUrl + "/bookings/" + bookingId;
        restTemplate.delete(url);
    }

    public Booking getBooking(Long bookingId) {
        String url = baseUrl + "/bookings/" + bookingId;
        return restTemplate.getForObject(url, Booking.class);
    }
}
