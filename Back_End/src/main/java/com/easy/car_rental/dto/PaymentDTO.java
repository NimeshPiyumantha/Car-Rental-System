package com.easy.car_rental.dto;

import com.easy.car_rental.entity.Rent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class PaymentDTO {

    private String paymentID;
    private LocalDate paymentDate;
    private double amount;
    private Rent rent;
}
