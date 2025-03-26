package SanMosb.Meta.Lab.repositories;

import SanMosb.Meta.Lab.models.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    List<TimeSlot> findByDate(LocalDate date);

    boolean existsByDateAndStartTimeAndEndTime(LocalDate date, LocalTime startTime, LocalTime endTime);

    void deleteAllByDateBefore(LocalDate date);
}
