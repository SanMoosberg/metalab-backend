package SanMosb.Meta.Lab.controllers;

import SanMosb.Meta.Lab.client.BookingApiClient;
import SanMosb.Meta.Lab.dto.Booking;
import SanMosb.Meta.Lab.dto.TimeSlot;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/main")
public class BookingController {

    private final BookingApiClient bookingApiClient;

    public BookingController(BookingApiClient bookingApiClient) {
        this.bookingApiClient = bookingApiClient;
    }

    @PostMapping("/slots/generate")
    public List<TimeSlot> generateSlots(@RequestParam String date) {
        System.out.println("BookingController.generateSlots вызван. Получены данные: date = " + date);
        List<TimeSlot> slots = bookingApiClient.generateSlots(date);
        System.out.println("BookingController.generateSlots закончил работу. Должен вернуть " + (slots != null ? slots.size() : 0) + " слотов.");
        return slots;
    }

    @GetMapping("/slots")
    public List<TimeSlot> getSlotsByDate(@RequestParam String date) {
        System.out.println("BookingController.getSlotsByDate вызван. Получены данные: date = " + date);
        List<TimeSlot> slots = bookingApiClient.getSlotsByDate(date);
        System.out.println("BookingController.getSlotsByDate закончил работу. Получено " + (slots != null ? slots.size() : 0) + " слотов.");
        return slots;
    }

    @PostMapping("/book")
    public Booking bookSlot(@RequestParam Long slotId, @RequestParam int clientId) {
        System.out.println("BookingController.bookSlot вызван. Получены данные: slotId = " + slotId + ", clientId = " + clientId);
        Booking booking = bookingApiClient.bookSlot(slotId, clientId);
        System.out.println("BookingController.bookSlot закончил работу. Получено бронирование: " + booking);
        return booking;
    }

    @DeleteMapping("/bookings/{bookingId}")
    public void cancelBooking(@PathVariable Long bookingId) {
        System.out.println("BookingController.cancelBooking вызван. Получены данные: bookingId = " + bookingId);
        bookingApiClient.cancelBooking(bookingId);
        System.out.println("BookingController.cancelBooking закончил работу. Бронирование отменено для bookingId = " + bookingId);
    }

    @GetMapping("/bookings/{bookingId}")
    public Booking getBooking(@PathVariable Long bookingId) {
        System.out.println("BookingController.getBooking вызван. Получены данные: bookingId = " + bookingId);
        Booking booking = bookingApiClient.getBooking(bookingId);
        System.out.println("BookingController.getBooking закончил работу. Получено бронирование: " + booking);
        return booking;
    }
    @PostMapping("/slots/{slotId}/block")
    public void blockSlot(@PathVariable Long slotId) {
        System.out.println("BookingController.blockSlot вызван. Получены данные: slotId = " + slotId);
        bookingApiClient.blockSlot(slotId);
        System.out.println("BookingController.blockSlot закончил работу. Слот с id " + slotId + " заблокирован.");
    }
}
