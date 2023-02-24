package com.easy.car_rental.entity;

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
@Entity
@IdClass(RentDetail_PK.class)
public class RentDetails {
    @Id
    private String carID;
    @Id
    private String rentID;

    private String driverID;

    @ManyToOne
    @JoinColumn(name = "rentID",referencedColumnName = "rentID",insertable = false,updatable = false)
    private Rent rent;

    @ManyToOne
    @JoinColumn(name = "carID",referencedColumnName = "car_Id",insertable = false,updatable = false)
    private Car car;

    @ManyToOne
    @JoinColumn(name = "driverID",referencedColumnName = "user_Id",insertable = false,updatable = false)
    private Driver driver;
}