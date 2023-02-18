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
    private String car_Id;
    @Id
    private String rent_Id;

    @ManyToOne
    @JoinColumn(name = "rent_Id",referencedColumnName = "rent_Id",insertable = false,updatable = false)
    private Rent rent;

    @ManyToOne
    @JoinColumn(name = "car_Id",referencedColumnName = "car_Id",insertable = false,updatable = false)
    private Car car;
}
