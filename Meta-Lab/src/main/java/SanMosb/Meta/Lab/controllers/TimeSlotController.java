package SanMosb.Meta.Lab.controllers;

import SanMosb.Meta.Lab.models.TimeSlot;
import SanMosb.Meta.Lab.services.TimeSlotService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/api/slots")
public class TimeSlotController {

    private final TimeSlotService timeSlotService;

    public TimeSlotController(TimeSlotService timeSlotService) {
        this.timeSlotService = timeSlotService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/generate")
    public List<TimeSlot> generateSlots(@RequestParam("date") String dateStr) {
        LocalDate date = LocalDate.parse(dateStr);
        return timeSlotService.generateTimeSlots(date);
    }

    @GetMapping
    public List<TimeSlot> getSlotsByDate(@RequestParam("date") String dateStr) {
        LocalDate date = LocalDate.parse(dateStr);
        return timeSlotService.getSlotsByDate(date);
    }

    @PostMapping("/{slotId}/block")
    @PreAuthorize("hasRole('ADMIN')")
    public void blockSlot(@PathVariable Long slotId) {
        timeSlotService.blockSlot(slotId);
    }

    @PostMapping("/{slotId}/unblock")
    @PreAuthorize("hasRole('ADMIN')")
    public void unblockSlot(@PathVariable Long slotId) {
        this.timeSlotService.unblockSlot(slotId);
    }
}
