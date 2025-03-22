package SanMosb.Meta.Lab.repositories;

import SanMosb.Meta.Lab.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByTimeSlotId(Long timeSlotId);
    Optional<Booking> findByClientId(int clientId);
}