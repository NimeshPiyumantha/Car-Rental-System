package com.easy.car_rental.entity;

import com.easy.car_rental.enums.PaymentType;
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
public class Payment {
    @Id
    private String paymentID;
    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "rentID", referencedColumnName = "rentID", nullable = false)
    private Rent rentID;
    private PaymentType paymentType;
    private LocalDate date;
    private LocalTime time;
    private Double lostDamage;
    private Double rentFee;
    private Double driverFee;
    private Double total;
}
