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

    @GetMapping("/slots")
    public List<TimeSlot> getSlotsByDate(@RequestParam String date) {
        return bookingApiClient.getSlotsByDate(date);
    }

    @PostMapping("/book")
    public Booking bookSlot(@RequestParam Long slotId, @RequestParam int clientId) {
        return bookingApiClient.bookSlot(slotId, clientId);
    }

    @DeleteMapping("/bookings/{bookingId}")
    public void cancelBooking(@PathVariable Long bookingId) {
        bookingApiClient.cancelBooking(bookingId);
    }

    @GetMapping("/bookings/{bookingId}")
    public Booking getBooking(@PathVariable Long bookingId) {
        return bookingApiClient.getBooking(bookingId);
    }
}
