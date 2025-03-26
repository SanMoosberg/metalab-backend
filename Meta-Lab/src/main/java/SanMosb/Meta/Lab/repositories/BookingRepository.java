package SanMosb.Meta.Lab.repositories;

import SanMosb.Meta.Lab.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByTimeSlotId(Long timeSlotId);

    Optional<Booking> findByClientId(int clientId);

    @Modifying
    @Query("DELETE FROM Booking b WHERE b.timeSlot.date < :date")
    void deleteAllByTimeSlotDateBefore(@Param("date") LocalDate date);
}