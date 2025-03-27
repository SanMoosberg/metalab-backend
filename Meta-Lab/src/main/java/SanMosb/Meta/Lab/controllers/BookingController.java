package SanMosb.Meta.Lab.controllers;

import SanMosb.Meta.Lab.models.Booking;
import SanMosb.Meta.Lab.services.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/book")
    public ResponseEntity<?> bookSlot(@RequestParam Long slotId, @RequestParam int clientId) {
        try {
            Booking booking = bookingService.bookSlot(slotId, clientId);
            return ResponseEntity.ok(booking);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{bookingId}")
    public void cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
    }

    @GetMapping("/{slotId}")
    public Booking getBookingBySlotId(@PathVariable Long slotId) {
        Booking booking = bookingService.getBookingBySlotId(slotId);
        return booking;
    }

    @GetMapping("/by-client/{clientId}")
    public ResponseEntity<Booking> getBookingByClientId(@PathVariable int clientId) {
        Booking booking = bookingService.getBookingByClientId(clientId);
        if (booking == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(booking);
    }
}
