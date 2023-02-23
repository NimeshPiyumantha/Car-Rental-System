package com.easy.car_rental.dto;

import com.easy.car_rental.entity.Driver;
import com.easy.car_rental.entity.DriverSchedule_PK;
import com.easy.car_rental.entity.Rent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data

public class DriverScheduleDTO {
    private String driverID;
    private String rentID;

}
