package SanMosb.Meta.Lab.services;

import SanMosb.Meta.Lab.models.Booking;
import SanMosb.Meta.Lab.models.SlotStatus;
import SanMosb.Meta.Lab.models.TimeSlot;
import SanMosb.Meta.Lab.repositories.BookingRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional(readOnly = true)
public class BookingService {

    private final BookingRepository bookingRepository;
    private final TimeSlotService timeSlotService;

    public BookingService(BookingRepository bookingRepository, TimeSlotService timeSlotService) {
        this.bookingRepository = bookingRepository;
        this.timeSlotService = timeSlotService;
    }

    @Transactional
    public Booking bookSlot(Long slotId, int clientId) {
        TimeSlot slot = timeSlotService.getSlotById(slotId);
        if (slot.getStatus() != SlotStatus.FREE) {
            String errorMsg = "Slot is not FREE. Current status: " + slot.getStatus();
            throw new RuntimeException(errorMsg);
        }
        Booking booking = new Booking();
        booking.setClientId(clientId);
        booking.setTimeSlot(slot);
        Booking savedBooking = bookingRepository.save(booking);
        slot.setStatus(SlotStatus.BOOKED);
        timeSlotService.saveSlot(slot);
        return savedBooking;
    }

    public Booking getBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> {
            String errorMsg = "Booking not found: " + bookingId;
            return new RuntimeException(errorMsg);
        });
        return booking;
    }

    @Transactional
    public void cancelBooking(Long bookingId) {
        Booking booking = getBooking(bookingId);
        TimeSlot slot = booking.getTimeSlot();
        bookingRepository.delete(booking);
        if (slot.getStatus() == SlotStatus.BOOKED) {
            slot.setStatus(SlotStatus.FREE);
            timeSlotService.saveSlot(slot);
        }
    }

    public Booking getBookingBySlotId(Long slotId) {
        Booking booking = bookingRepository.findByTimeSlotId(slotId).orElseThrow(() -> new RuntimeException("Booking not found for slotId: " + slotId));
        return booking;
    }

    public Booking getBookingByClientId(int clientId) {
        return bookingRepository.findByClientId(clientId).orElse(null);
    }

    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void removeOldBookings() {
        LocalDate today = LocalDate.now();
        bookingRepository.deleteAllByTimeSlotDateBefore(today);
    }
}
