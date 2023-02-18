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
@IdClass(DriverSchedule_PK.class)
public class DriverSchedule {
    @Id
    private String driver_Id;
    @Id
    private String rent_Id;

    @ManyToOne
    @JoinColumn(name = "driver_Id",referencedColumnName = "user_Id",insertable = false,updatable = false)
    private Driver driver;

    @ManyToOne
    @JoinColumn(name = "rent_Id",referencedColumnName = "rent_Id",insertable = false,updatable = false)
    private Rent rent;
}
