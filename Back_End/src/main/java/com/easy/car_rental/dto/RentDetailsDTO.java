package com.easy.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data

public class RentDetailsDTO {
    private String carID;
    private String rentID;
    private String driverID;
}
