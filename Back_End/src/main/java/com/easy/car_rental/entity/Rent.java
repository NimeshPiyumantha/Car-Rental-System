package com.easy.car_rental.entity;

import com.easy.car_rental.enums.RentRequest;
import com.easy.car_rental.enums.RequestType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
@Entity
public class Rent {
    @Id
    private String rent_Id;
    private LocalDate pickUpDate;
    private LocalTime pickUpTime;
    private LocalDate returnDate;
    private LocalTime returnTime;
    @Enumerated(EnumType.STRING)
    private RequestType requestType;
    @Enumerated(EnumType.STRING)
    private RentRequest rentType;
    private String location;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "userId",referencedColumnName = "user_Id",nullable = false)
    private Reg_User user;
}
