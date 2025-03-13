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

    public List<TimeSlot> generateSlots(String date) {
        System.out.println("BookingApiClient.generateSlots вызван. Получены данные: date = " + date);
        String url = baseUrl + "/slots/generate?date=" + date;
        ResponseEntity<List<TimeSlot>> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                null,
                new ParameterizedTypeReference<List<TimeSlot>>() {}
        );
        List<TimeSlot> slots = response.getBody();
        System.out.println("BookingApiClient.generateSlots закончил работу. Получено " + (slots != null ? slots.size() : 0) + " слотов.");
        return slots;
    }

    public List<TimeSlot> getSlotsByDate(String date) {
        System.out.println("BookingApiClient.getSlotsByDate вызван. Получены данные: date = " + date);
        String url = baseUrl + "/slots?date=" + date;
        ResponseEntity<List<TimeSlot>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<TimeSlot>>() {}
        );
        List<TimeSlot> slots = response.getBody();
        System.out.println("BookingApiClient.getSlotsByDate закончил работу. Получено " + (slots != null ? slots.size() : 0) + " слотов.");
        return slots;
    }

    public Booking bookSlot(Long slotId, int clientId) {
        System.out.println("BookingApiClient.bookSlot вызван. Получены данные: slotId = " + slotId + ", clientId = " + clientId);
        String url = baseUrl + "/bookings/book?slotId=" + slotId + "&clientId=" + clientId;
        Booking booking = restTemplate.postForObject(url, null, Booking.class);
        System.out.println("BookingApiClient.bookSlot закончил работу. Получено бронирование: " + booking);
        return booking;
    }

    public void cancelBooking(Long bookingId) {
        System.out.println("BookingApiClient.cancelBooking вызван. Получены данные: bookingId = " + bookingId);
        String url = baseUrl + "/bookings/" + bookingId;
        restTemplate.delete(url);
        System.out.println("BookingApiClient.cancelBooking закончил работу. Бронирование с id " + bookingId + " отменено.");
    }

    public Booking getBooking(Long bookingId) {
        System.out.println("BookingApiClient.getBooking вызван. Получены данные: bookingId = " + bookingId);
        String url = baseUrl + "/bookings/" + bookingId;
        Booking booking = restTemplate.getForObject(url, Booking.class);
        System.out.println("BookingApiClient.getBooking закончил работу. Получено бронирование: " + booking);
        return booking;
    }
    public void blockSlot(Long slotId) {
        System.out.println("BookingApiClient.blockSlot вызван. Получены данные: slotId = " + slotId);
        // Формируем URL для вызова метода блокирования слота
        String url = baseUrl + "/slots/" + slotId + "/block";
        // Выполняем POST запрос без тела запроса
        restTemplate.postForLocation(url, null);
        System.out.println("BookingApiClient.blockSlot закончил работу. Слот с id " + slotId + " заблокирован.");
    }

}
