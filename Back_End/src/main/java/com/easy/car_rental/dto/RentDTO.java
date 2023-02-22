package com.easy.car_rental.dto;

import com.easy.car_rental.entity.Reg_User;
import com.easy.car_rental.enums.RentRequest;
import com.easy.car_rental.enums.RequestType;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public class RentDTO {
    private String rent_Id;
    private LocalDate pickUpDate;
    private LocalTime pickUpTime;
    private LocalDate returnDate;
    private LocalTime returnTime;
    private RequestType requestType;
    private RentRequest rentType;
    private String location;

    private Reg_User user;

}
