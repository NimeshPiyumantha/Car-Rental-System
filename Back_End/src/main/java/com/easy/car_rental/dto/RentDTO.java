package com.easy.car_rental.dto;

import com.easy.car_rental.entity.Reg_User;
import com.easy.car_rental.entity.RentDetails;
import com.easy.car_rental.enums.RentRequest;
import com.easy.car_rental.enums.RequestType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class RentDTO {

    private String rentID;
    private LocalDate pickUpDate;
    private LocalTime pickUpTime;
    private LocalDate returnDate;
    private LocalTime returnTime;
    private RequestType requestType;
    private RentRequest rentType;
    private String location;
    private Reg_UserDTO regUser;

    private List<RentDetailsDTO> rentDetails;

}
