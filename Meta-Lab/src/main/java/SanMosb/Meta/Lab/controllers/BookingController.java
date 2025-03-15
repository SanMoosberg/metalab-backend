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
        List<TimeSlot> slots = bookingApiClient.generateSlots(date);
        return slots;
    }

    @GetMapping("/slots")
    public List<TimeSlot> getSlotsByDate(@RequestParam String date) {
        List<TimeSlot> slots = bookingApiClient.getSlotsByDate(date);
        return slots;
    }

    @PostMapping("/book")
    public Booking bookSlot(@RequestParam Long slotId, @RequestParam int clientId) {
        Booking booking = bookingApiClient.bookSlot(slotId, clientId);
        return booking;
    }

    @DeleteMapping("/bookings/{bookingId}")
    public void cancelBooking(@PathVariable Long bookingId) {
        bookingApiClient.cancelBooking(bookingId);
    }

    @PostMapping("/slots/{slotId}/block")
    public void blockSlot(@PathVariable Long slotId) {
        bookingApiClient.blockSlot(slotId);
    }
    @GetMapping("/bookings/{slotId}")
    public Booking getBookingBySlotId(@PathVariable Long slotId) {
        Booking booking = bookingApiClient.getBookingBySlotId(slotId);
        return booking;
    }
    @GetMapping("/bookings/by-client/{clientId}")
    public Booking getBookingByClientId(@PathVariable int clientId) {
        Booking booking = bookingApiClient.getBookingByClientId(clientId);
        return booking;
    }
}
