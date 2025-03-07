package SanMosb.Meta.Lab.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    private Long id;
    private int clientId;
    private TimeSlot timeSlot;
}
